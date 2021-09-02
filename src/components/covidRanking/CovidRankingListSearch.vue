<template>
  <div class="search__input">
    <div
      class="search__icon"
      :class="[searchTerm ? 'search__active' : 'search__icon ']"
    >
      <ion-icon name="search"></ion-icon>
    </div>
    <input
      type="text"
      placeholder="Search Country Name..."
      :value="searchTerm"
      @input="$emit('update:searchTerm', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CovidRankingListSearch',
  props: { searchTerm: { required: true, type: String } },
});
</script>
<style scoped></style>
