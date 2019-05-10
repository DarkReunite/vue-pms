/*
 * Created Date: 2019-04-23
 * Author: DarkReunion
 * @description 车库中所停的车辆信息
 * @use
 *
 * Copyright (c) 2019 19cm_without_head Team
 */

<template lang="pug">
    v-card
        v-card-title.headline 目前停车列表
            v-spacer
            v-text-field(
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            )
            v-dialog(v-model="dialog" persistent max-width="500px")
                template(v-slot:activator="{ on }")
                    v-btn(color="primary"  v-on="on") 车辆录入
                v-card
                    v-card-title
                        span.headline 入库车辆信息
                    v-card-text
                        v-container(grid-list-md)
                            v-layout(wrap)
                                v-flex(xs12 sm6)
                                    v-text-field(label="地区" v-model="area_code")
                                v-flex(xs12 sm6)
                                    v-text-field(label="车牌顺序号" v-model="car_code")
                    v-card-actions
                        v-spacer
                        v-btn(color="error" flat @click="closeDialog") 取消
                        v-btn(color="primary" flat @click="addCar") 保存
        v-data-table(
            :items="car_list"
            :search="search"
            :headers="headers"
            :disable-initial-sort="true"
        )
            template(v-slot:items="props")
                td {{ props.item.car_no }}
                td {{ props.item.card_no }}
                td {{ formatTime(props.item.entry_time) }}
                td {{ stayTime(props.item.entry_time) }}
                td(layout justify-center)
                    v-icon(small @click="openUpdateCarDialog(props.item)").mr-2 edit
                    v-icon(small @click="outCarButton(props.item)") delete
        v-dialog(v-model="carInfoDialog.show" max-width="500px")
            v-card
                v-card-title
                    span.headline 是否确认出库
                v-card-text
                    v-layout
                        v-flex.text-xs-right(xs5)
                            div 车牌号：
                        v-flex(xs7)
                            div {{ carInfoDialog.car_no }}
                    v-layout
                        v-flex.text-xs-right(xs5)
                            div 入库时间：
                        v-flex(xs7)
                            div {{ formatTime(carInfoDialog.entry_time) }}
                    v-layout
                        v-flex.text-xs-right(xs5)
                            div 出库时间：
                        v-flex(xs7)
                            div {{ formatTime(carInfoDialog.out_time) }}
                    v-layout
                        v-flex.text-xs-right(xs5)
                            div 停车时长：
                        v-flex(xs7)
                            div {{ stayTime(carInfoDialog.entry_time, carInfoDialog.out_time) }}
                    v-layout
                        v-flex.text-xs-right(xs5)
                            div 应缴费金额：
                        v-flex(xs7)
                            div {{ carInfoDialog.payment }} 元
                v-card-actions
                    v-spacer
                    v-btn(color="error" flat @click="carInfoDialog.show = false") 取消
                    v-btn(color="primary" flat @click="outCar") 确认
        v-dialog(v-model="updateCarDialog.show" max-width="500px")
            v-card
                v-card-title
                    div.headline 修改车牌号
                v-card-text
                    v-layout(align-center)
                        v-flex.flex-left
                            label 将要修改的车牌号为：
                        v-flex
                            v-text-field(v-model="updateCarDialog.car_no")
                v-card-actions
                    v-spacer
                    v-btn(color="error" flat @click="updateCarDialog.show = false") 取消
                    v-btn(color="primary" flat) 确认修改

</template>

<script>
	import moment from 'moment';
	export default {
		props: ['car_list'],
		data() {
			return {
				search: null,
                dialog: false,
                parkSetting: {
                    free_time: null,
                    charge_rate: null,
                    park_count: 0,
                },
				carInfoDialog: {
					cid: null,
					show: false,
					car_no: null,
					entry_time: null,
					stay_time: null,        // 返回停留时长（毫秒）
					out_time: null,
					payment: 0
                },
                updateCarDialog: {
                    cid: null,
                    show: false,
                    car_no: null
                },
				area_code: null,
				car_code: null,
				headers: [
					{
						text: '车牌号',
						align: 'left',
						sortable: false,
						value: 'car_no'
					},
					{
						text: '卡号',
						align: 'left',
						sortable: false,
						value: 'card_no'
					},
					{
						text: '入库时间',
						align: 'left',
						sortable: false,
						value: 'entry_time'
					},
					{
						text: '停留时长',
						align: 'left',
						sortable: true,
						value: 'stay_time'
					},
					{
						text: '操作',
						align: 'left',
						sortable: false,
						value: 'car_no'
					}
				]
			};
		},
		mounted() {
            this.getParkSetting();
        },
		methods: {
			closeDialog() {
				this.dialog = false;
			},
			async addCar() {
                // await this.getParkSetting();
                // let res = await this.$api.pms.getGarage()
                // let length = res.car_list.length
                // if (length >= this.parkSetting.park_count ) {
                //     this.$store.commit('closeLoading');
                //     this.$store.commit('openSnackbar', {
                //         color: 'error',
                //         text: '车位已停满！'
                //     })
                //     return;
                // }
                let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                let vaild = reg.test(this.car_no);
                if (!vaild) {
                    this.$store.commit('openSnackbar', {
                        text: '车牌号不合法',
                        color: 'error'
                    })
                    return;
                }
                this.$store.commit('openLoading');
				this.$api.pms
					.addCar({ car_no: this.car_no })
					.then(res => {
						this.$store.commit('closeLoading');
						this.$store.commit('openSnackbar', {
							text: '车牌号：' + this.car_no + ' 入库成功',
							color: 'success'
						});
						this.$emit('update:garage');
						this.area_code = this.car_code = null;
						this.dialog = false;
					})
					.catch(err => {});
			},
			outCar() {
				this.$store.commit('openLoading');
				this.$api.pms
					.outCar(this.carInfoDialog)
					.then(res => {
						let car_no = this.carInfoDialog.car_no;
						this.$store.commit('closeLoading');
						this.$store.commit('openSnackbar', {
							color: 'success',
							text: '车牌号：' + car_no + '出库成功'
						});
						this.$emit('update:garage');
                        this.$emit('update:history');
                        this.carInfoDialog.show = false;
					})
					.catch(err => {});
			},
			async outCarButton(params) {
                let vm = this;
                await this.getParkSetting();    // 获取停车场收费信息
				this.carInfoDialog = {
					cid: params._id,
					show: true,
					car_no: params.car_no,
					entry_time: params.entry_time,
					out_time: moment().toISOString(),
					get stay_time() {
                        let entryTime = moment(this.entry_time, moment.ISO_8601);
						let outTime = moment(this.out_time, moment.ISO_8601);
						let millisecond = outTime.diff(entryTime);
						return millisecond;
					},
					get payment () {
                        let durationHours = Math.ceil(moment.duration(this.stay_time).asHours());
                        let { free_time, charge_rate } = vm.parkSetting;
                        let overflow = durationHours - free_time;
                        if(overflow > 0) {
                            return overflow * charge_rate;
                        } else {
                            return 0;
                        }
                    }
				};
			},
			formatTime(time) {
				return moment(time, moment.ISO_8601).format('YYYY-MM-DD HH:mm');
			},
			stayTime(entry_time, out_time) {
                if(!out_time) out_time = moment().toISOString();
				let entryTime = moment(entry_time, moment.ISO_8601);
				let outTime = moment(out_time, moment.ISO_8601);
				let millisecond = outTime.diff(entryTime);
				let durationHours = moment.duration(millisecond).asHours();
				let hour = parseInt(durationHours);
				let minute = Math.ceil((durationHours % 1) * 60);
				return hour + '小时' + minute + '分钟';
			},
            getParkSetting() {
                this.$api.pms.getParkSetting().then(res => {
                    this.parkSetting = {
                        free_time: res.park_info.free_time,
                        charge_rate: res.park_info.charge_rate,
                        park_count: res.park_info.park_count
                    }
                })
            },
            openUpdateCarDialog(car) {
                this.updateCarDialog = {
                    show: true,
                    car_no: car.car_no,
                    cid: car._id
                }
            }

		},
		computed: {
			car_no() {
				return this.area_code + this.car_code;
			}
		}
	};
</script>


<style lang="scss" scoped>
.flex-right, .flex-left {
	flex: none;
}
</style>

