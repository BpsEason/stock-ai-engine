<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForecastStore } from '../stores/forecast';

const forecastStore = useForecastStore();
const chartRef = ref(null);
let myChart = null;

const fetchAndDrawForecast = async () => {
  await forecastStore.fetchForecast(1);
};

const drawChart = () => {
  if (!myChart && chartRef.value) {
    myChart = echarts.init(chartRef.value);
  }

  if (myChart && forecastStore.forecastData) {
    const predictions = forecastStore.forecastData.predictions;
    const dates = predictions.map(item => item.date);
    const forecasts = predictions.map(item => item.forecast);

    const option = {
      title: {
        text: '未來備貨預測',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '預測數量',
          type: 'bar',
          data: forecasts,
          itemStyle: {
            borderRadius: [5, 5, 0, 0]
          }
        },
      ],
    };
    myChart.setOption(option);
  }
};

onMounted(() => {
  if (typeof echarts !== 'undefined') {
    fetchAndDrawForecast();
  }
});

watch(() => forecastStore.forecastData, (newVal) => {
  if (newVal) {
    drawChart();
  }
});
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto font-sans">
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-gray-700">庫存預測數據</h2>
      <button
        @click="fetchAndDrawForecast"
        :disabled="forecastStore.loading"
        class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ forecastStore.loading ? '載入中...' : '重新載入預測數據' }}
      </button>

      <div v-if="forecastStore.loading" class="mt-4 text-gray-600">
        正在載入...
      </div>

      <div v-if="forecastStore.error" class="mt-4 text-red-500">
        發生錯誤: {{ forecastStore.error }}
      </div>

      <div v-if="forecastStore.forecastData" class="mt-6">
        <div ref="chartRef" style="width: 100%; height: 400px;" class="bg-white p-4 rounded-lg"></div>
      </div>
    </div>
  </div>
</template>
