<template>
    <a-row :gutter="16"
           type="flex"
           class="hp-100">
        <a-col flex="0 0 300px">
            <dict-type-tree @select="onDictTypeSelect"/>
        </a-col>
        <a-col flex="1">
            <a-card type="flex">
                <template v-if="!dictTypeInfo">
                    <a-empty description="请选择字典分类"></a-empty>
                </template>
                <template v-else>
                    <x-action-bar class="mb-8-2">
                        <a-button type="primary"
                                  @click="$refs.editRef.handleCreate()">
                            <template #icon>
                                <icon-plus-outlined/>
                            </template>
                            新建项
                        </a-button>
                        <template #extra>
                            <x-search-bar :body-style="{padding: 0}">
                                <a-form layout="inline">
                                    <a-row :gutter="12"
                                           type="flex">
                                        <a-col>
                                            <a-form-item>
                                                <a-input></a-input>
                                            </a-form-item>
                                        </a-col>
                                        <a-col>
                                            <a-button type="primary"
                                                      ghost
                                                      @click="handleSearch">搜索
                                            </a-button>
                                        </a-col>
                                    </a-row>
                                </a-form>
                            </x-search-bar>
                        </template>
                    </x-action-bar>
                    <a-table :columns="columns"
                             :pagination="pagination"
                             :data-source="list"
                             :loading="loading"
                             row-key="id"
                             :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                             @change="onTableChange">
                        <template #bodyCell="{column, record, index}">
                            <template v-if="'valid' === column.key">
                                <a-switch :checked="record.valid"
                                          size="small"></a-switch>
                            </template>
                            <template v-if="'action' === column.key">
                                <x-action-button @click="$refs.editRef.handleEdit(record)">编辑</x-action-button>
                                <x-action-button>
                                    <a-popconfirm title="确认删除？"
                                                  @confirm="handleDelete">
                                        删除
                                    </a-popconfirm>
                                </x-action-button>
                            </template>
                        </template>
                    </a-table>
                </template>
            </a-card>
        </a-col>
    </a-row>

    <edit ref="editRef"/>
</template>

<script>
import {ref} from 'vue'
import {commonApi} from '@/api'
import {message} from 'ant-design-vue'

import usePagination from '@/hooks/usePagination'

import Edit from './components/Edit'
import DictTypeTree from './components/DictTypeTree'

export default {
    name: 'systemDict',
    components: {DictTypeTree, Edit},
    setup() {
        const {list, pagination, loading, resetPagination, searchForm} = usePagination()
        const selectedRowKeys = ref([])
        const editRef = ref()
        const dictTypeInfo = ref(null)

        const columns = [
            {title: '名称', dataIndex: 'name'},
            {title: '键值', dataIndex: 'keyValue', width: 240},
            {title: '是否有效', key: 'valid', dataIndex: 'valid', width: 120},
            {title: '操作', key: 'action', width: 120}
        ]

        /**
         * 获取分页列表
         */
        async function getPageList() {
            try {
                const {pageSize, current} = pagination
                loading.value = true
                const {code, data} = await commonApi.getPageList({
                    pageSize,
                    page: current,
                    ...searchForm
                }).catch(() => {
                    loading.value = false
                })
                loading.value = false
                if ('200' === code) {
                    list.value = data.rows
                    pagination.total = data.total
                }
            } catch (err) {
                loading.value = false
            }
        }

        /**
         * 搜索
         */
        function handleSearch() {
            resetPagination()
            getPageList()
        }

        /**
         * 表格发生改变
         * @param current
         * @param pageSize
         */
        function onTableChange({current, pageSize}) {
            pagination.current = current
            pagination.pageSize = pageSize
            getPageList()
        }

        /**
         * 删除
         */
        function handleDelete() {
            message.success('删除成功')
            getPageList()
        }

        /**
         * 选择
         */
        function onSelectChange(keys) {
            selectedRowKeys.value = keys
        }

        /**
         * 选择分类
         * @param info
         */
        function onDictTypeSelect(info) {
            dictTypeInfo.value = info
            searchForm.type = info.key
            getPageList()
        }

        return {
            columns,
            loading,
            list,
            pagination,
            selectedRowKeys,
            editRef,
            dictTypeInfo,
            handleSearch,
            handleDelete,
            onTableChange,
            onSelectChange,
            onDictTypeSelect
        }
    }
}
</script>

<style lang="less"
       scoped>
</style>
