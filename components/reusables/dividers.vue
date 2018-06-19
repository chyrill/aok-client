<template>
    <div id="divider_line">
        <span id="divider_title">
         {{title}} 
        </span>
    </div>
</template>


<style scoped>
    #divider_line {
        width:100%;
        border-bottom: 1px solid rgba(147, 147, 147, 0.6);
        height: 12px;
        text-align: center;
    }
    #divider_title{
        background-color: #fafafa;
        padding: 0 10px 0 10px;
        color:black;
        text-transform: uppercase;
        font-weight:bolder;
        font-size: 18px;
    }
</style>


<script>
/* eslint-disable */

export default {
    props: ['title']
}
</script>