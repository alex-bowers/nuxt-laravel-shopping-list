<template>
    <div class="category">
        <div class="category--header" @click="isCategoryOpenOnMobile = !isCategoryOpenOnMobile">
            <h2>{{ $props.name }}</h2>
            <dropdown-arrow
                :is-active="isCategoryOpenOnMobile"
            ></dropdown-arrow>
        </div>
        <transition name="slide">
            <div
                v-show="isCategoryOpenOnMobile"
                :id="collapsableContainerId"
                class="category--collapsable-container"
            >
                <new-item :category-id="$props.category.id"></new-item>
                <transition-group name="flip-list" tag="div">
                    <list-item
                        v-for="item in sortedListItems"
                        :key="item.id"
                        :item="item"
                    ></list-item>
                </transition-group>
            </div>
        </transition>
    </div>
</template>

<script>
import DropdownArrow from "../components/DropdownArrow.vue";
import ListItem from "../components/ListItem.vue"
import NewItem from "../components/NewItem.vue"

export default {
    components: {
        DropdownArrow,
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
    data() {
        return {
            isCategoryOpenOnMobile: false
        }
    },
    computed: {
        collapsableContainerId() {
            return `collapsable_${this.$props.name.toLowerCase()}`
        },
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
.category {
    cursor: pointer;
}

.category--header {
    position: relative;
    display: flex;
    margin: 0 0 1rem 0;
}

// Transitions
.slide-enter-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   transition-duration: 0.3s;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100vh;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

.flip-list-move {
    transition: all 0.4s ease-out;
}

@media (min-width: $breakpoint-large) {
    // Ignore the previous states.
    .category--collapsable-container {
        display: block !important;
        max-height: 100% !important;
        opacity: 1 !important;
        transition: none !important;
    }
}
</style>
