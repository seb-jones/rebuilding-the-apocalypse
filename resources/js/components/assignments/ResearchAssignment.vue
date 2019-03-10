<template>
    <div class=''>
        <div class='row'>
            <div class='col-12'>
                <p class='float-left'>{{ research.label }}</p>
                <button v-if="progress == 0" type="button" class="float-right btn btn-dark" @click.prevent='start' :disabled="(progress > 0 || !canStart)">Start</button>
            </div>

            <!--
                <div class='requirements col-12'>
                <p>Requirements:</p><p v-for="resource in resources" :key="resource.id">{{ resource.label }}: {{ research[resource.name] }}</p>
                </div>
            -->

        </div>

        <div class='row'>
            <div class='col-8'>
                <div v-if="progress > 0" class="progress">
                    <div class="progress-bar" role="progressbar" :style="progressStyle" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">{{ progress }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            progress: 0,
        };
    },
    props:
    {
        research: {
            type: Object,
            required: true,
        },
    },
    computed: {
        progressStyle() {
            return "width: " + this.progress + "%";
        },
        canStart() {
            var result = true;
            return true;

            /*
                for (var i = 0; i < this.resources.length; ++i) {
                    if (window.civ[this.resources[i].name] < this.project[this.resources[i].name]) {
                        console.log(this.resources.name);
                        result = false;
                        break;
                    }
                }
             */

            return result;
        },
        hasStarted() {
            return this.timer === null;
        },
    },
    methods: {
        start() {
            this.timer = setInterval(() => {
                this.tick();
            }, 10);
        },
        tick() {
            this.progress++;
            if (this.progress >= 100) {
                clearInterval(this.timer);
                this.timer = null;
                this.progress = 0;

                this.$store.despatch('completeResearch', this.research);
            }
        },
    }
}
</script>
