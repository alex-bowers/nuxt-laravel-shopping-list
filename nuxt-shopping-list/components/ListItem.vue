<template>
    <div
        :class="{'is-inactive': !$props.item.active}"
        class="shopping-list--item"
    >
        <div class="item--status">
            <h3>{{ $props.item.name }}</h3>
            <span
                class="item--status--action"
                @click="toggleActive($props.item)"
            >{{ toggleText }}</span>
        </div>
        <div v-if="$props.item.active" class="item--quantity">
            <button
                class="item--quantity--add"
                @click="addQuantityToItem($props.item)"
            >+</button>
            <div class="item--quantity--number">{{ $props.item.quantity }}</div>
            <button
                class="item--quantity--remove"
                @click="removeQuantityToItem($props.item)"
            >-</button>
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
    computed: {
        toggleText() {
            return this.$props.item.active ?
                "Get this next week" :
                "Get it this week"
        }
    },
    methods: {
        ...mapActions([
            'addQuantityToItem',
            'removeQuantityToItem',
            'toggleActive'
        ])
    },
}
</script>

<style lang="scss" scoped>
$border-radius: 0.5rem;

.shopping-list--item {
    padding: 2rem 1em;
    + .shopping-list--item  {
        border-top: 1px solid $blue-15;
    }
}

.item--status {
    margin-bottom: 2rem;
    h3 {
        font-size: 1.125rem;
        margin-top: 0;
    }
    .item--status--action {
        cursor: pointer;
        font-size: 0.875rem;
        text-decoration: underline;
    }
}

.item--quantity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    background-color: $blue-15;
    color: $blue-4;
    border-radius: $border-radius;
    .item--quantity--add,
    .item--quantity--remove {
        background-color: $blue-11;
        border: none;
        color: $blue-19;
        cursor: pointer;
        font-size: inherit;
        height: 100%;
        padding: 0.5rem 2rem;
        &:hover {
            background-color: $blue-15;
            color: $blue-11;
            cursor: pointer;
        }
    }
    .item--quantity--add {
        border-right: 1px solid;
        border-radius: $border-radius 0 0 $border-radius;
    }
    .item--quantity--number {
        padding: 0.5rem;
    }
    .item--quantity--remove {
        border-left: 1px solid;
        border-radius: 0 $border-radius $border-radius 0;
    }
}

.is-inactive {
    .item--status {
        h3 {
            color: $blue-1;
        }
    }
}

@media (min-width: $breakpoint-medium) {
    .shopping-list--item {
        display: flex;
        justify-content: space-between;
    }
    .item--status {
        margin-bottom: 0;
    }
    .item--quantity {
        .item--quantity--add,
        .item--quantity--remove {
            padding: 1rem;
        }
        .item--quantity--number {
            padding: 1rem;
        }
    }
}
</style>
