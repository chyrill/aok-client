/* eslint-disable */
import jwt from 'jsonwebtoken'

export const state = () => ({
  sidebar: false,
  profile: {},
  isAuthenticated: false,
  token: null,
  endingArtworks: [],
  notifications: [],
  paymentMethods: [],
  orderReview: null,
  pendingOrders: []
})

//#region mutations
export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  getToken () {
    var data = {
      roleId: 5
    }
    this.$apolloHelpers.onLogin(jwt.sign(data,'secretkey123', {expiresIn: 84600}))
  },
  setStateProfile(state, payload) {
    state.profile = payload
  },
  setStateToken(state, payload) {
    state.token = payload
  },
  setStateAuthenticated(state) {
    state.isAuthenticated = true
  },
  setStateClear(state) {
    state.token = null
    state.profile = null
    state.isAuthenticated = false
  },
  setEndingArtwork(state, data) {
    state.endingArtworks = data
  },
  setBidToArtwork(state,data) {
    console.log('shit')
    state.endingArtworks.find( x => {return x._id === data.artworkId}).bids.items.push(data)
  },
  addNotify(state, data) {
    var values = []
    values.push(CreateNewNotification(data))
    state.notifications.forEach(x => {
      var y = CreateNewNotification(x)
      var d = values.find(el => { return el.message === y.message})
      if (!d) {
        values.push(y)
      }
    })
    state.notifications = []
    state.notifications = values
  },
  setNotification(state, data) {
    var values = []
    data.forEach(x => {
      var y = CreateNewNotification(x)
      var d = values.find(el => { return el.message === y.message})
      if (!d) {
        values.push(y)
      }
    })
    state.notifications = []
    state.notifications = values
  },
  addPaymentMethodToState(state, data) {
    var val = []
    val = LoadArray(state.paymentMethods, val)
    val.push(data)
    state.paymentMethods = []
    state.paymentMethods = val
  },
  setPaymentMethodToState(state, data) {
    var val = []
    val  = LoadArray(data, val)
    state.paymentMethods = []
    state.paymentMethods = val
  },
  updatePaymentMethodState(state,data) {
    var val = []
    val = LoadArray(state,val)
    val.slice(val.findIndex(x => x.paymentId == data.paymentId)) 
    val.push(data)
    console.log(val)
    state.paymentMethods = []
    state.paymentMethods = val
  },
  setOrderReviewState(state, data) {
    state.orderReview = CONVERT_TO_EXTENSIBLE_DATA(data)
  },
  removePaymentMethodState(state, data){
    state.paymentMethods = DELETE_ITEM_ARRAY_BY_ID(state.paymentMethods,data)
  },
  setPendingOrderState(state,data) {
    state.pendingOrders = data
  },
  removePendingOrderByIdState(state,data) {
    state.pendingOrders = DELETE_ITEM_ARRAY_BY_ID(state.pendingOrders,data)
  }
}
//#endregion

//#region actions
export const actions = {
  setProfile({ commit }, payload) {
    commit('setStateProfile', payload)
    commit('setNotification', payload.notifications)
    commit('setPaymentMethodToState', payload.paymentMethods)
    commit('setPendingOrderState', payload.orders)
  },
  setToken({ commit }, payload) {
    commit('setStateToken', payload)
  },
  setAuthenticated({ commit }) {
    commit('setStateAuthenticated')
  },
  clearState({commit}) {
    commit('setStateClear')
  },
  addEndingArtwork({commit}, data) {
    commit('setEndingArtwork', data)
  },
  addBidToArtwork({commit}, data) {
    commit('setBidToArtwork', data)
  },
  addNotification({ commit }, data) {
    commit('addNotify', data)
  },
  addPaymentMethod({commit}, data) {
    commit('addPaymentMethodToState', data)
  },
  updatePaymentMethod({ commit} , data) {
    commit('updatePaymentMethodState',data)
  },
  setOrderReview({ commit }, data) {
    commit('setOrderReviewState', data)
  },
  removePaymentMethod({ commit }, data) {
    commit('removePaymentMethodState',data)
  },
  removePendingOrderById({ commit }, data) {
    commit('removePendingOrderByIdState', data)
  }
}
//#endregion

//#region functions
function LoadArray(dataState, arrData) {
  dataState.forEach(x => {
    arrData.push(x)
  })
  return arrData
}

function CreateNewNotification(data) {
  var res = {}
  var link = data.links.find( x => { return x.app === 'client' })
  var uData = link.url
  for (var i in data) {
    res[i] = data[i]
  }

  res['link'] = uData

  return res
}
//#endregion


const DELETE_ITEM_ARRAY_BY_ID = (arrData, _id) => {
  var res =  []
  res = CONVERT_ARRAY_TO_EXTENSIBLE_ARRAY(arrData)
  res.splice(res.findIndex(x => x._id === _id),1)
  return res
}

const CONVERT_ARRAY_TO_EXTENSIBLE_ARRAY = (arrData) => {
  var res = []
  arrData.forEach(x => {
      res.push(x)
  })
  return res
}

const CONVERT_TO_EXTENSIBLE_DATA = (data) => {
  var res = {}
  for (let x in data) {
    res[x] = data[x]
  }
  return res
}