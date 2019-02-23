<template>
    <div class=''>
        <one-time-assignment v-for="assignment in assignments" :name="assignment.name" :key='assignment.id'></one-time-assignment>
    </div>
</template>

<script>
import OneTimeAssignment from '../assignments/OneTimeAssignment';

export default {
    props: {
        assignments: Array
    },
    components: {
        OneTimeAssignment
    }
}
</script>
