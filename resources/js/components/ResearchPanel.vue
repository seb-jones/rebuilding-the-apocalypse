<template>
    <div class=''>
        <research-assignment v-for="assignment in researchAssignments" :name="assignment.name" :key='assignment.id'></research-assignment>
    </div>
</template>

<script>
import ResearchAssignment from './ResearchAssignment';

export default {
    props: {
        civ: Object
    },
    data() {
        return {
            researchAssignments: [
                { id: 1, name: 'Mining' },
                { id: 2, name: 'Farming' },
            ]
        }
    },
    components: {
        ResearchAssignment
    }
}
</script>
