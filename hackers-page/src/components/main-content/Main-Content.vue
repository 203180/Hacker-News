<template>
  <div id="main-content-container">
    <Filters :selectedOption="selectedOption" :updateSelectedOption="updateSelectedOption" :processing-info="processingInfo"/>
    <p v-if="offlineMode" class="offline-text">You are currently offline, showing cached items.</p>
    <div v-if="!isLoading && items.length > 0" class="item">
      <div class="pages-container" v-if="currentPage + 1 !== totalPages || currentPage !== 0">
        <div>
          <button class="page-button text" v-if="currentPage !== 0" @click="fetchItems(currentPage - 1)">
            Previous
          </button>
        </div>
        <button class="page-button text" v-if="currentPage + 1 !== totalPages" @click="fetchItems(currentPage + 1)">
          Next
        </button>
      </div>
      <Item v-for="item in items" :key="item.objectID" :item="item" :query="query"/>
    </div>
    <div v-if="!isLoading && items.length === 0" class="filler-container">
      <p class="no-items-text text">No items available for the requested filters.</p>
    </div>
    <div v-if="isLoading" class="filler-container">
      <Loader/>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/main-content/components/filters/Filters.vue";
import Item from "@/components/main-content/components/item/Item.vue";
import { onMounted, ref, watch } from "vue";
import Api from "@/api/Api.js";
import HackerIcon from "@/assets/icons/hacker-icon.svg"
import Loader from "@/shared/components/Loader.vue";

export default {
  name: "Main-Content",
  components: {Loader, Filters, Item },
  props: {
    selectedOption: {
      type: Object,
      required: true
    },
    updateSelectedOption: {
      type: Object,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const items = ref([]);
    const processingInfo = ref()
    const isLoading = ref(true);
    const offlineMode = ref(false);
    const currentPage = ref(0);
    const totalPages = ref(0);

    const fetchItems = async (page) => {
      isLoading.value = true;
      currentPage.value = page
      Api.searchItems(props.selectedOption, props.query, page)
          .then(response => {
            processingInfo.value = {
              numElements: response.nbHits,
              timeInMS: response.processingTimeMS
            }
            items.value = response.hits;
            localStorage.setItem("cachedItems", JSON.stringify(response));
            offlineMode.value = false;
            totalPages.value = response.nbPages;
          })
          .catch(() => {
            items.value = JSON.parse(localStorage.getItem("cachedItems")).hits;
            offlineMode.value = true;
          })
          .finally(() => {
            isLoading.value = false;
          });
    };

    watch(() => props.selectedOption, () => {
      fetchItems(0);
    }, { deep: true });

    watch(() => props.query, () => {
      fetchItems(0);
    });

    onMounted(() => fetchItems(0));

    return {
      items,
      isLoading,
      HackerIcon,
      processingInfo,
      offlineMode,
      currentPage,
      totalPages,
      fetchItems,
    };
  }
}
</script>

<style>
#main-content-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .filler-container {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item {
    border-bottom: whitesmoke 0.25rem solid;
    border-top: whitesmoke 0.25rem solid;
  }

  .offline-text {
    font-family: Alef, sans-serif;
    text-align: center;
    margin: 0.5rem 0;
    background-color: grey;
    color: white;
  }

  .no-items-text {
    font-size: 3vh;
    color: grey;
  }

  .pages-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    gap: 1rem;
  }

  .text {
    font-family: Alef, sans-serif;
  }

  .page-button {
    cursor: pointer;
    background-color: lightgrey;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 0.5rem;
  }
}
</style>
