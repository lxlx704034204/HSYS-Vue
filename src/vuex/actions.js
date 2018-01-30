//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}
export const login = ({commit}, username) => {
    commit('login', username);
}

export const logout = ({commit}) => {
    commit('login', false);
}