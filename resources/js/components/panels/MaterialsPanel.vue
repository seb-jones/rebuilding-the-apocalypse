<template>
    <div class='materials-panel panel'>
        <materials-assignment class='py-2' v-for='resource in resources' :key='resource.id' :resource='resource'></materials-assignment>
    </div>
</template>

<script>
import MaterialsAssignment from '../assignments/MaterialsAssignment';

export default {
    props: {
        civ: Object,
        resources: Array
    },
    components: {
        MaterialsAssignment
    }
}
</script>
