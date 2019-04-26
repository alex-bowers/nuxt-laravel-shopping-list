<template>
    <div>
        <input type="text" v-model="form.name">
        <select name="" id="" v-model="form.quantity">
            <option v-for="n in maxQuantity" :key="n" :value="n">{{ n }}</option>
        </select>
        <button @click="addToList">Add</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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
                this.addNewItem(this.form)
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

</style>
