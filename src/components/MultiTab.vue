<template>
    <div class="x-multi-tab">
        <a-tabs :active-key="current"
                type="card"
                @change="handleSwitch">
            <a-tab-pane v-for="(item,index) in multiTabList"
                        :key="index">
                <template #tab>
                    <a-dropdown :trigger="['contextmenu']">
                        <div>
                            {{ item.meta.title }}
                            <span v-if="current === index"
                                  class="x-multi-tab__reload-btn"
                                  @click.stop="handleReload(item)">
                                <icon-reload-outlined class="ma-0"
                                                      :spin="spin"/>
                            </span>
                            <span class="x-multi-tab__close-btn"
                                  @click.stop="handleClose(item)">
                                <icon-close-outlined class="ma-0"/>
                            </span>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="reload"
                                             @click="handleReload(item)">重新加载
                                </a-menu-item>
                                <a-menu-item key="close"
                                             @click="handleClose(item)">关闭
                                </a-menu-item>
                                <a-menu-item v-if="multiTabList.length > 1"
                                             key="closeOther"
                                             @click="handleCloseOther(item)">关闭其他
                                </a-menu-item>
                                <a-menu-item v-if="index > 0"
                                             key="closeLeft"
                                             @click="handleCloseLeft(item)">关闭左侧
                                </a-menu-item>
                                <a-menu-item v-if="index < multiTabList.length - 1"
                                             key="closeRight"
                                             @click="handleCloseRight(item)">关闭右侧
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import {onMounted, computed, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter, onBeforeRouteUpdate} from 'vue-router'

import useMultiTab from '@/hooks/useMultiTab'

export default {
    name: 'MultiTab',
    setup() {
        const store = useStore()
        const router = useRouter()
        const multiTabList = computed(() => store.getters['multiTab/list'])
        const current = computed(() => store.getters['multiTab/current'])
        const spin = ref(false)
        const {
            getSimpleRoute,
            open,
            close: handleClose,
            closeLeft: handleCloseLeft,
            closeRight: handleCloseRight,
            closeOther: handleCloseOther,
            reload,
        } = useMultiTab()

        /**
         * 重新加载
         * @param route
         */
        function handleReload(route) {
            reload(route)
            spin.value = true
            setTimeout(() => {
                spin.value = false
            }, 1000)
        }

        /**
         * 切换标签页
         * @param index
         */
        function handleSwitch(index) {
            router.push(multiTabList.value[index])
        }

        /**
         * 路由发生变化
         */
        onBeforeRouteUpdate((to) => {
            open(getSimpleRoute(to))
        })

        onMounted(() => {
            open(getSimpleRoute(router.currentRoute.value))
        })

        return {
            multiTabList,
            current,
            spin,
            handleClose,
            handleCloseLeft,
            handleCloseRight,
            handleCloseOther,
            handleReload,
            handleSwitch,
        }
    },
}
</script>

<style lang="less"
       scoped>
.x-multi-tab {
    position: sticky;
    top: 48px;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    &__reload-btn,
    &__close-btn {
        font-size: 12px;
        margin-left: 8px;
        color: @text-color-secondary;
        transition: color .3s;
        line-height: 1;
        height: 12px;

        &:hover {
            color: @primary-color;
        }
    }

    :deep(.ant-tabs) {
        background: #ffffff;
        padding: 0 @padding-md;
    }

    :deep(.ant-tabs-top > .ant-tabs-nav) {
        margin-bottom: 0;
    }

    :deep(.ant-tabs-top > .ant-tabs-nav::before) {
        display: none;
    }

    :deep(.ant-tabs-tab-btn) {
        height: 100%;
    }

    :deep(.ant-dropdown-trigger) {
        display: flex;
        padding: 0 12px;
        align-items: center;
        font-weight: 400;
        height: 100%;
    }

    :deep(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab) {
        height: 40px;
        padding: 0;
        border-bottom: 0;
    }
}
</style>
