<template>
    <div class='materials-panel panel'>
        <materials-assignment class='py-2' v-for='material in materials' :key='material.id' :material='material'></materials-assignment>
    </div>
</template>

<script>
import MaterialsAssignment from '../assignments/MaterialsAssignment';

export default {
    props: {
    },
    components: {
        MaterialsAssignment
    },
    data() {
        return {
            materials: []
        }
    }
}
</script>
