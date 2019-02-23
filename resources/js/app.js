require('./bootstrap');

class Project {
    constructor(type = "tech", id, name, label) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.label = label;
        this.progress = 0;
        this.timer = null;
    }

    tick() {
        this.progress++;

        if (this.progress >= 100) {
            clearInterval(this.timer);
            this.timer = null;
            this.progress = 0;

            if (this.type === "tech") {
                for (var i = 0; i < availableTechs.length; ++i) {
                    if (availableTechs[i].id === this.id) {
                        // remove the item at index i
                        availableTechs.splice(i, 1);
                        break;
                    }
                }
            }
            else if (this.type === "building") {
                for (var i = 0; i < availableBuildings.length; ++i) {
                    if (availableBuildings[i].id === this.id) {
                        // remove the item at index i
                        availableBuildings.splice(i, 1);
                        break;
                    }
                }
            }
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

            // TODO speed
            200
        );
    }
}

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

// Globals
window.availableTechs = [
    new Project("tech", 1, 'farming', 'Farming'),
    new Project("tech", 2, 'mining', 'Mining'),
];

window.availableBuildings = [
    new Project("building", 1, 'house', 'House'),
    new Project("building", 2, 'lumber-yard', 'Lumber Yard'),
    new Project("building", 3, 'nuke-silo', 'Nuke Silo'),
];

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

        availableTechs: window.availableTechs,

        availableBuildings: window.availableBuildings,
    },
    components: {
        ResourceBar,
        MaterialsPanel,
        ProjectPanel,
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
