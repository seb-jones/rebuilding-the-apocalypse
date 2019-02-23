<template>
    <div class=''>
        <p>Unassigned People: {{ civ.people }}</p>
        <recurring-assignment name='Reproduce' progress='90'></recurring-assignment>
        <recurring-assignment name='Gather Wood' progress='100'></recurring-assignment>
        <recurring-assignment name='Smith Metal' progress='20'></recurring-assignment>
        <recurring-assignment name='Mine Uranium' progress='0'></recurring-assignment>
    </div>
</template>

<script>
import RecurringAssignment from '../assignments/RecurringAssignment';

export default {
    props: {
        civ: Object
    },
    components: {
        RecurringAssignment
    }
}
</script>
