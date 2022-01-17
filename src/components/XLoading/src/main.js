import Main from './main.vue'
import {createVNode, render} from 'vue'

let instance = null

const close = () => {
    if (instance) {
        instance.el.parentNode.parentNode.removeChild(instance.el.parentNode)
        instance = null
    }
}

const Loading = (props) => {
    if (instance) {
        close()
    }
    instance = createVNode(Main, props)
    const container = document.createElement('div')
    render(instance, container)
    document.body.appendChild(container)
    return Loading
}

Loading.close = () => {
    close()
}

export default Loading
