import Vue from 'vue'
import Vuex from 'vuex'
import conversation from './modules/conversation.js'
import group from './modules/group'
import user from './modules/user'
import global from './modules/global'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    conversation,
    group,
    user,
    global
  },
  state: {
    curCity: '北京',
    isLogin: false,
    userInfo: {
      avatarUrl: '',
      city: '',
      gender: '',
      nickName: '',
      province: ''
    }
  },
  mutations: {
    updateCity: (state, change) => {
      state.curCity = change
    },
    updateIsLogin: (state, change) => {
      state.isLogin = change
    },
    cleanUserInfo: (state) => {
      state.userInfo = {
        avatarUrl: '',
        city: '',
        gender: '',
        nickName: '',
        province: ''
      }
    },
    updateUser: (state, change) => {
      change.gender = change.gender === 1 ? '男' : '女'
      state.userInfo = change
    }
  }
})
export default store
