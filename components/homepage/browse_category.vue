<template>
    <div>
        <div class="pb-5">
            <divider title="browse artworks by category" />
        </div>
        <div class="wrapper">
            <div id="abstract_item">
                <categoryCard title="abstract" count="12" image="/images/abstract_cat.jpg" link="/artwork/abstract"/>
            </div>
            <div id="modern_item">
                <categoryCard title="modern" count="1" image="/images/modern_cat.jpg" link="/artwork/modern"/>
            </div>
            <div id="contemp_item">
                <categoryCard title="contemporary" count="21" image="/images/contemporary_cat.jpeg" link="/artwork/contemporary"/>
            </div>
            <div id="digital_item">
                <categoryCard title="digital" count="3" image="/images/digital_cat.png" link="/artwork/digital"/>
            </div>
            <div id="photo_item">
                <categoryCard title="photography" count="78" image="/images/photo_cat.jpg" link="/artwork/photography"/>
            </div>
            <div id="paper_item">
                <categoryCard title="papercut" count="2" image="/images/paper_cat.jpg" link="/artwork/papercut"/>
            </div>
            <div id="stree_item">
                <categoryCard title="street art" count="7" image="/images/street_cat.jpg" link="/artwork/streetart"/>
            </div>
            <div id="photo_item1">
                <categoryCard title="photography" count="78" image="/images/photo_cat.jpg" link="/artwork/photography" />
            </div>
        </div>
    </div>
</template>


<script>
/* eslint-disable */
import divider from '../reusables/dividers'
import categoryCard from '../reusables/categorycard'

export default {
    components: {
        divider,
        categoryCard
    }
}
</script>


<style scoped>
    #abstract_item {
        grid-area: a;
    }
    #modern_item {
        grid-area: m;
    }
    #contemp_item {
        grid-area: c;
    }
    #digital_item {
        grid-area: d;
    }
    #photo_item {
        grid-area: p;
    }
    #paper_item {
        grid-area: pa;
    }
    #street_item {
        grid-area: s;
    }
    #photo_item1 {
        grid-area: p1;
    }
    .wrapper {
        display: grid;
        grid-template-columns: repeat(5,1fr);
        grid-gap: 10px;
        grid-template-rows: auto;
        grid-template-areas: 
            "a a a m c"
            "d p pa s p1"
    }
    
    * {
        font-family: 'Nunito Sans', sans-serif;
    }

     @media only screen and (max-width: 768px)  {
        .wrapper {
            display: grid;
            grid-template-columns: repeat(8, 70vw);
            grid-template-rows: auto;
            grid-gap: 10px;
            overflow-x:auto;
            grid-template-areas: 
                "d p pa a m c s p1"
        }
    }
    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
       .wrapper {
            display: grid;
            grid-template-columns: repeat(5,80fr);
            grid-gap: 5px;
            grid-template-rows: auto;
            grid-template-areas: 
                "a a a m c"
                "d p pa s p1";
            overflow-x:auto;
        }
    }
</style>