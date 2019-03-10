<template>
    <div class='resource-bar'>
        <li v-for="resource in resources" :key="resource.id">{{ resource.label }}: {{ civ[resource.name] }}</li>
    </div>
</template>

<script>
export default {
    props: {
        civ: Object,
        resources: Array,
    }
}
</script>
