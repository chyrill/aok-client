<template>
    <div>
        <div class="pb-5">
            <divider :title="title" />
        </div>
        <div class="wrapper">
            <div v-for="(item, index) in artists" :key="index">
                <artist-comp :artist="item" heightCard="360"/>
            </div>
        </div>
        <div style="text-align: center" class="pt-5 pb-3">
            <a :href="link"><span style="text-transform: uppercase;">view all artists</span></a>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import divider from '@/components/reusables/dividers'
import artistComp from '../artist_card_follow'

export default {
    components: {
        divider,
        'artist-comp': artistComp
    },
    props: {
        title: {
            type: String
        },
        artists: {
            type: Array
        }
    },
    data () {
        return {
            link: '/artists/' +this.title.replace(/\s/g,'') + '/category'
        }
    }
}
</script>

<style scoped>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    @media screen and (max-width: 768px) {
        .wrapper {
            grid-template-columns: repeat(4, 94vw);
            overflow-x: auto; 
        }
    }
    a {
        text-decoration: none;
        color: grey;
    }
</style>