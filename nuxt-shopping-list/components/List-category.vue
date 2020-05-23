<template>
    <div>
        <h2 class="category--header">{{ $props.name }}</h2>
        <new-item :category-id="$props.category.id"></new-item>
        <transition-group name="flip-list" tag="div">
            <list-item
                v-for="item in sortedListItems"
                :key="item.id"
                :item="item"
            ></list-item>
        </transition-group>
    </div>
</template>

<script>
import ListItem from "../components/List-item.vue"
import NewItem from "../components/New-item.vue"

export default {
    components: {
        ListItem,
        NewItem
    },
    props: {
        category: {
            default: null,
            type: Object
        },
        name: {
            default: null,
            type: String
        }
    },
    computed: {
        sortedListItems() {
            return this.$props.category.items.sort((a, b) => {
                if (a.active > b.active) return -1
                if (a.active < b.active) return 1

                if (a.id > b.id) return -1
                if (a.id < b.id) return 1
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.category--header {
    margin: 0 0 1rem 0;
}
.flip-list-move {
    transition: all 0.4s ease-out;
}
</style>
