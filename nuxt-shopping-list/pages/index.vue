<template>
    <div>
        <h1>Shopping List</h1>
        <div
            v-for="category in currentList"
            :key="category.name"
        >
            <list-category
                :category="category"
                :name="category.name"
            ></list-category>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListCategory from "../components/List-category.vue";

export default {
    middleware: 'notAuthenticated',
    components: {
        ListCategory
    },
    computed: {
        ...mapGetters([
            'currentList'
        ])
    },
    created() {
        this.$store.dispatch('getItems')
    }
}
</script>

<style lang="scss">

</style>
