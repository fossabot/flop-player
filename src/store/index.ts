import { CommitOptions, createStore, DispatchOptions, Store } from 'vuex'
import { State, state } from '@/store/state'
import { Getters, getters } from '@/store/getters'
import { Mutations, mutations } from '@/store/mutations'
import { Actions, actions } from '@/store/actions'

export type VuexStore = Omit<Store<State>, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]> (
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions> (
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: VuexStore = createStore({
  state,
  getters,
  mutations,
  actions,
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  strict: process.env.NODE_ENV !== 'production'
})
