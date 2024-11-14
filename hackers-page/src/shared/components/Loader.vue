<template>
  <div id="loader">
    <img :src="HackerIcon" alt="loading" class="loading-icon">
    <p class="loading-text">Loading...</p>
  </div>
</template>

<script>
import HackerIcon from "@/assets/icons/hacker-icon.svg"

export default {
  name: "Loader",
  setup() {
    return {
      HackerIcon
    }
  }
}

</script>

<style>
#loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .loading-icon {
    height: 20vh;
  }

  .loading-text {
    margin-top: 2vh;
    font-size: 5vh;
    font-family: Alef, sans-serif;
    color: grey;
  }
}
</style>