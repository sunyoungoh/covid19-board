<script>
import { defineComponent, computed, ref } from 'vue';
import { Line } from 'vue3-chart-v2';
import { comma } from '@/utils/filters';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CovidChartLine',
  extends: Line,
  setup() {
    const { state } = useStore();
    const chartData = computed(() => state.covidChart.chartData);
    const chartDays = computed(() => state.covidChart.chartDays);
    const hitRadius = ref(7);
    const selectedDays = chartDays.value.find(value => value.selected).days;
    switch (selectedDays) {
      case 7:
        hitRadius.value = 50;
        break;
      case 14:
        hitRadius.value = 27;
        break;
      case 30:
        hitRadius.value = 12;
        break;
      case 90:
        hitRadius.value = 6;
    }
    const chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      tooltips: {
        titleFontSize: 13,
        bodyFontSize: 14,
        xPadding: 13,
        yPadding: 11,
        callbacks: {
          label: (tooltipItem, data) => {
            return comma(tooltipItem.value);
          },
        },
      },
      spanGaps: true,
      elements: {
        point: {
          radius: 0,
          hitRadius: hitRadius,
          hoverRadius: 7,
        },
      },
      interaction: {
        mode: 'dataset',
        intersect: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              maxRotation: 0,
              minRotation: 0,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                let valueComma = comma(value);
                let valueCommalength = comma(value).length;
                if (valueCommalength > 8)
                  value = valueComma.slice(0, valueCommalength - 8) + 'M';
                else if (valueCommalength > 4)
                  value = valueComma.slice(0, valueCommalength - 4) + 'K';
                return value;
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
            },
          },
        ],
      },
    };

    return { chartData, chartOptions };
  },

  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
});
</script>
<style scoped></style>
