import api from "./api";

interface watchTimeParams {
    newId: number
    seconds: number
}

const watchVideoService = {
    getWatchTime: async (newId: number) => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.get(`/news/${newId}/watchTime`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).catch((error) => {
            return error.response;
        })
        return res;
    },
    setWatchTime: async ({newId, seconds}: watchTimeParams) => {
        const token = sessionStorage.getItem('gamersnews-token');

        const res = await api.post(`/news/${newId}/watchTime`,{seconds}, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).catch((error) => {
            return error.response;
        })
        return res;
    },
}

export default watchVideoService