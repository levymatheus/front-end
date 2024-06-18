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
        console.log(error.response.data.message);
        return error.response;
    })
    return res;
},
}

export default gameService;