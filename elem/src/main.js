// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入vue框架
import Vue from 'vue'
// 引入根组件
import App from './App'
// 引入路由
import Router from 'vue-router'
import Resource from 'vue-resource'

import goods from './components/sellers/goods/goods'
import ratings from './components/sellers/ratings/ratings'
import seller from './components/sellers/seller/seller'

import './common/stylus/index.styl'

Vue.use(Router)
Vue.use(Resource)

//    关闭生产模式下的提示
Vue.config.productionTip = false

//定义路由页面
const routes = [
	{ path: '/goods',component: goods},
	{ path: '/ratings',component: ratings},
	{ path: '/seller',component: seller},
]

const router = new Router({
	routes
})

let app = new Vue({
	el:"#app",
	router,
	//渲染视图
	render:h => h(App)
})

Vue.use({
	app
})
