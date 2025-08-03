import { defineStore } from 'pinia';
import axios from 'axios';

export const useForecastStore = defineStore('forecast', {
    state: () => ({
        forecastData: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchForecast(dishId) {
            this.loading = true;
            this.error = null;
            this.forecastData = null;
            try {
                // Adjust to the new proxy setting
                const response = await axios.get(`/forecast?dish_id=${dishId}`);
                this.forecastData = response.data;
            } catch (e) {
                this.error = e.message;
                console.error('API 呼叫失敗:', e);
            } finally {
                this.loading = false;
            }
        },
    },
});
