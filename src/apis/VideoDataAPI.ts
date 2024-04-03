import api from '../configs/axios';

const VideoDataAPI = {
    getVideoList: async function () {
        console.log("Calling VideoDataAPI.getVideoList")
        
        const response = await api.request({
            url: '/video-list',
            method: 'GET',
        });
        
        console.log(response.data)

        return response.data;
    },
};

export default VideoDataAPI;
