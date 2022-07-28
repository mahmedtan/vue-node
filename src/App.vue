<script setup>
import { reactive } from "vue";

const data = reactive({ result: {} });

const fetchData = async () => {
  data.result = await (await fetch("http://localhost:8787")).json();
};

fetchData();
</script>

<template>
  <div class="main" v-if="Object.keys(data.result).length > 0">
    <p class="subtitle" style="color: cadetblue">Environment: Production</p>

    <div class="flex-container">
      <img :src="data.result.image" :alt="data.result.name" class="image" />

      <div class="text-container">
        <h2 class="heading">Name: {{ data.result.name }}</h2>
        <p class="subtitle">Gender: {{ data.result.gender }}</p>
        <p class="subtitle">Status: {{ data.result.status }}</p>
      </div>
    </div>
  </div>

  <div v-else style="margin: 0px auto">Loading....</div>
</template>

<style scoped>
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0px 0px;
}
.flex-container {
  display: flex;
  flex-direction: column;
  max-width: 350px;

  gap: 1rem;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 50px;
}
.text-container {
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding-top: 1rem;
}

.main {
  width: 100vw;

  padding-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  justify-content: center;
  align-items: center;
}
.image {
  overflow: hidden;

  aspect-ratio: 1/1;
  border-radius: 40px;
}

.subtitle {
  font-size: 1.5rem;
}

.heading {
  font-size: 1.5rem;
  font-weight: 900;
}
</style>
