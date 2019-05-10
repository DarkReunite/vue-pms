<template lang="pug">
    v-card
        v-card-title.headline 历史记录
            v-spacer
            v-text-field(
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            )
        v-data-table(
            :items="history"
            :search="search"
            :headers="headers"
            :disable-initial-sort="true"
        )
            template(v-slot:items="props")
                td {{ props.item.car_no }}
                td {{ props.item.card_no }}
                td {{ formatTime(props.item.entry_time) }}
                td {{ formatTime(props.item.out_time) }}
                td {{ stayTime(props.item.entry_time, props.item.out_time) }}
                td {{ props.item.payment}}
</template>

<script>
	import moment, { ISO_8601 } from 'moment';
	export default {
		props: ['history'],
		data() {
			return {
				search: null,
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
						text: '出库时间',
						align: 'left',
						sortable: true,
						value: 'out_time'
					},
					{
						text: '停留时间',
						align: 'left',
						sortable: false,
						value: 'stay_time'
					},
					{
						text: '缴费金额(元)',
						align: 'left',
						sortable: false,
						value: 'payment'
					},
				],
				car_list: []
			};
		},
		mounted() {},
		methods: {
			formatTime(time) {
				return moment(time, moment.ISO_8601).format('YYYY-MM-DD HH:mm');
			},
			stayTime(entry_time, out_time) {
                let entryTime = moment(entry_time, moment.ISO_8601);
                let outTime = moment(out_time, moment.ISO_8601);
                let millisecond = outTime.diff(entryTime);
                let hours = moment.duration(millisecond).asHours();
                let hour = parseInt(hours)
                let minute = Math.ceil(hours%1 * 60);
                return hour + '小时' + minute + '分钟';
            }
		}
	};
</script>
