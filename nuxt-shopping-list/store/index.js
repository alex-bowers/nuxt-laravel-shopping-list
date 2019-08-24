import Vue from 'vue'
import { slugify } from "../components/helpers.js";
export const strict = false

export const state = () => ({
    list: [],
    maxQuantity: 20
})

export const getters = {
    currentList: state => {
        return state.list.filter(item => item.quantity > 0)
    },
    loggedIn: state => {
        return state.auth.loggedIn
    },
    maxQuantity: state => {
        return state.maxQuantity
    },
    numberOfItemsInList: state => {
        return Object.keys(state.list).length
    },
    user: state => {
        return state.auth.user
    }
}

export const mutations = {
    ITEM_ACTIVE(state, item) {
        state.list[item].active = true
    },
    ITEM_ADD_NEW(state, item) {
        Vue.set(state.list, item.id - 1, {...item})
    },
    ITEM_ADD_QUANTITY(state, item) {
        state.list[item].quantity++
    },
    ITEM_INACTIVE(state, item) {
        state.list[item].active = false
    },
    ITEM_NO_QUANTITY(state, item) {
        state.list[item].quantity = 0
    },
    ITEM_REMOVE_QUANTITY(state, item) {
        state.list[item].quantity--
    },
    ITEM_TOGGLE(state, item) {
        state.list[item].active = !state.list[item].active
    },
    SET_ITEMS(state, items) {
        Vue.set(state, 'list', items)
    }
}

export const actions = {
    addNewItem({ commit }, item) {
        item.slug = slugify(item.name)

        this.$axios.$post('/api/auth/items', item).then((result) => {
            commit('ITEM_ADD_NEW', result)
        })
    },
    async addQuantityToItem({ commit, state }, item) {
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        await commit('ITEM_ACTIVE', itemIndex)
        await commit('ITEM_ADD_QUANTITY', itemIndex)

        this.$axios.$put(`/api/auth/items/${state.list[itemIndex].id}`, {
            'quantity': state.list[itemIndex].quantity
        })
    },
    async getItems({ commit }) {
        const allItems = await this.$axios.$get('/api/items/active')
        commit('SET_ITEMS', allItems)
    },
    async removeItem({ commit, state }, item) {
        console.log(item);
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        await commit('ITEM_NO_QUANTITY', itemIndex)

        console.log(state.list[itemIndex].id);

        this.$axios.$put(`/api/auth/items/${state.list[itemIndex].id}`, {
            'quantity': 0
        }).then(() => {
            this.$axios.$delete(`/api/auth/items/${state.list[itemIndex].id}`)
        })
    },
    async removeQuantityToItem({ commit, state }, item) {
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        await commit('ITEM_REMOVE_QUANTITY', itemIndex)

        this.$axios.$put(`/api/auth/items/${state.list[itemIndex].id}`, {
            'quantity': state.list[itemIndex].quantity
        })
    },
    async toggleActive({ commit, state }, item) {
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        await commit('ITEM_TOGGLE', itemIndex)

        this.$axios.$put(`/api/auth/items/${state.list[itemIndex].id}`, {
            'active': state.list[itemIndex].active
        })
    }
}
