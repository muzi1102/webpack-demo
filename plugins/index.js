console.log(11111)

import './index.css';

import './flexlib';

import App from './App.vue';
import Vue from 'vue';

// 模板编译
// new Vue({
//     el: '#app',
//     components: { App },
//     template: '<App/>'
// })

new Vue({
    el: '#app',
    render: h => h(App)
  })