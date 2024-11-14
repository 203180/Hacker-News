<template>
  <div id="header">
    <router-link to="/" class="logo-container">
      <img :src="Logo" alt="logo" class="logo">
      <p class="logo-text">Search<br/> Hacker News</p>
    </router-link>
    <div class="search-bar-container">
      <img :src="SearchIcon" alt="search" class="search-icon">
      <input type="text" placeholder="Search titles by title, url or author" class="search-text-field" :value="query"
      @input="event => updateQuery(event.target.value)"/>
    </div>
    <img :src="FiltersIcon" alt="filter" class="filter-icon"/>
  </div>
</template>

<script>
import Logo from "@/assets/icons/hacker-news-logo.svg"
import SearchIcon from "@/assets/icons/search-icon.svg"
import FiltersIcon from "@/assets/icons/filter-icon.svg"

export default {
  name: 'Header',
  props: {
    query: {
      type: String,
      required: true
    },
    updateQuery: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      Logo,
      SearchIcon,
      FiltersIcon
    }
  }
}
</script>

<style>
#header {
  background-color: whitesmoke;
  height: 10vh;
  width: 98vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: lightgrey solid 1px;
  position: sticky;
  top: 0;
  z-index: 1;

  .logo-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
  }

  .logo {
    height: 100%;
  }

  .logo-text {
    font-family: Arial, sans-serif;
    font-size: 3vh;
    color: grey;
    line-height: 3vh;
    margin: 0;
  }

  .search-bar-container {
    position: relative;
  }

  .search-text-field {
    width: 50vw;
    height: 5vh;
    border-radius: 2rem;
    padding: 0 1vw 0 3vw;
    font-size: 2vh;
  }

  .search-icon {
    position: absolute;
    top: 1.25vh;
    left: 1vw;
    height: 3vh;
    width: 3vh;
  }

  .filter-icon {
    height: 4vh;
    cursor: pointer;
    margin-right: 0.25rem;
  }
}
</style>