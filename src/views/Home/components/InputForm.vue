<template>
    <select v-if="type == 'select'" class="select" @change="handleChange(name)" v-model="model">
      <option value="" disabled>select assigned to</option>
      <option v-for="item in lists" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select> 
    <textarea 
      v-else-if="type == 'textarea'" 
      class="textarea" 
      v-model="model" 
      @keyup="adjustHeight($event)"
      @change="handleChange(name)"></textarea>
    <input type="text" v-else />
  </template>
  
<script>
  
export default {
  props: ['value', 'name', 'type', 'lists'],
  data() {
    return {
      model: this.value
    }
  },
  watch: {
    value(newValue) {
      this.model = newValue
    }
  },
  methods: {
    handleChange(type) {
      this.$emit("update", type, this.model)
    },
    adjustHeight(e) {
      const el = e.target
      el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "60px";
    }
  },
}
</script>
  
<style scoped>
.select,
.textarea {
  cursor: pointer;
}
.textarea {
  width: 100%;
  height: 60px;
  border: 0;
  padding: 0;
  margin-top: 10px;
  line-height: 1.5em;
}
</style>