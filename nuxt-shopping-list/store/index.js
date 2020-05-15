import Vue from 'vue'
import { slugify } from "../components/helpers.js";
export const strict = false

export const state = () => ({
    list: [],
    maxQuantity: 20
})

export const getters = {
    currentList: state => {
        let filteredList = {}
        for (const category in state.list) {
            if (state.list.hasOwnProperty(category)) {
                let fullCategory = state.list[category]
                filteredList[category] = {
                    ...fullCategory,
                    items: fullCategory.items.filter(item => item.quantity > 0)
                }
            }
        }

        return filteredList
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
    ITEM_ACTIVE(state, payload) {
        state.list[payload.categoryIndex].items[payload.itemIndex].active = true
    },
    ITEM_ADD_NEW(state, payload) {
        state.list[payload.categoryIndex].items.push(payload.result)
    },
    ITEM_ADD_QUANTITY(state, payload) {
        state.list[payload.categoryIndex].items[payload.itemIndex].quantity++
    },
    ITEM_INACTIVE(state, payload) {
        state.list[payload.categoryIndex].items[payload.itemIndex].active = false
    },
    ITEM_NO_QUANTITY(state, payload) {
        state.list[payload.categoryIndex].items[payload.itemIndex].quantity = 0
    },
    ITEM_REMOVE_QUANTITY(state, payload) {
        state.list[payload.categoryIndex].items[payload.itemIndex].quantity--
    },
    ITEM_TOGGLE(state, payload) {
        state.list[payload.categoryIndex].items[payload.itemIndex].active = !state.list[payload.categoryIndex].items[payload.itemIndex].active
    },
    SET_ITEMS(state, payload) {
        Vue.set(state, 'list', payload)
    }
}

export const actions = {
    addNewItem({ commit, state }, item) {
        item.slug = slugify(item.name)

        this.$axios.$post('/api/auth/items', item)
            .then((result) => {
                console.log(result.category_id, result.id);
                const categoryIndex = state.list.findIndex(listItem => listItem.id === result.category_id)

                commit('ITEM_ADD_NEW', {
                    categoryIndex,
                    result
                })
            })
    },
    async addQuantityToItem({ commit, state }, item) {
        const categoryIndex = state.list.findIndex(listItem => listItem.id === item.category_id)
        const itemIndex = state.list[categoryIndex].items.findIndex(listItem => listItem.id === item.id)

        await commit('ITEM_ACTIVE', {
            categoryIndex,
            itemIndex
        })
        await commit('ITEM_ADD_QUANTITY', {
            categoryIndex,
            itemIndex
        })

        this.$axios.$put(`/api/auth/items/${state.list[categoryIndex].items[itemIndex].id}`, {
            'quantity': state.list[categoryIndex].items[itemIndex].quantity
        })
    },
    async getItems({ commit }) {
        const allItems = await this.$axios.$get('/api/items/active')
        commit('SET_ITEMS', allItems['data'])
    },
    async removeItem({ commit, state }, item) {
        const categoryIndex = state.list.findIndex(listItem => listItem.id === item.category_id)
        const itemIndex = state.list[categoryIndex].items.findIndex(listItem => listItem.id === item.id)

        await commit('ITEM_NO_QUANTITY', {
            categoryIndex,
            itemIndex
        })

        this.$axios.$put(`/api/auth/items/${state.list[categoryIndex].items[itemIndex].id}`, {
            'quantity': 0
        }).then(() => {
            this.$axios.$delete(`/api/auth/items/${state.list[categoryIndex].items[itemIndex].id}`)
        })
    },
    async removeQuantityToItem({ commit, state }, item) {
        const categoryIndex = state.list.findIndex(listItem => listItem.id === item.category_id)
        const itemIndex = state.list[categoryIndex].items.findIndex(listItem => listItem.id === item.id)

        await commit('ITEM_REMOVE_QUANTITY', {
            categoryIndex,
            itemIndex
        })

        this.$axios.$put(`/api/auth/items/${state.list[categoryIndex].items[itemIndex].id}`, {
            'quantity': state.list[categoryIndex].items[itemIndex].quantity
        })
    },
    async toggleActive({ commit, state }, item) {
        const categoryIndex = state.list.findIndex(listItem => listItem.id === item.category_id)
        const itemIndex = state.list[categoryIndex].items.findIndex(listItem => listItem.id === item.id)

        await commit('ITEM_TOGGLE', {
            categoryIndex,
            itemIndex
        })

        this.$axios.$put(`/api/auth/items/${state.list[categoryIndex].items[itemIndex].id}`, {
            'active': state.list[categoryIndex].items[itemIndex].active
        })
    }
}
