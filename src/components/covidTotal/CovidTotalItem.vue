<template>
  <section class="total__container">
    <ul class="total__list grid">
      <li class="total__item">
        <p class="total__title">Total Confirmed</p>
        <p class="total__num confirmed counter">
          {{ comma(covidTotal.TotalConfirmed || 0) }}
        </p>
        <p class="total__num-new confirmed">
          <ion-icon
            v-if="covidTotal.NewConfirmed == 0"
            name="remove"
          ></ion-icon>
          <ion-icon v-else name="caret-up-outline"></ion-icon>
          {{ comma(covidTotal.NewConfirmed) }}
        </p>
      </li>
      <li class="total__item">
        <p class="total__title">Total Deaths</p>
        <p class="total__num deaths">
          {{ comma(covidTotal.TotalDeaths || 0) }}
        </p>
        <p class="total__num-new deaths">
          <ion-icon v-if="covidTotal.TotalDeaths == 0" name="remove"></ion-icon>
          <ion-icon v-else name="caret-up-outline"></ion-icon>
          {{ comma(covidTotal.NewDeaths) }}
        </p>
      </li>
      <li class="total__item">
        <p class="total__title">Total Recovered</p>
        <p class="total__num recovered">
          {{ comma(covidTotal.TotalRecovered || 0) }}
        </p>
        <p class="total__num-new recovered">
          <ion-icon
            v-if="covidTotal.NewRecovered == 0"
            name="remove"
          ></ion-icon>
          <ion-icon v-else name="caret-up-outline"></ion-icon>
          {{ comma(covidTotal.NewRecovered) }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { comma } from '@/utils/filters';

export default defineComponent({
  name: 'CovidTotalItem',
  setup() {
    const { state } = useStore();
    const covidTotal = computed(() => state.covidList.covidTotal);

    return {
      covidTotal,
      comma,
    };
  },
});
</script>
<style scoped></style>
