<template>
    <div class=''>
        <one-time-assignment v-for="project in projects" :key='project.id' :project='project' :resources='resources'></one-time-assignment>
    </div>
</template>

<script>
import OneTimeAssignment from '../assignments/OneTimeAssignment';

export default {
    props: {
        projects: Array,
        resources: Array,
    },
    components: {
        OneTimeAssignment
    }
}
</script>
