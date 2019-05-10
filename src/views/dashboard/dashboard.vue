<template lang="pug">
    div.dashboard
        v-layout(row wrap)
            v-flex(lg3 sm6 md6)
                a-remain(:remain="dashboard.remain" @update:remain="getRemain")
            v-flex(lg3 sm6 md6)
                a-income(:income="dashboard.income")
            v-flex(lg3 sm6 md6)
                a-capacity(:capacity="dashboard.capacity" @update:capacity="getCapacity")
            v-flex(lg3 sm6 md6)
                a-issue(:issue="dashboard.issue")
</template>

<script>
import ARemain from './components/remain.vue';
import AIncome from './components/income.vue';
import AIssue from './components/issue.vue';
import ACapacity from './components/capacity.vue';

export default {
    components: {
        ARemain,
        AIncome,
        AIssue,
        ACapacity
    },
    data() {
        return {
            dashboard: {
                income: 750,
                remain: 0,
                capacity: 500,
                issue: 20,
            }
        }
    },
    mounted() {
        this.getCapacity();
        this.getRemain();
    },
    methods: {
        getCapacity() {
            this.$store.commit('openLoading');
            this.$api.pms.getParkSetting().then( res => {
                this.dashboard.capacity = res.park_info.park_count;
                this.$store.commit('closeLoading');
            })
        },
        getRemain() {
            this.$store.commit('openLoading');
            this.$api.pms.getParkSetting().then( async res => {
                this.dashboard.capacity = res.park_info.park_count;
                let length = (await this.$api.pms.getGarage()).car_list.length;
                this.dashboard.remain = this.dashboard.capacity - length;
                this.$store.commit('closeLoading');
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.numbers {
    .card-category {
        text-align: right;
    }
    .card-title {
        text-align: right;
    }
}

.card-footer {
    display: flex;
    align-items: center;
}
</style>
