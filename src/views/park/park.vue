<template lang="pug">
    div.park
        a-garage.mb-5(
            :car_list="car_list"
            @update:garage="getGarage"
            @update:history="getHistory"
        )
        a-history(:history="history")
</template>

<script>
	import AGarage from './components/garage.vue';
	import AHistory from './components/history.vue';
	export default {
		components: {
			AGarage,
			AHistory
		},
		data() {
			return {
				car_list: [],
				history: []
			};
		},
		mounted() {
			this.getGarage();
			this.getHistory();
		},
		methods: {
			getGarage() {
				this.$store.commit('openLoading');
				this.$api.pms
					.getGarage()
					.then(res => {
						this.car_list = res.car_list;
						this.$store.commit('closeLoading');
					})
					.catch(err => {});
			},
			getHistory() {
				this.$store.commit('openLoading');

				this.$api.pms.getHistory().then(res => {
					this.history = res.history;
					this.$store.commit('closeLoading');
				});
			},
			addCar(car_no) {
				this.$store.commit('openLoading');
				this.$api.pms
					.addCar({ car_no })
					.then(res => {
						this.$store.commit('closeLoading');
						this.$store.commit('openSnackbar', {
							text: '入库成功',
							color: 'success'
                        });
                        this.getGarage();
						this.area_code = this.car_code = null;
						this.dialog = false;
					})
					.catch(err => {});
			}
		}
	};
</script>
