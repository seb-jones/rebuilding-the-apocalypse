<template>
    <div class='resource-bar'>
        <li v-for="resource in resources" :key="resource.id">{{ resource.label }}: {{ resource.quantity }}</li>
    </div>
</template>

<script>
export default {
    props: {
        resources: Array,
    }
}
</script>
