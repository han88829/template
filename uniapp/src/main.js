import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import request from './utils/request';
import * as utils from './utils';

Vue.config.productionTip = false
Vue.prototype.utils = utils;
Vue.prototype.request = request;

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
