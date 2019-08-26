<template>
    <div
        :class="{'is-active': !$props.item.active}"
        class="shopping-list-item"
    >
        <div>Name: {{ $props.item.name }}</div>
        <div>Quantity: {{ $props.item.quantity }}</div>
        <div>
            <span @click="addQuantityToItem($props.item.id)">Add</span>
            <span @click="removeQuantityToItem($props.item.id)">Remove</span>
            <span @click="removeItem($props.item.id)">Delete</span>
            <span @click="toggleActive($props.item.id)">Toggle</span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        item: {
            default: null,
            type: Object
        }
    },
    methods: {
        ...mapActions([
            'addQuantityToItem',
            'removeItem',
            'removeQuantityToItem',
            'toggleActive'
        ])
    },
}
</script>

<style lang="scss" scoped>
.is-active {
    background-color: red;
}
.shopping-list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
}
</style>
