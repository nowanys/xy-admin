<template>
    <a-card type="flex">
        <template #title>
            <a-input-search v-model:value="searchValue"
                            allow-clear
                            placeholder="请输入关键词搜索"></a-input-search>
        </template>
        <template #actions>
                    <span @click="$refs.editRef.handleCreate()">
                        <icon-plus-outlined/>
                        新建分类
                    </span>
        </template>
        <a-spin :spinning="loading">
            <a-tree v-if="!loading"
                    :selected-keys="selectedKeys"
                    :tree-data="list"
                    :field-names="{title: 'name', children: 'children', key: 'key'}"
                    default-expand-all
                    block-node
                    @select="handleSelect">
                <template #title="record">
                    <div class="tree-row">
                        <div class="tree-row__name">
                                    <span v-if="record.name.indexOf(searchValue) > -1">
                                      {{ record.name.substr(0, record.name.indexOf(searchValue)) }}
                                      <span class="color-error">{{ searchValue }}</span>
                                      {{ record.name.substr(record.name.indexOf(searchValue) + searchValue.length) }}
                                    </span>
                            <span v-else>{{ record.name }}</span>
                        </div>
                        <div class="tree-row__code">{{ record.code }}</div>
                        <a-space class="tree-row__actions"
                                 @click.stop="()=>{}">
                            <icon-edit-outlined @click.stop="$refs.editRef.handleEdit(record)"></icon-edit-outlined>
                            <a-popconfirm title="确认删除？"
                                          @confirm="handleDelete(record)">
                                <icon-delete-outlined></icon-delete-outlined>
                            </a-popconfirm>
                        </a-space>
                    </div>
                </template>
            </a-tree>
        </a-spin>
    </a-card>

    <dict-type-edit ref="editRef"/>
</template>

<script>
import {ref, onMounted} from 'vue'
import {systemApi} from '@/api'
import {get, head, find} from 'lodash'

import usePagination from '@/hooks/usePagination'
import {message} from 'ant-design-vue'
import DictTypeEdit from '@/views/system/dict/components/DictTypeEdit'

export default {
    name: 'DictTypeTree',
    components: {DictTypeEdit},
    emits: ['select'],
    setup(props, {emit}) {
        const {loading, list} = usePagination()
        const selectedKeys = ref([])
        const searchValue = ref('')
        const editRef = ref()

        onMounted(() => {
            getDictTypeList()
        })

        /**
         * 获取字典分类列表
         * @return {Promise<void>}
         */
        async function getDictTypeList() {
            try {
                loading.value = true
                const {code, data} = await systemApi.getDictTypeList().catch(() => {
                    throw new Error()
                })
                loading.value = false
                if ('200' === code) {
                    const {rows} = data
                    list.value = rows
                }
            } catch (err) {
                loading.value = false
            }
        }

        /**
         * 切换分类
         * @param keys
         */
        function handleSelect(keys, {node}) {
            if (!keys.length) {
                return
            }
            selectedKeys.value = keys
            trigger(node)
        }

        /**
         * 删除分类
         */
        function handleDelete(record) {
            try {
                message.info('点击了删除')
            } catch (err) {
                message.warning(err.message)
            }
        }

        /**
         * 触发
         * @param value
         */
        function trigger(value) {
            emit('select', value)
        }

        return {
            list,
            loading,
            selectedKeys,
            searchValue,
            editRef,
            handleSelect,
            handleDelete
        }
    }
}
</script>

<style lang="less"
       scoped>
.tree-row {
    display: flex;
    align-items: center;

    &:hover {
        .tree-row {
            &__actions {
                display: flex;
            }

            &__code {
                display: none;
            }
        }
    }

    &__name {
        flex: 1;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &,
        > * {
            display: flex;
        }
    }

    &__code {
        font-size: 12px;
        color: @text-color-secondary;
    }

    &__actions {
        margin: 0 0 0 @margin-sm;
        display: none;
    }
}
</style>
