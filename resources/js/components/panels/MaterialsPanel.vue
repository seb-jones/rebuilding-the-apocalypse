<template>
    <div class=''>
        <recurring-assignment v-for='resource in resources' :key='resource.id' :resource='resource'></recurring-assignment>
    </div>
</template>

<script>
import RecurringAssignment from '../assignments/RecurringAssignment';

export default {
    props: {
        civ: Object,
        resources: Array
    },
    components: {
        RecurringAssignment
    }
}
</script>
