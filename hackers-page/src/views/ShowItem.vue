<template>
  <div id="show-item-container">
    <div v-if="!isLoading && item.id">
      <div class="item-container">
        <Item :item="item" :query="null"/>
      </div>
    </div>
    <div v-if="!isLoading && !item.id" class="error-container">
      <img :src="SadIcon" alt="sad" class="error-icon">
      <p class="error-text">You are experiencing network issues or item does not exist.</p>
    </div>
    <div v-if="isLoading" class="loader">
      <Loader/>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import Api from "@/api/Api.js";
import Item from "@/components/main-content/components/item/Item.vue";
import Loader from "@/shared/components/Loader.vue";
import SadIcon from "@/assets/icons/sad-icon.svg"

export default {
  components: {Loader, Item},
  props: ["id"],
  setup(props) {
    const item = ref({});
    const isLoading = ref(true);
    const cachedSingleItems = JSON.parse(localStorage.getItem("cachedSingleItems") || "[]");
    const fetchItem = (selectedID) => {
      isLoading.value = true;
      let cachedItem = cachedSingleItems.find(element => element.id.toString() === selectedID);
      if (cachedItem) {
        item.value = cachedItem
        isLoading.value = false;
      } else {
        Api.searchSingleItem(selectedID)
            .then(response => {
              item.value = response;
              if (cachedSingleItems.unshift(response) > 15) {
                cachedSingleItems.pop()
              }
              localStorage.setItem("cachedSingleItems", JSON.stringify(cachedSingleItems));
            }).finally(() => isLoading.value = false);
      }
    };

    watch(() => props.id, value => fetchItem(value))

    onMounted(() => {
      fetchItem(props.id);
    });

    return {
      item,
      isLoading,
      SadIcon
    };
  }
};
</script>

<style>
#show-item-container {
  min-height: 90vh;
  background-color: ghostwhite;
  position: relative;

  .item-container {
    border-radius: 2rem;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
  }

  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: grey;
    border-radius: 1rem;
    height: 90vh;
  }

  .error-icon {
    height: 40vh;
  }

  .error-text {
    font-family: Alef, sans-serif;
    font-size: 4vh;
    text-align: center;
  }
}


</style>
