
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import axios from 'axios';
import Vue from 'vue';
import ResourceBar from './components/ResourceBar';
import MaterialsPanel from './components/panels/MaterialsPanel';
import ProjectPanel from './components/panels/ProjectPanel';

const app = new Vue({
    el: '#app',
    data: {
        civ: window.civ,
        availableTechs: [
            { id: 1, name: "Mining" },
            { id: 2, name: "Farming" },
        ],
        availableBuildings: [
            { id: 1, name: "House" },
            { id: 2, name: "Lumber Yard" },
        ],
    },
    components: {
        ResourceBar,
        MaterialsPanel,
        ProjectPanel
    }
});

// Tick function
//setInterval(tick, 1000);

function tick() {
    axios.post('/tick').then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}
