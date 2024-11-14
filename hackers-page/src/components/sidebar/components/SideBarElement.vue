<template>
  <div :class="['sidebar-element-container', {'selected': isSelected}]">
    <img :src="element.icon" :alt="element.text" class="element-icon"/>
    <span class="element-text">{{ element.text }}</span>
  </div>
</template>

<script>
export default {
  name: "SideBarElement",
  props: {
    element: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean
    }
  }
}
</script>

<style>
.sidebar-element-container {
  display: flex;
  align-items: center;
  gap: 0.75vw;
  height: 4vh;
  padding: 1vh 2vh;
  margin-bottom: 1vh;
  cursor: pointer;
  transition: background-color 150ms;
}

.selected {
  background-color: lightgrey;
}

.sidebar-element-container:hover {
  background-color: lightgrey;
}

.element-icon {
  height: 3vh;
}

.element-text {
  font-family: Arial, sans-serif;
  font-size: 2vh;
}
</style>
