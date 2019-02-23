<template>
    <div class=''>
        <div class='row'>
            <div class='col-8'>
        <p>{{ resource.assignmentLabel }}{{ peopleLabel }}</p>
            </div>
            <div class='col-4'>
        <button type="button" class="btn btn-dark" @click.prevent='resource.incrementPeople'>+</button>
        <button type="button" class="btn btn-dark" @click.prevent='resource.decrementPeople'>-</button>
            </div>
        </div>
        <div class="progress">
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
        peopleLabel() {
            return " [" + this.resource.people + "]";
        },
    },
}
</script>
