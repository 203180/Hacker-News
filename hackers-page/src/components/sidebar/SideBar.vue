<template>
  <div id="sidebar-container">
    <div
        v-for="(element, index) in elements.slice(0, elements.length - 2)"
        :key="index"
        @click="selectOption(element.value, element.text)"
    >
      <SideBarElement :element="element" :isSelected="selectedOption.selectedCategory.value === element.value"/>
    </div>
    <hr class="separator"/>
    <div
        v-for="(element, index) in elements.slice(elements.length - 2)"
        :key="index"
    >
      <SideBarElement :element="element"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import SideBarElement from "@/components/sidebar/components/SideBarElement.vue";
import {elements} from "@/data/sidebar-elements/sidebarElements.js";

export default defineComponent({
  name: "SideBar",
  components: {SideBarElement},
  props: {
    selectedOption: {
      type: Object,
      required: true
    },
    updateSelectedOption: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const selectOption = (value, text) => {
      let updatedOption;
      updatedOption = {
        ...props.selectedOption,
        selectedCategory: {
          text: text,
          value: value
        },
      };
      props.updateSelectedOption(updatedOption);
    };

    return {
      elements,
      selectOption,
    };
  },
});
</script>

<style>
#sidebar-container {
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  height: 88vh;
  width: 13vw;
  padding-top: 5vh;
  position: sticky;
  top: 10vh;
}

.separator {
  width: 95%;
  margin-bottom: 1.5vh;
}
</style>
