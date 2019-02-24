require('./bootstrap');

class Project 
{
    constructor(id, name, label) 
    {
        this.id = id;
        this.name = name;
        this.label = label;
        this.progress = 0;
        this.timer = null;
    }

    tick() 
    {
        this.progress++;

        if (this.progress >= 100) {
            clearInterval(this.timer);
            this.timer = null;
            this.progress = 0;

            for (var i = 0; i < availableTechs.length; ++i) {
                if (availableTechs[i].id === this.id) {
                    // remove the item at index i
                    console.log(availableTechs[i].id);

                    axios.post('/projects/complete', { id: availableTechs[i].id }).then(function (response) { 
                        console.log(response);
                    }).catch(function (error) {
                        console.log(error);
                    });

                    var t = availableTechs.splice(i, 1);

                    completedTechs.push(t[0]);

                    break;
                }
            }

            addReport(Math.random(), Date.now(), "Research into '" + this.label + "' technology is complete.", "normal");
        }
    }

    // Black magic to allow 'this' to be accessed in a setInterval function: https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
    startTimer() 
    {
        this.progress = 100;
        this.tick();

        /*
        if (this.timer)
            clearInterval(this.timer);

        this.timer = setInterval(
            (function(self) {
                return function() {
                    self.tick();
                }
            })(this),

            // TODO speed
            20
        );
        */
    }
}

class Resource 
{
    constructor(id, name, label, assignmentLabel) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.assignmentLabel = assignmentLabel;
        this.progress = 0;
        this.timer = null;
    }

    tick() 
    {
        this.progress++;

        if (this.progress >= 100) {
            this.progress = 0;
            clearInterval(this.timer);
            this.timer = null;

            axios.post('/resources/increment', { name: this.name }).then(function (response) {
                updateResources(response.data.name, response.data.quantity);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    // Black magic to allow 'this' to be accessed in a setInterval function: https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
    startTimer() 
    {
        this.progress = 100;
        this.tick();

        /*
        if (this.timer)
            clearInterval(this.timer);

        this.timer = setInterval(
            (function(self) {
                return function() {
                    self.tick();
                }
            })(this),

            20, // TODO resource duration
        );
        */
    }
}

class Report 
{
    constructor(id, time, message, type) 
    {
        this.id = id;
        this.time = time;
        this.message = message;
        this.type = type;
    }
}

import axios from 'axios';
import Vue from 'vue';
import ResourceBar from './components/ResourceBar';
import MaterialsPanel from './components/panels/MaterialsPanel';
import ProjectPanel from './components/panels/ProjectPanel';

// Global Variables
window.availableTechs = [];
var techs = window.availableTechsRaw;
for (var i = 0; i < techs.length; ++i) {
    window.availableTechs.push(new Project(techs[i].id, techs[i].name, techs[i].label));
}

window.completedTechs = [];

techs = window.completedTechsRaw;
for (var i = 0; i < techs.length; ++i) {
    window.completedTechs.push(new Project(techs[i].id, techs[i].name, techs[i].label));
}

window.reports = [
    /*
    new Report(1, Date.now(), "Hello", "normal"),
    new Report(2, Date.now(), "World", "warning"),
    new Report(3, Date.now(), "Uh oh", "error"),
    new Report(4, Date.now(), "Banana Hammock", "normal"),
    */
];

// Global Functions
function addReport(id, time, message, type="normal") 
{
    reports.unshift(new Report(id, time, message, type));
}

function updateResources(name, quantity)
{
    window.civ[name] = quantity;
}

const app = new Vue({
    el: '#app',
    data: {
        civ: window.civ,

        availableTechs: window.availableTechs,

        completedTechs: window.completedTechs,

        reports: window.reports,

        resources: [
            new Resource(1, 'people', 'People', 'Recruit'),
            new Resource(2, 'wood', 'Wood', 'Gather Wood'),
            new Resource(3, 'metal', 'Metal', 'Mine Ore'),
            new Resource(4, 'uranium', 'Uranium', 'Enrich Uranium'),
        ],
    },
    components: {
        ResourceBar,
        MaterialsPanel,
        ProjectPanel,
    },
    methods: {
        reset() {
            axios.post('/reset').then(function (response) {
                console.log(response.data.availableTechs);

                var resources = response.data.resources;
                for (var key in resources) {
                    updateResources(key, resources[key]);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
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
