
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

class Resource {
    constructor(id, quantity, name, label, assignmentLabel) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
        this.label = label;
        this.assignmentLabel = assignmentLabel;
        this.progress = 0;
        this.people = 0;
        this.timer = null;
    }

    tick() {
        this.progress++;

        if (this.progress >= 100) {
            this.quantity++;
            this.progress = 0;
        }
    }

    // Black magic to allow 'this' to be accessed in a setInterval function: https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
    startTimer() {
        if (this.timer)
            clearInterval(this.timer);

        this.timer = setInterval(
            (function(self) {
                return function() {
                    self.tick();
                }
            })(this),

            200 / this.people
        );
    }

    incrementPeople() {
        this.people++;

        if (this.timer === null) {
            this.progress = 0;
        }

        this.startTimer();
    }

    decrementPeople() {
        if (this.people > 0) {
            this.people--;
            if (this.people <= 0) {
                this.progress = 0;
                clearInterval(this.timer);
                this.timer = null;
            }
            else {
                this.startTimer();
            }
        }
    }
}

import axios from 'axios';
import Vue from 'vue';
import ResourceBar from './components/ResourceBar';
import MaterialsPanel from './components/panels/MaterialsPanel';
import ProjectPanel from './components/panels/ProjectPanel';

const app = new Vue({
    el: '#app',
    data: {
        civ: window.civ,

        resources: [
            new Resource(1, 5, 'people', 'People', 'Reproduce'),
            new Resource(2, 0, 'wood', 'Wood', 'Gather Wood'),
            new Resource(3, 0, 'metal', 'Metal', 'Mine Ore'),
            new Resource(4, 0, 'uranium', 'Uranium', 'Enrich Uranium'),
        ],

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

// Tick functions
//setInterval(sync_with_server, 1000);

function sync_with_server() {
    axios.post('/tick').then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}
