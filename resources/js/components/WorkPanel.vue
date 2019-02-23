<template>
    <div class=''>
        <p>Unassigned People: {{ civ.people }}</p>
        <work-assignment name='Gather Wood' progress='100'></work-assignment>
        <work-assignment name='Smith Metal' progress='20'></work-assignment>
        <work-assignment name='Mine Uranium' progress='0'></work-assignment>
    </div>
</template>

<script>
import WorkAssignment from './WorkAssignment';

export default {
    props: {
        civ: Object
    },
    components: {
        WorkAssignment
    }
}
</script>
