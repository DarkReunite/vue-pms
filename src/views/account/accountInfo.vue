<template lang="pug">
    v-card.elevation-3
        v-card-text
            span.headline 用户信息
        v-layout
            v-subheader info
            v-spacer
            v-dialog(v-model="dialog")
                template(v-slot:activator="{ on }")
                    v-btn(color="primary" v-on="on") 修改信息
        v-list.py-0
            v-divider
            v-list-tile.py-1
                v-layout(align-center)
                    v-flex(xs6)
                        div.body-2.grey--text.text--darken-2 #
                    v-flex(xs6)
                        div.body-2.grey--text.text--darken-2 值
            div(v-for="(item, index) in headers" :key="index")
                v-divider
                v-list-tile(@click="")
                    v-layout(align-center)
                        v-flex(xs6)
                            div.body-2 {{item.text}}
                        v-flex(xs6)
                            div.body-2 {{userInfo[item.value]}}


</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            dialog: false,
            headers: [
                {
                    text: '账号',
                    value: 'username'
                },
                {
                    text: '昵称',
                    value: 'nickname'
                },
                {
                    text: '手机',
                    value: 'phone_num'
                },
                {
                    text: '邮箱地址',
                    value: 'email'
                }
            ]
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>


<style lang="scss" scoped>

</style>
