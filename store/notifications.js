/* eslint-disable */

export const state = () => ({
    list: []
})

export const mutations = {
    set(state, payload) {
        state.list = payload
    },
    unset(state) {
        state.list = []
    },
    add(state, payload) {
        state.list.unshift(payload)
    }
}