require('./bootstrap');

window.AvailableTechIndex = -1;

function playAudio(name, loop = false) {
    try {
        if (loop) {
            window.Sounds[name].addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }

        window.Sounds[name].play();
    }
    catch (e) {
        //
    }
    finally {
        return null;
    }
}

// Set Up Audio
try {
    window.Sounds = {
        background: new Audio('/sfx/background.mp3'),
        project: new Audio('/sfx/project.mp3'),
        click: new Audio('/sfx/click.mp3'),
        hover: new Audio('/sfx/hover.mp3'),
        metal: new Audio('/sfx/metal.mp3'),
        people: new Audio('/sfx/people.mp3'),
        uranium: new Audio('/sfx/uranium.mp3'),
        wood: new Audio('/sfx/wood.mp3'),
        explosion: new Audio('/sfx/explosion.mp3'),
    };

    window.Sounds.explosion.addEventListener('ended', function() {
        window.location = "/reset";
    });
}
catch (e) {
    //
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

    document.getElementById('nuke-overlay').style.opacity = 0;

    if (window.Civ.has_won) {
        addReport(Math.random(), Date.now(), "Civilisation has begun to rebuild... again.");
    }
    else {
        addReport(Math.random(), Date.now(), "Civilisation has begun to rebuild...");
    }

    playAudio('background', true);
});

/*
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
                    window.AvailableTechIndex = i;

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

                        var t = availableTechs.splice(window.AvailableTechIndex, 1);
                        completedTechs.push(t[0]);

                        playAudio('project');
                    }).catch(function (error) {
                        console.log(error);
                    });

                    break;
                }
            }

            addReport(Math.random(), Date.now(), "Research into '" + this.label + "' technology is complete.", "normal");
        }
    }

    // Black magic to allow 'this' to be accessed in a setInterval function: https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
    startTimer() 
    {
        window.Civ.people -= this.people;
        window.Civ.wood -= this.wood;
        window.Civ.metal -= this.metal;
        window.Civ.uranium -= this.uranium;

        axios.post('/resources/pay', { people: this.people, wood: this.wood, metal: this.metal, uranium: this.uranium }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log("RESOURCE/PAY ERROR: ");
            console.log(error);
        });

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

            var msg = null;
            switch (this.name) {
                case "people": msg = "New person recruited."; break;
                case "wood": msg = "Wood collected."; break;
                case "metal": msg = "Metal mined."; break;
                case "uranium": msg = "Uranium enriched."; break;
            }

            if (msg) {
                addReport(Math.random(), Date.now(), msg);
            }

            axios.post('/resources/increment', { name: this.name }).then(function (response) {
                updateResources(response.data.name, response.data.quantity);
            }).catch(function (error) {
                console.log("RESOURCES/INCREMENT ERROR");
                console.log(error);
            });
        }
    }

    // Black magic to allow 'this' to be accessed in a setInterval function: https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
    startTimer() 
    {
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
    }
}
*/

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
import MaterialsBar from './components/MaterialsBar';
import MaterialsPanel from './components/panels/MaterialsPanel';
import ResearchPanel from './components/panels/ResearchPanel';

// Global Variables
/*
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
*/

window.reports = [
];

// Global Functions
function addReport(id, time, message, type="normal") 
{
    reports.unshift(new Report(id, time, message, type));
}

function updateResources(name, quantity)
{
    window.Civ[name] = quantity;
}

import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        researches: [],
        completedResearches: [],
    },
    mutations: {
        updateResearch (state, researches) {
            state.researches = researches;
        },
    },
    actions: {
        completeResearch (state, research) {
            /*
            axios.post('/research/complete', {id: research.id}).then(response => 
                let index = state.researches.findIndex(element => {
                    return element.id === research.id;
                });

                let completedResearch = state.researches[index];

                state.researches.splice(index, 1);

                state.completedResearches.push(completedResearch);
            )
                */
        },
    }
});

const app = new Vue({
    el: '#app',
    store, 
    data: {
        civ: window.Civ,
        reports: window.reports,
    },

    components: {
        MaterialsBar,
        MaterialsPanel,
        ResearchPanel,
    },

    created() {
        axios.get('/research/').then(response => {
            this.$store.commit('updateResearch', response.data);
        });
    },

    methods: {
        reset() {
            /*
            axios.post('/reset').then(function (response) {
                var resources = response.data.resources;
                for (var key in resources) {
                    updateResources(key, resources[key]);
                }
            }).catch(function (error) {
                console.log('/RESET ERROR');
                console.log(error);
            });
            */
        },

        atEndGame() {
            /*
            return completedTechs.some(function (element) {
                return element.id === 5;
            });
            */
            return false;
        },

        win() {
            window.Sounds.background.pause();
            window.Sounds.background.currentTime = 0;
            document.getElementById('nuke-overlay').style.opacity = 1;

            try {
                playAudio("explosion") === null;
            }
            catch (e) {
                //
                window.location = "/reset";
            }
            finally {
            }
        }
    }
});
