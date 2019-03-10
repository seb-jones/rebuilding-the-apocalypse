<template>
    <div class=''>
        <div class='row'>
            <div class='col-12'>
            <p class='float-left'>{{ material.assignment_label }}</p>
            <button type="button" class="float-right btn btn-dark" @click.prevent='material.startTimer' :disabled='material.progress > 0' v-if='material.progress == 0'>Start</button>
            </div>
        </div>
        
        <div class="progress" v-if="material.progress > 0">
            <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="material.progress" aria-valuemin="0" aria-valuemax="100">{{ material.progress }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        material:{
            type: Object,
            required: true,
        },
    },
    computed: {
        progressStyle() {
            return "width: " + this.material.progress + "%";
        },
    },
}
</script>
