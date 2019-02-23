<template>
    <div class=''>
        <div class='row'>
            <div class='col-8'>
        <p>{{ project.label }}</p>
            </div>
            <div class='col-4'>
                <button v-if="project.progress == 0" type="button" class="btn btn-dark" @click.prevent='project.startTimer' :disabled="project.progress > 0">Start</button>
            </div>
        </div>

        <div v-if="project.progress > 0" class="progress">
            <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="project.progress" aria-valuemin="0" aria-valuemax="100">{{ project.progress }}</div>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    props: {
        project: Object
    },
    computed: {
        progressStyle() {
            return "width: " + this.project.progress + "%";
        },
    }
}
</script>
