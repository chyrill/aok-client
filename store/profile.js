/* eslint-disable */

export const state = () => ({
    data: null
})

export const mutations = {
    set(state, payload) {
        state.data = payload
    },
    remove(state) {
        state.data = null
    },
    update(state, payload) {
        state.data = null
        state.data = payload
    }
}