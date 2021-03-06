module.exports = function(Vue){
  //复用页面
  Vue.component('errorMessageView', require('./views/shared/error_message.vue'))
  Vue.component('micropostView', require('./views/shared/_micropost.vue'))
  Vue.component('userstatsView', require('./views/shared/_userstats.vue'))
  Vue.component('followView', require('./views/shared/_follow.vue'))

  //组件
  Vue.component('gravatar', require('./components/gravatar.vue'))
  Vue.component('paginate', require('./components/paginate.vue'))
  Vue.component('fieldInput', require('./components/field_input.vue'))

  //实例
  require('./data/login_info.js')(Vue)
}
