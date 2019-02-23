<template>
    <div class=''>
        <p>{{ name }}</p>
        <div class="progress">
            <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">{{ progress }}</div>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        progress: String
    },
    computed: {
        progressStyle() {
            return "width: " + this.progress + "%";
        }
    }
}
</script>
