import Vue from 'vue'
import { slugify } from "../components/helpers.js";
export const strict = false

export const state = () => ({
    list: [
        {
            id: 1,
            active: true,
            name: "Bread",
            quantity: 1,
            slug: "bread"
        },
        {
            id: 2,
            active: false,
            name: "milk",
            quantity: 5,
            slug: "milk"
        },
        {
            id: 3,
            active: true,
            name: "Flour",
            quantity: 3,
            slug: "flour"
        }
    ],
    maxQuantity: 20
})

export const getters = {
    currentList: state => {
        return state.list.filter(item => item.quantity > 0)
    },
    maxId: state => {
        const allIds = state.list.map(item => item.id)

        return Math.max(...allIds)
    },
    maxQuantity: state => {
        return state.maxQuantity
    },
    numberOfItemsInList: state => {
        return Object.keys(state.list).length
    },
}

export const mutations = {
    ITEM_ACTIVE(state, item) {
        state.list[item].active = true
    },
    ITEM_ADD_NEW(state, item) {
        Vue.set(state.list, item.key, {...item})
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
    }
}

export const actions = {
    addNewItem({ commit, getters }, item) {
        item.id = getters['maxId'] + 1
        item.key = getters['numberOfItemsInList']
        item.slug = slugify(item.name)

        commit('ITEM_ADD_NEW', item)
    },
    addQuantityToItem({ commit, state }, item) {
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        commit('ITEM_ACTIVE', itemIndex)
        commit('ITEM_ADD_QUANTITY', itemIndex)
    },
    removeItem({ commit, state }, item) {
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        commit('ITEM_INACTIVE', itemIndex)
        commit('ITEM_NO_QUANTITY', itemIndex)
    },
    removeQuantityToItem({ commit, state }, item) {
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        commit('ITEM_REMOVE_QUANTITY', itemIndex)
    },
    toggleActive({ commit, state }, item) {
        const itemIndex = state.list.findIndex(listItem => listItem.id === item)

        commit('ITEM_TOGGLE', itemIndex)
    }
}
