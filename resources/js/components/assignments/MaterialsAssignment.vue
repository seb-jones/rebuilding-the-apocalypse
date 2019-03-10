<template>
    <div class=''>
        <div class='row'>
            <div class='col-12'>
            <p class='float-left'>{{ resource.assignment_label }}</p>
            <button type="button" class="float-right btn btn-dark" @click.prevent='resource.startTimer' :disabled='resource.progress > 0' v-if='resource.progress == 0'>Start</button>
            </div>
        </div>
        <div class="progress" v-if="resource.progress > 0">
            <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="resource.progress" aria-valuemin="0" aria-valuemax="100">{{ resource.progress }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        resource: Object
    },
    computed: {
        progressStyle() {
            return "width: " + this.resource.progress + "%";
        },
    },
}
</script>
