import {createVNode, render} from 'vue'

import PreviewConstructor from './preview.vue'

let vm = null
let container = null

const clear = () => {
    vm.el.parentNode.parentNode.removeChild(vm.el.parentNode)
    vm = null
    container.remove()
    container = null
}

const Preview = (props = {}) => {
    vm = createVNode(PreviewConstructor, props)
    container = document.createElement('div')
    render(vm, container)
    document.body.appendChild(container)
    vm.component.ctx.handleOpen()
    return Preview
}

Preview.close = () => {
    if (vm.component.ctx.visible) {
        vm.component.ctx.handleClose()
    }
    clear()
}

export default Preview
