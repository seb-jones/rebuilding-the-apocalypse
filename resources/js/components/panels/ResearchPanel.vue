<template>
    <div class='project-panel panel'>
        <research-assignment class='py-2' v-for="research in researches" :key='research.id' :research='research'></research-assignment>

        <div v-if='completedResearches.length > 0' class='completed-researches'>
            <div class='text-center'>
                <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Toggle Completed Research</button>
            </div>
            <div class="collapse" id="collapseExample">
                <ul class='mt-3'>
                    <li v-for="t in completedResearches" :key="t.id">{{ t.label }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import ResearchAssignment from '../assignments/ResearchAssignment';

export default {
    props: {
    },
    components: {
        ResearchAssignment
    },
    data() {
        return {
            researches: [],
            completedResearches: [],
        }
    }
}
</script>
