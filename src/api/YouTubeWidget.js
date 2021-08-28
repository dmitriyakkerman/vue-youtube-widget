import axios from "axios";

export const getChannelTitleAndAvatar = async function(channelId, apiKey) {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`);

    return response.data;
};

export const getSubscribersCount = async function(channelId, apiKey) {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);

    return response.data;
};

export const getVideos = async function(channelId, apiKey, resultsCount) {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${resultsCount}`);

    return response.data;
};

export const loadMoreVideos = async function(channelId, apiKey, resultsCount, nextPageToken) {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&pageToken=${nextPageToken}&maxResults=${resultsCount}`);

    return response.data;
};