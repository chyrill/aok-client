/* eslint-disable */ 

export const state = () => ({
  signup: null
})

export const mutations = {
  set(state, data) {
    state.signup = data
  },
  remove(state) {
    state.signup = null
  }
}
