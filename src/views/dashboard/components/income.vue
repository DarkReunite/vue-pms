<template lang="pug">
    v-card.mx-3.mb-3
        v-card-text.pb-0
            div.card-body.mb-2
                v-layout(row wrap align-center)
                    v-flex(md4)
                        v-icon(:x-large="true" color="success") monetization_on
                    v-flex(md8)
                        div.numbers
                            div.card-category.subheading.grey--text.text--darken-2.text-xs-right 今日收入
                            div.card-title.display-1.text-xs-right {{ income }}
            v-divider
        div.card-footer
            v-btn(fab small flat)
                    v-icon(color="grey") refresh
            span.card-footer-title 刷新
</template>

<script>
export default {
    props: ['income'],
    data() {
        return {

        }
    }
}
</script>
