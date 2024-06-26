import api from './api';
import { GameType } from './gameService';

export type CategoryType = {
    id: number;
    name: string;
    position: number;
    games?: GameType[];
};

const CategoriesService = {
    getCategories: async () => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });
        return res;
    },

    getGames: async (id: number) => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.get(`categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        });
        return res;
    }
}

export default CategoriesService;