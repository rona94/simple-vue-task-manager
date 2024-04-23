<template>
    <div class="modal" v-if="isVisible" @click.self="closeModal">
        <div class="modal-content">
            <slot name="content" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["visible"],
    data() {
        return {
            isVisible: this.visible
        }
    },
    watch: {
        visible(newValue) {
            this.isVisible = newValue
        }
    },
    methods: {
        closeModal() {
            this.isVisible = false
            this.$emit("closeModal", false)
        }
    },
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    overflow: auto;
}
.modal-content {
    margin: 50px auto;
    width: 600px;
    min-height: 200px;
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    overflow: hidden;
}
</style>