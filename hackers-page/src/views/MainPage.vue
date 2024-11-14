<template>
  <div id="main-page">
    <SideBar :selectedOption="selectedOption" :updateSelectedOption="updateSelectedOption"/>
    <MainContent :selectedOption="selectedOption" :updateSelectedOption="updateSelectedOption" :query="query"/>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import MainContent from "@/components/main-content/Main-Content.vue";
import SideBar from "@/components/sidebar/SideBar.vue";
import {sortingOptions} from "@/data/filter-elements/sorting-options/sortingOptions.js";
import {timeFrameOptions} from "@/data/filter-elements/time-frame-options/timeFrameOptions.js";
import {categoryOptions} from "@/data/filter-elements/category-options/categoryOptions.js";

export default defineComponent({
  name: "MainPage",
  components: {SideBar, MainContent},
  props: {
    query: {
      type: String,
      required: true
    }
  },
  setup() {
    const savedOption = JSON.parse(localStorage.getItem("selectedOption") || "{}");

    const selectedOption = ref({
      selectedCategory: savedOption.selectedCategory || {
        text: categoryOptions[0].text,
        value: categoryOptions[0].value
      },
      selectedSort: savedOption.selectedSort || {
        text: sortingOptions[0].text,
        value: sortingOptions[0].value
      },
      selectedTimeFrame: savedOption.selectedTimeFrame || {
        text: timeFrameOptions[0].text,
        value: timeFrameOptions[0].value
      }
    });

    const updateSelectedOption = (option) => {
      localStorage.setItem("selectedOption", JSON.stringify(option));
      selectedOption.value = option;
    }

    return {
      selectedOption,
      updateSelectedOption
    }
  }
});
</script>

<style>
#main-page {
  display: flex;
}
</style>
