<template>
    <div>
        <div class="pt-3 pb-5">
            <divider title="browse artworks by price" />
        </div>
        <div id="wrapper">
            <div v-for="item in priceList" :key="item.title" id="grid-item">
                <category-price :title="item.title" :image="item.image" :count="item.count" />
            </div>
        </div>
    </div>
</template>


<style>
 * {
     font-family: 'Nunito Sans', 'sans-serif'
 }
 #wrapper {
     display: grid;
     grid-template-columns: 1fr  1fr 1fr;
     grid-template-rows: 150px;
     grid-gap: 20px;
 }
 #grid-item {
     grid-column: auto;
 }
  @media only screen and (max-width: 600px)  {
        #wrapper {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 150px;
            grid-gap: 10px;
        }
    }
</style>


<script>
/* eslint-disable */
import divider from '../reusables/dividers'
import response from '@/src/data/price_cat_data'
import categoryPrice from '../reusables/categorypricecard'

export default {
    components: {
        divider,
        'category-price': categoryPrice
    },
    data () {
        return {
            priceList: []
        }
    },
    methods: {
        getPriceList () {
            this.priceList = response.priceDataList
        }
    },
    mounted () {
        this.getPriceList()
    }
}
</script>
