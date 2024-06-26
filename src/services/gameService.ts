import api from './api';

export type newType = {
    id: number;
    name: string;
    textNews: string;
    order: number;
    videoUrl: string;
    secondsLong: number;
}

export type GameType = {
    id: number;
    name: string;
    thumbnailUrl: string;
    synopsis: string;
    games?: newType[];
}

const gameService = {
    getNewestGames: async () => {
        const res = await api.get("/games/newest").catch((error) => {
            return error.response;
        })
        return res;
    },
    getFeaturedGames: async () => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.get("/games/featured", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).catch((error) => {
            return error.response;
        })
        return res;
    },
    addToFav: async (gameId: number | string) => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.post(`/favorites`, { gameId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        })
        return res;
    },
    removefav: async (gameId: number | string) => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.delete(`/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { gameId }
        }).catch((error) => {
            return error.response;
        })
        return res;
    },
    getFavGames : async () => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.get(`/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            return error.response;
        })
        return res;
    }
}

export default gameService;