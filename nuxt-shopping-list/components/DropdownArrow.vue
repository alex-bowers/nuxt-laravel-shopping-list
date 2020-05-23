<template>
    <span
        :class="{ 'is-active': $props.isActive }"
        class="category--arrow"
    ></span>
</template>

<script>
export default {
    props: {
        isActive: {
            default: false,
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
.category--arrow {
    position: absolute;
    display: inline-block;
    bottom: 0;
    left: 50%;
    margin-top: 2px;
    transform: rotate(90deg);
    transition: 0.4s ease;
    width: 13px;
    &:before, &:after {
        position: absolute;
        display: inline-block;
        background-color: #fff;
        border-bottom: 12px solid white;
        content: '';
        height: 3px;
        left: 5px;
        top: 5px;
        transform: rotate(0);
        transition: 0.4s ease;
        width: 3px;
    }
    &:before {
        transform: rotate(-135deg);
    }
    &:after {
        position: absolute;
        left: 5px;
        top: -5px;
        transform: rotate(135deg);
    }
    &.is-active {
        transform: translate(0, -6px);
        &:before {
            top: -5px;
            transform: rotate(-45deg);
        }
        &:after {
            left: -5px;
            transform: rotate(45deg);
        }
    }
}

@media (min-width: $breakpoint-large) {
    .category--arrow {
        display: none;
    }
}
</style>
