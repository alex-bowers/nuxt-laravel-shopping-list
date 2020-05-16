<template>
    <div>
        <h2 class="category--header">{{ $props.name }}</h2>
        <new-item :category-id="$props.category.id"></new-item>
        <list-item
            v-for="item in $props.category.items"
            :key="item.id"
            :item="item"
        ></list-item>
    </div>
</template>

<script>
import ListItem from "../components/List-item.vue";
import NewItem from "../components/New-item.vue";

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
    }
}
</script>

<style lang="scss" scoped>
.category--header {
    margin: 0 0 1rem 0;
}
</style>
