<template>
    <div>
        <h2>{{ $props.name }}</h2>
        <list-item
            v-for="item in $props.items"
            :key="item.id"
            :item="item"
        ></list-item>
    </div>
</template>

<script>
import ListItem from "../components/List-item.vue";

export default {
    components: {
        ListItem,
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
