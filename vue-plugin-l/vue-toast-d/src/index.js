import ToastComponent from './vue-toast.vue'

let Toast = {}

Toast.install = function (msg,opt) { //vue插件必须要有install方法

  let options = {
    duration:3000
  }

  Vue.prototype.$toast = function (msg,opt) {

    if(typeof opt === 'object'){
      for(var key in opt){
        options[key] = opt[key]
      }
    }

    const ToastMethod = Vue.extend(ToastComponent)
    let _install = new ToastMethod().$mount(document.createElement('div'))
    _install.msg = msg
    _install.visible = true

    setTimeout(()=>{
      _install.visible = false
      document.body.removeChild(_install.$el)
    },options.duration)
    
  }
  
  Vue.prototype.$toast['show'] = function () {
    Vue.prototype.$toast(msg,opt)
  }

}

export default Toast