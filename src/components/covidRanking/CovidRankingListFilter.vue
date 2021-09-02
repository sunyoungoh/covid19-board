<template>
  <li :class="[filter.selected ? 'rankiing__filter--selected' : '']">
    <span>{{ filter.name }}</span>
    <div class="sort__icon" :class="[filter.desc ? 'sort__desc' : '']">
      <ion-icon name="caret-up-outline"></ion-icon>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RankingFilter } from '@/types/filter';
export default defineComponent({
  name: 'CovidRankingListFilter',
  props: {
    filter: { required: true, type: Object as PropType<RankingFilter> },
  },
});
</script>
<style scoped></style>
