<template>
  <Header :query="query" :updateQuery="updateQuery"/>
  <router-view :query="query"/>
</template>

<script>
import {defineComponent, ref} from "vue";
import Header from "@/components/header/Header.vue";

export default defineComponent({
  components: { Header },
  setup() {
    const query = ref('');

    const updateQuery = (value) => {
      query.value = value
    }

    return {
      query,
      updateQuery
    }
  }
});
</script>

<style>
body {
  min-height: 98vh;
  width: 98vw;
}
</style>
