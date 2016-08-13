module.exports = function(Vue, router){
  Vue.http.options.root = 'http://localhost:3000/api/v1'

  var userActions = {
    login: {method: 'POST', url: 'users/login'}
  }
  window.user_resource = Vue.resource('users{/id}', {}, userActions)

  var micropostActions = {
    count: {method: 'GET', url: 'microposts/count'}
  }
  window.micropost_resource = Vue.resource('microposts{/id}', {}, micropostActions)


  Vue.http.interceptors.push((request, next) => {
    let jwt = login_info.jwt
    if (jwt) {
      request.headers['Authorization'] = `Token ${jwt}`
    }
    // continue to next interceptor
    next((response) => {
      switch(response.status)
      {
        case 0://服务器未响应
          flash_view.now('服务器未响应, 请稍后刷新重试', 'danger')
          break
        case 200: break
        case 201: break//添加成功
        case 204: break
        case 401://未登录
          utils.flash(response.text(), 'danger')
          sessionStorage.setItem('forwarding_url', router.current_route.path)
          router.go({name:'user_login'})
          break
        case 403://没有权限访问
          utils.flash(response.text(), 'danger')
          router.go({name:'home'})
          break
        case 422: break
        default:
          alert(response.status)
          alert(response.statusText)
          alert(response.text())
      }
    });
  });
}
