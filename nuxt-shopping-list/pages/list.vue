<template>
    <div>
        <h1>Shopping List</h1>
        <new-item></new-item>
        <div
            v-for="item in currentList"
            :key="item.id"
        >
            <list-item :item="item"></list-item>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListItem from "../components/List-item.vue";
import NewItem from "../components/New-item.vue";

export default {
    components: {
        ListItem,
        NewItem
    },
    beforeMount() {

    },
    computed: {
        ...mapActions([
            'getItems'
        ]),
        ...mapGetters([
            'currentList'
        ])
    },
}
</script>

<style lang="scss">

</style>
