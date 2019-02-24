<template>
    <div class='project-panel panel'>
        <one-time-assignment v-for="project in projects" :key='project.id' :project='project' :resources='resources'></one-time-assignment>

        <div v-if='completedTechs.length > 0' class='completed-techs'>
            <div class='text-center'>
                <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Toggle Completed Research</button>
            </div>
            <div class="collapse" id="collapseExample">
                <ul class='mt-3'>
                    <li v-for="t in completedTechs" :key="t.id">{{ t.label }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import OneTimeAssignment from '../assignments/OneTimeAssignment';

export default {
    props: {
        projects: Array,
        resources: Array,
        completedTechs: Array,
    },
    components: {
        OneTimeAssignment
    }
}
</script>
