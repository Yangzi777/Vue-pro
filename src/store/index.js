import { createStore } from 'vuex'
// 创建一个新的 store 实例
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  plugins: [
    createPersistedState({
      // 设置持久化的数据
      reducer: (state) => {
        return {
          userInfo: state.userInfo,
          currentPath: state.currentPath
        }
      }
    })
  ],
  state () {
    return {
      userInfo: null,
      currentPath: ''
    }
  },
  mutations: {
    updateCurrentPath (state, payload) {
      state.currentPath = payload
    },
    updateUserInfo (state, payload) {
      state.userInfo = payload
    }
  }
})

export default store
