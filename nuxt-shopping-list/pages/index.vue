<template>
    <div>
        <h1>Shopping List</h1>
        <div
            v-for="(category, name) in currentList"
            :key="category.name"
        >
            <list-category
                :items="category"
                :name="name"
            ></list-category>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListCategory from "../components/List-category.vue";

export default {
    middleware: 'notAuthenticated',
    components: {
        ListCategory
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
