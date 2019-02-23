<template>
    <div class=''>
        <one-time-assignment v-for="project in projects" :key='project.id' :project='project'></one-time-assignment>
    </div>
</template>

<script>
import OneTimeAssignment from '../assignments/OneTimeAssignment';

export default {
    props: {
        projects: Array
    },
    components: {
        OneTimeAssignment
    }
}
</script>
