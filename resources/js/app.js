
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import axios from 'axios';
import Vue from 'vue';
import ResourceBar from './components/ResourceBar';

const app = new Vue({
    el: '#app',
    data: {
        civ: window.civ
    },
    components: {
        ResourceBar
    }
});

// Tick function
setInterval(tick, 1000);

function tick() {
    axios.post('/tick').then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}
