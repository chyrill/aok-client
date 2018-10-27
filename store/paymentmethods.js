/* eslint-disable */
export const state = () => ({
    list: []
})

export const mutations = {
    set (state, data) {
        state.list = data
    },
    add (state, data) {
        let resData = TRANSFORM_LIST_TO_EXTENSIBLE(state.list)
        resData.push(data)
        state.list = []
        state.list = resData
    },
    remove (state, data) {
        let resData = TRANSFORM_LIST_TO_EXTENSIBLE(state.list)
        resData.splice(resData.findIndex(x => x._id === data), 1)
        state.list = []
        state.list = resData
    },
    unset (state) {
        state.list = []
    }
}

const TRANSFORM_LIST_TO_EXTENSIBLE = (arrData) => {
    let res = []
    for (let x of arrData) {
        res.push(x)
    }
    return res
}