<template>
    <a-modal :visible="modal.visible"
             :title="modal.title"
             :width="480"
             centered
             :confirm-loading="modal.confirmLoading"
             :after-close="onAfterClose"
             :ok-button-props="{
                 style: {
                     display: disabled ? 'none' : ''
                 }
             }"
             :cancel-text="cancelText"
             @ok="handleOk"
             @cancel="handleCancel">
        <a-form :model="formState"
                :rules="rules"
                ref="formRef"
                :label-col="{ style: { width: '90px' } }">
            <a-form-item label="头像"
                         name="avatar">
                <x-upload-image v-model="formState.avatar"
                                :disabled="disabled"></x-upload-image>
            </a-form-item>
            <a-form-item label="登录帐号"
                         name="userName">
                <a-input v-model:value="formState.userName"
                         :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item label="姓名"
                         name="name">
                <a-input v-model:value="formState.name"
                         :disabled="disabled"></a-input>
            </a-form-item>
            <a-form-item label="所属角色"
                         name="role">
                <a-cascader v-model:value="formState.role"
                            placeholder=""
                            :options="roleList"
                            :disabled="disabled"
                            :field-names="{label: 'name', value: 'key', children: 'children'}"
                            multiple
                            max-tag-count="responsive"></a-cascader>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import {ref} from 'vue'
import {message} from 'ant-design-vue'
import {cloneDeep} from 'lodash'
import {systemApi} from '@/api'

import useModal from '@/hooks/useModal'
import useForm from '@/hooks/useForm'

export default {
    name: 'Edit',
    emits: ['ok'],
    setup(props, {emit}) {
        const {modal, showModal, hideModal, showLoading, hideLoading} = useModal()
        const {formRecord, formState, formRef, rules, formLayout, resetForm} = useForm()
        const disabled = ref(false)
        const cancelText = ref('取消')
        const roleList = ref([])

        rules.value = {
            avatar: {required: true, message: '请上传头像'},
            userName: {required: true, message: '请输入登录帐号'},
            name: {required: true, message: '请输入姓名'},
            role: {required: true, message: '请选择所属角色'}
        }

        /**
         * 获取角色列表
         * @returns {Promise<void>}
         */
        async function getUserRoleList() {
            try {
                const {code, data} = await systemApi.getUserRoleList().catch(() => {
                    throw new Error()
                })
                if ('200' === code) {
                    roleList.value = data.rows
                }
            } catch (err) {
            }
        }

        /**
         * 新建
         */
        function handleCreate() {
            showModal({
                type: 'create',
                title: '新建用户'
            })
            getUserRoleList()
        }

        /**
         * 编辑
         */
        function handleEdit(record) {
            showModal({
                type: 'edit',
                title: '编辑用户'
            })
            formState.value = {
                ...cloneDeep(record),
                role: []
            }
            formRecord.value = record
            getUserRoleList()
        }

        /**
         * 查看
         */
        function handlePreview(record) {
            showModal({
                type: 'preview',
                title: '查看用户'
            })
            formState.value = cloneDeep(record)
            disabled.value = true
            cancelText.value = '关闭'
            getUserRoleList()
        }

        /**
         * 确定
         */
        function handleOk() {
            formRef.value.validate().then((values) => {
                showLoading()
                setTimeout(() => {
                    message.success('保存成功')
                    hideLoading()
                    hideModal()
                    emit('ok')
                }, 3000)
            }).catch(err => {
                hideLoading()
            })
        }

        /**
         * 取消
         */
        function handleCancel() {
            hideModal()
        }

        /**
         * 关闭后
         */
        function onAfterClose() {
            resetForm()
            disabled.value = false
            cancelText.value = '取消'
            hideLoading()
        }

        return {
            modal,
            formRef,
            rules,
            formState,
            formLayout,
            disabled,
            cancelText,
            roleList,
            handleCreate,
            handleEdit,
            handlePreview,
            handleOk,
            handleCancel,
            onAfterClose
        }
    }
}
</script>

<style scoped>

</style>
