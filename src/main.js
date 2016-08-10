'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Resources from './resources'
import Mixin from './mixin'
import ComponentsMap from './components'
import RouterMap from './router'
import Filters from './filters'
require('bootstrap-loader');
window.utils = require('./libs/utils')

Mixin(Vue)//加载混入

Vue.use(Router)
var router = new Router()
RouterMap(router)

Vue.use(VueResource)
Resources(Vue, router)

Object.keys(Filters).forEach(k => Vue.filter(k, Filters[k]));

ComponentsMap(Vue)
router.start(require('./app.vue'), 'app')
