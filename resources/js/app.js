require('./bootstrap');

window.Sounds = {
    background: new Audio('/sfx/background.mp3'),
    click: new Audio('/sfx/click.mp3'),
    hover: new Audio('/sfx/hover.mp3'),
    metal: new Audio('/sfx/metal.mp3'),
    people: new Audio('/sfx/people.mp3'),
    uranium: new Audio('/sfx/uranium.mp3'),
    wood: new Audio('/sfx/wood.mp3'),
};

function playAudio(name, loop = false) {
    if (loop) {
        window.Sounds[name].addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }

    window.Sounds[name].play();
}

addEventListener('load', function () {
    var btns = document.getElementsByTagName('button');

    for (var i = 0; i < btns.length; ++i) {
        btns[i].addEventListener('click', function (event) {
            if (!event.target.disabled)
                playAudio('click');
        });

        btns[i].addEventListener('mouseover', function (event) {
            if (!event.target.disabled)
                playAudio('hover');
        });
    }
});

playAudio('background', true);

class Project 
{
    constructor(id, name, label, time_per_tick, people = 0, wood = 0, metal = 0, uranium = 0) 
    {
        this.id = id;
        this.name = name;
        this.label = label;
        this.progress = 0;
        this.timer = null;
        this.time_per_tick = time_per_tick;
        this.people = people;
        this.wood = wood;
        this.metal = metal;
        this.uranium = uranium;
    }

    tick() 
    {
        this.progress++;

        if (this.progress >= 100) {
            this.progress = 0;

            if (this.timer !== null) {
                clearInterval(this.timer);
                this.timer = null;
            }

            for (var i = 0; i < availableTechs.length; ++i) {
                if (availableTechs[i].id === this.id) {
                    // remove the item at index i
                    axios.post('/projects/complete', { id: availableTechs[i].id }).then(function (response) { 
                        if (response.data) {
                            var unlocked = response.data;
                            if (unlocked != null) {
                                if (unlocked.tech) {
                                    var t = unlocked.tech;

                                    availableTechs.push(
                                        new Project(t.id, t.name, t.label, t.time_per_tick, t.people, t.wood, t.metal, t.uranium)
                                    );
                                }

                                if (unlocked.resource) {
                                    var r = unlocked.resource;

                                    window.Resources.push(
                                        new Resource(r.id, r.name, r.label, r.assignment_label, r.time_per_tick)
                                    );
                                }
                            }
                        }
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
        window.civ.people -= this.people;
        window.civ.wood -= this.wood;
        window.civ.metal -= this.metal;
        window.civ.uranium -= this.uranium;

        axios.post('/resources/pay', { people: this.people, wood: this.wood, metal: this.metal, uranium: this.uranium }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

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

            this.time_per_tick
        );
        */
    }
}

class Resource 
{
    constructor(id, name, label, assignment_label, time_per_tick) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.assignment_label = assignment_label;
        this.time_per_tick = time_per_tick;
        this.progress = 0;
        this.timer = null;
    }

    tick() 
    {
        this.progress++;

        if (this.progress >= 100) {
            playAudio(this.name);

            this.progress = 0;

            if (this.timer !== null) {
                clearInterval(this.timer);
                this.timer = null;
            }

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

            this.time_per_tick
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
    window.availableTechs.push(new Project(techs[i].id, techs[i].name, techs[i].label, techs[i].time_per_tick, techs[i].people, techs[i].wood, techs[i].metal, techs[i].uranium));
}

window.completedTechs = [];

techs = window.completedTechsRaw;
for (var i = 0; i < techs.length; ++i) {
    window.completedTechs.push(new Project(techs[i].id, techs[i].name, techs[i].label, techs[i].time_per_tick));
}

window.Resources = [];
var resData = window.resourceData;

for (var i = 0; i < resData.length; ++i) {
    window.Resources.push(
        new Resource(resData[i].id, resData[i].name, resData[i].label, resData[i].assignment_label, resData[i].time_per_tick)
    );
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

        resources: window.Resources,
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
