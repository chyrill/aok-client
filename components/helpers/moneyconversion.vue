<template>
    <span>
        {{currency}} {{amount}}
    </span>
</template>

<script>
/* eslint-disable */
const convertNumberToString = (data) => {
    var str = String(data)
    var len = str.split('.')[0].length
    var retData = []
    for(len; len>0;) {
        var start = len - 3
        retData.push(str.split('.')[0].substring(start, len))
        len = len -3
    }
    var retDatalen = retData.length
    var final = []
    retData.forEach(function(val){
        retDatalen = retDatalen -1
        final.push(retData[retDatalen])
    })
    return str.split('.')[1] === undefined || str.split('.')[1] === null ?  final.join() : (final.join() + '.' + str.split('.')[1]) 
}

export default {
    props: {
        value: {
            type: Number
        },
        currency: {
            type: String
        }
    },
    computed: {
        amount () {
            return convertNumberToString(this.value)
        }
    }
}
</script>
