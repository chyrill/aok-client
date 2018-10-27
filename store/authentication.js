/* eslint-disable */

export const state = () => ({
    isAuthenticated : false,
    token: null,
    id: null
})

export const mutations = {
    set(state, payload) {
        state.token = payload
        localStorage.setItem('token', payload)
        state.isAuthenticated = true
    },
    remove(state) {
        state.token = null
        localStorage.removeItem('token')
        state.isAuthenticated = false
    },
    setId(state, payload) {
        state.id = payload
    },
    unsetId(state) {
        state.id = null
    }
}