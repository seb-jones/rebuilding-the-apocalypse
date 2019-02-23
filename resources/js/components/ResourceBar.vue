<template>
    <div>
        <li>People: {{ civ.people }}</li>
        <li>Wood: {{ civ.wood }}</li>
        <li>Metal: {{ civ.metal }}</li>
        <li>Uranium: {{ civ.uranium }}</li>
    </div>
</template>

<script>
export default {
    props: {
        civ: Object,
    }
}
</script>
