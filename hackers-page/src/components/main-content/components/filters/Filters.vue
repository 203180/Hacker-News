<template>
  <div id="filters-bar">
    <div class="filters-container">
      <p class="selected-tag">{{ selectedOption.selectedCategory.text }}</p>
      <div class="select-filter-container">
        <p class="text">in</p>
        <select class="select-filter" v-model="selectedOption.selectedCategory.value"
                @change="handleFilterChange(selectedOption.selectedCategory.value, 'selectedCategory', 'categoryOptions')">
          <option v-for="option in getOptions('categoryOptions')" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="select-filter-container">
        <p class="text">by</p>
        <select class="select-filter" v-model="selectedOption.selectedSort.value"
                @change="handleFilterChange(selectedOption.selectedSort.value, 'selectedSort', 'sortingOptions')">
          <option v-for="option in getOptions('sortingOptions')" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
      </div>
      <div class="select-filter-container">
        <p class="text">for</p>
        <select class="select-filter" v-model="selectedOption.selectedTimeFrame.value"
                @change="handleFilterChange(selectedOption.selectedTimeFrame.value, 'selectedTimeFrame', 'timeFrameOptions')">
          <option v-for="option in getOptions('timeFrameOptions')" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <p v-if="processingInfo" class="text">{{processingInfo.numElements}} results in {{processingInfo.timeInMS}} ms</p>
  </div>
</template>

<script>
import {watch} from "vue";
import {categoryOptions} from "@/data/filter-elements/category-options/categoryOptions.js";
import {sortingOptions} from "@/data/filter-elements/sorting-options/sortingOptions.js";
import {timeFrameOptions} from "@/data/filter-elements/time-frame-options/timeFrameOptions.js";

export default {
  name: "Filters",
  props: {
    selectedOption: {
      type: Object,
      required: true
    },
    updateSelectedOption: {
      type: Object,
      required: true
    },
    processingInfo: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const handleFilterChange = (newValue, type, selectedArray) => {
      let optionsTMP = props.selectedOption;
      optionsTMP[type] = {
        text: getOptions(selectedArray).find(option => option.value === optionsTMP[type].value).text,
        value: optionsTMP[type].value
      }
      props.updateSelectedOption(optionsTMP);
    }

    const getOptions= (type) => {
      if (type === 'categoryOptions')
        return categoryOptions
      if (type === 'sortingOptions')
        return sortingOptions
      if (type === 'timeFrameOptions')
        return timeFrameOptions
    }
    return {
      handleFilterChange,
      getOptions
    }
  }
}
</script>

<style>
#filters-bar {
  height: 10vh;
  background-color: ghostwhite;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3vh;
  border-bottom: lightgrey solid 1px;

  .filters-container {
    display: flex;
    align-items: center;
    gap: 1vw;
  }

  .selected-tag {
    font-size: 5vh;
    margin: 0;
    font-family: Alef, sans-serif;
  }

  .select-filter-container {
    display: flex;
    align-items: center;
  }

  .select-filter {
    height: 3.5vh;
    padding: 0 0.25rem;
    font-size: 1.5vh;
    border-color: lightgrey;
    margin-left: 0.25vw;
    cursor: pointer;
  }

  .text {
    font-family: Alef, sans-serif;
    margin: 0;
  }
}
</style>