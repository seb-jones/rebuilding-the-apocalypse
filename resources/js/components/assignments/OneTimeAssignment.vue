<template>
    <div class=''>
        <div class='row'>
            <div class='col-12'>
                <p class='float-left'>{{ project.label }}</p>
                <button v-if="project.progress == 0" type="button" class="float-right btn btn-dark" @click.prevent='project.startTimer' :disabled="(project.progress > 0 || !canStart)">Start</button>
            </div>

            <div class='requirements col-12'>
                <h3>Requirements:</h3>
                <p v-for="resource in resources" :key="resource.id">{{ resource.label }}: {{ project[resource.name] }}</p>
            </div>

        </div>

        <div class='row'>
            <div class='col-8'>
                <div v-if="project.progress > 0" class="progress">
                    <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="project.progress" aria-valuemin="0" aria-valuemax="100">{{ project.progress }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        project: Object,
        resources: Array
    },
    computed: {
        progressStyle() {
            return "width: " + this.project.progress + "%";
        },
        canStart() {
            var result = true;

            for (var i = 0; i < this.resources.length; ++i) {
                if (window.civ[this.resources[i].name] < this.project[this.resources[i].name]) {
                    console.log(this.resources.name);
                    result = false;
                    break;
                }
            }

            return result;
        }
    },
    methods: {
    }
}
</script>
