<template lang="pug">
    v-card
        v-card-title
            span.headline 模拟停车入库
        v-card-text
            span 请上传带有车牌的车辆图片
            v-layout(justify-center)
                v-dialog(v-model="dialog"  max-width="500px")
                    template(v-slot:activator="{ on }")
                        v-btn(color="primary"  v-on="on") 选择文件
                    v-card
                        v-card-title
                            div.headline 请选择车辆图片
                        v-card-text
                            v-layout
                                v-flex
                                    v-text-field(label="文件名" prepend-icon="attach_file" disabled v-model="fileName")
                                v-flex.flex-right
                                    input.d-none#upload-file-input(type="file" accept="image/png, image/jpg, image/jpeg" @change="showFileName")
                                    label(for="upload-file-input").v-btn 选择文件
                        v-card-actions
                            v-spacer
                            v-btn(color="error" @click="closeDialog") 取消
                            v-btn(color="primary" @click="uploadImage") 上传
        v-dialog(v-model="confirmDialog" max-width="500px")
            v-card
                v-card-title
                    div.headline 确认信息
                v-card-text
                    v-layout(align-center)
                        v-flex.flex-left
                            label 识别到该车的车牌号为：
                        v-flex
                            v-text-field(v-model="car_no")
                v-card-actions
                    v-spacer
                    v-btn(color="error" @click="closeConfirmDialog")  取消
                    v-btn(color="primary" @click="addCar") 确认

</template>


<script>
	export default {
		data() {
			return {
				fileName: '',
				image: null,
				dialog: false,
				confirmDialog: false,
				car_no: null
			};
		},
		methods: {
			showFileName(e) {
				this.image = e.target.files[0];
				this.fileName = e.target.files[0].name;
			},
			uploadImage() {
				if (!this.image) {
					alert('请选择文件！');
					return;
				}
				this.$store.commit('openLoading');
				this.$api.pms
					.uploadImage(this.image)
					.then(res => {
						this.$store.commit('closeLoading');
						this.dialog = false;
						this.confirmDialog = true;
						this.car_no = res.car_no;
					})
					.catch(err => {});
			},
			async addCar() {
				this.$store.commit('openLoading');
				this.$api.pms
					.addCar({ car_no: this.car_no })
					.then(res => {
						this.$store.commit('closeLoading');
						this.$store.commit('openSnackbar', {
							text: '入库成功',
							color: 'success'
						});
						this.confirmDialog = false;
					})
					.catch(err => {});
			},
			closeConfirmDialog() {
				this.confirmDialog = false;
				this.image = false;
				this.fileName = null;
            },
            closeDialog() {
                this.dialog = false;
                this.fileName = null;
                this.image = false;
            }
		}
	};
</script>


<style lang="scss" scoped>
.flex-right,
.flex-left {
	flex: none;
}
</style>
