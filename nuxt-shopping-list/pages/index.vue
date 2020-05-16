<template>
    <div class="shopping-list">
        <h1 class="page--header">Shopping List</h1>
        <div class="shopping-list--categories">
            <list-category
                v-for="category in currentList"
                :key="category.name"
                :category="category"
                :name="category.name"
                class="shopping-list--category"
            ></list-category>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListCategory from "../components/List-category.vue"

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
.shopping-list--category {
    padding: 1rem;
    background-color: $blue-5;
    &:nth-child(even) {
        background-color: $blue-7;
    }
}

@media (min-width: $breakpoint-large) {
    .shopping-list--categories {
        display: flex;
        justify-content: space-between;
    }
    .shopping-list--category {
        width: 100%;
        padding: 2rem;
    }
}
</style>
