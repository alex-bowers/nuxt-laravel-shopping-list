<template>
    <div>
        <h2>{{ $props.name }}</h2>
        <new-item category-id=""></new-item>
        <list-item
            v-for="item in $props.items"
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
        items: {
            default: null,
            type: Array
        },
        name: {
            default: null,
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
