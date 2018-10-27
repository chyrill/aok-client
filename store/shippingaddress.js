/* eslint-disable */
export const state = () => ({
    list: []
})

export const mutations = {
    set (state, data) {
        state.list = data
    },
    add (state, data) {
        let res = TRANSFORM_TO_EXTENSIBLE(state.list)
        res.push(data)
        state.list = []
        state.list = res
    },
    remove (state, data) {
        let res = TRANSFORM_TO_EXTENSIBLE(state.list)
        res.splice(res.findIndex(x => x._id === data),1)
        state.list = []
        state.list = res
    },
    unset (state) {
        state.list = []
    }
}

const TRANSFORM_TO_EXTENSIBLE = (arrData) => {
    let res = []
    for (let x of arrData) {
        res.push(x)
    }
    return res
}