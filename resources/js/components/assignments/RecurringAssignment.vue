<template>
    <div class=''>
        <div class='row'>
            <div class='col-8'>
        <p>{{ resource.assignment_label }}</p>
            </div>
            <div class='col-4'>
                <button type="button" class="btn btn-dark" @click.prevent='resource.startTimer' :disabled='resource.progress > 0' v-if='resource.progress == 0'>Start</button>
            </div>
        </div>
        <div class="progress" v-if="resource.progress > 0">
            <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="resource.progress" aria-valuemin="0" aria-valuemax="100">{{ resource.progress }}</div>
        </div>
        <br>
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
