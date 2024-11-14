import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://hn.algolia.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    searchItems (selectedOptions, query, page) {
        const path = selectedOptions.selectedSort.value === 'date' ? '/search_by_date' : '/search';

        let timeInSeconds = Math.floor(Date.now() / 1000);

        switch (selectedOptions.selectedTimeFrame.value) {
            case 'last_24_hours':
                timeInSeconds -= 24 * 60 * 60;
                break;
            case 'past_week':
                timeInSeconds -= 7 * 24 * 60 * 60;
                break;
            case 'past_month':
                timeInSeconds -= 30 * 24 * 60 * 60;
                break;
            case 'past_year':
                timeInSeconds -= 365 * 24 * 60 * 60;
                break;
            default:
                timeInSeconds = null;
        }

        const params = {
            query: query ? query : undefined,
            tags: selectedOptions.selectedCategory.value !== 'all' ? selectedOptions.selectedCategory.value : undefined,
            numericFilters: timeInSeconds ? `created_at_i>${timeInSeconds}` : undefined,
            page: page
        };

        return apiClient.get(path, { params }).then(response => response.data);
    },
    searchSingleItem(id) {
        return apiClient.get(`/items/${id}`).then(response => response.data);
    }
};
