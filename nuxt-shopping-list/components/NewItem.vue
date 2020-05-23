<template>
    <div class="new-item--container">
        <form class="new-item-form" @submit.prevent="addToList">
            <div class="new-item-form--name">
                <label for="item_name">Name:</label>
                <input
                    v-model="form.name"
                    id="item_name"
                    type="text"
                >
            </div>
            <div class="new-item-form--bottom-row">
                <div class="new-item-form--quantity">
                    <label for="item_quantity">Quantity:</label>
                    <select
                        v-model="form.quantity"
                        id="item_quantity"
                    >
                        <option v-for="n in maxQuantity" :key="n" :value="n">{{ n }}</option>
                    </select>
                </div>
                <button
                    class="submit-button"
                    type="submit"
                >Add item</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        categoryId: {
            default: null,
            type: Number
        }
    },
    data() {
        return {
            form: {
                active: true,
                name: null,
                quantity: 1
            }
        }
    },
    computed: {
        ...mapGetters([
            'maxQuantity'
        ])
    },
    methods: {
        ...mapActions([
            'addNewItem'
        ]),
        addToList() {
            if (this.form.name) {
                this.addNewItem({
                    ...this.form,
                    category_id: this.$props.categoryId
                })
                .then(() => {
                    this.resetForm()
                })
            }
        },
        resetForm() {
            this.form.name = null,
            this.form.quantity = 1
        }
    }
}
</script>

<style lang="scss" scoped>
.new-item--container {
    background-color: $blue-15;
    border-radius: 0.5rem;
    color: $blue-4;
    font-size: 0.875rem;
    padding: 1rem;
    margin-bottom: 2rem;
}
.new-item-form--bottom-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.new-item-form--name,
.new-item-form--quantity {
    display: flex;
    flex-direction: column;
    input, select {
        padding: 0.5rem;
        min-width: 150px;
    }
    label {
        margin-bottom: 0.5rem;
    }
}
.new-item-form--name {
    margin-bottom: 1rem;
}
.submit-button {
    height: 35px;
    min-width: 75px;
    &:hover {
        background-color: $blue-19;
    }
}

@media (min-width: $breakpoint-large) {
    .submit-button {
        min-width: 125px;
    }
}
</style>
