<template lang="pug">
    v-card
        v-card-text
            div.headline 停车场设置
            v-divider.mt-3.mb-4
            div.subheading.font-weight-medium 常规
            v-layout(align-center).my-3
                v-flex(xs5).text-xs-right.pr-3
                    span 停车收费：
                v-flex(xs4)
                    v-switch.ma-0.pa-0(v-model="info.charge" hide-details :disabled="!edit" :label="`${info.charge ? '开' : '关'}`")
            v-layout(align-center)
                v-flex(xs5).text-xs-right.pr-3
                    span 免费停留时长（h）：
                v-flex(xs4)
                    v-text-field(suffix="h" :disabled="!info.charge || !edit" v-model="info.free_time")
            v-layout(align-center)
                v-flex(xs5).text-xs-right.pr-3
                    span 收费标准（元/h）：
                v-flex(xs4)
                    v-text-field(suffix="元/h" :disabled="!info.charge || !edit" v-model="info.charge_rate")
            v-divider.my-3
            div.subheading.font-weight-medium 基础
            v-layout(align-center)
                v-flex(xs5).text-xs-right.pr-3
                    span 停车位总数：
                v-flex(xs4)
                    v-text-field(suffix="个" :disabled="!edit" v-model="info.park_count")
            v-layout
                v-spacer
                v-btn(v-if="!edit" color="primary" @click="editInfo") 修改
                div(v-else)
                    v-btn(color="error" @click="cancel") 取消
                    v-btn(color="primary" @click="save") 保存


</template>

<script>
	export default {
		data() {
			return {
				edit: false,
				info: {},
				oldInfo: {}
			};
		},
		mounted() {
			this.getParkSetting();
		},
		methods: {
			editInfo() {
				// 深拷贝
				this.oldInfo = JSON.parse(JSON.stringify(this.info));
				this.edit = true;
			},
			cancel() {
				this.info = JSON.parse(JSON.stringify(this.oldInfo));
				this.edit = false;
			},
			getParkSetting() {
				this.$store.commit('openLoading');
				this.$api.pms
					.getParkSetting()
					.then(res => {
						this.$store.commit('closeLoading');
						this.info = res.park_info;
					})
					.catch(err => {});
			},
			save() {
				this.$store.commit('openLoading');
				this.$api.pms
					.updateParkSetting(this.info)
					.then(res => {
						this.$store.commit('closeLoading');
						this.$store.commit('openSnackbar', {
							color: 'success',
							text: '修改信息成功'
                        });
                        this.info = res.park_info;
                        this.oldInfo = this.info;
                        this.edit = false;
					})
					.catch(err => {});
			}
		},
        computed: {},
        watch: {
            'info.charge' (newValue) {
                if(newValue === false) {
                    this.info.free_time = this.info.charge_rate = 0;
                }
            }
        }
	};
</script>

