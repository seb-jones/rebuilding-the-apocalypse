<template>
    <div class='resource-bar'>
        <li v-for="material in materials" :key="material.id">{{ material.label }}: {{ civ[material.name] }}</li>
    </div>
</template>

<script>
export default {
    props: {
        civ: {
            type: Object,
            required: true,
        },
    },
    computed: {
        materials () {
            return [
                {
                    id: 1,
                    label: "People",
                    name: "people",
                },
                {
                    id: 2,
                    label: "Lumber",
                    name: "lumber",
                },
                {
                    id: 3,
                    label: "Metal",
                    name: "metal",
                },
                {
                    id: 4,
                    label: "Uranium",
                    name: "uranium",
                },
            ];
        }
    }
}
</script>
