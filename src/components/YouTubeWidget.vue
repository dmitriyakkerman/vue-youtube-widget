<template>
    <div class="youtube-widget">
        <div class="youtube-widget__header">
            <div class="youtube-widget__info">
                <img :src="channelAvatar" alt="" class="youtube-widget__logo">
                <div class="youtube-widget__data">
                    <h2 class="youtube-widget__title">{{ channelTitle }}</h2>
                    <div class="youtube-widget__subscribers-count">{{ Number(subscribersCount/1000).toFixed(subscribersCountToFixed) }} {{ subscribersCountText }}</div>
                </div>
            </div>
            <a :href="'http://www.youtube.com/channel/' + channelId + '?sub_confirmation=1'" class="youtube-widget__subscribe-btn">{{ subscribeBtnText }}</a>
        </div>
        <div class="youtube-widget__inner">
            <iframe v-for="video in videos" :key="video.id.videoId" :src="'https://www.youtube.com/embed/' + video.id.videoId" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <button v-if="totalVideosCount > videos.length" class="youtube-widget__load-more-btn" @click="loadMore" :disabled="isSending">{{ loadMoreBtnText }}</button>
    </div>
</template>

<script>

    import { getChannelTitleAndAvatar, getSubscribersCount, getVideos, loadMoreVideos } from "../api/YouTubeWidget";

    export default {
        props: {
            apiKey: {
                type: String,
                required: true
            },
            channelId: {
                type: String,
                required: true
            },
            resultsPerRequest: {
                type: Number,
                required: false,
                default: 1
            },
            subscribersCountToFixed: {
                type: Number,
                required: false,
                default: 1
            },
            subscribersCountText: {
                type: String,
                required: false,
                default: 'subscribers'
            },
            subscribeBtnText: {
                type: String,
                required: false,
                default: 'Subscribe'
            },
            loadMoreBtnText: {
                type: String,
                default: 'Load more'
            }
        },
        data() {
            return {
                subscribersCount: null,
                channelAvatar: '',
                channelTitle: '',
                videos: [],
                totalVideosCount: null,
                nextPageToken: null,
                isSending: false
            }
        },
        methods: {
            async getChannelTitleAndAvatar() {
                this.isSending = true;

                const response = await getChannelTitleAndAvatar(this.channelId, this.apiKey);

                this.channelAvatar = response["items"][0].snippet.thumbnails.default.url;
                this.channelTitle = response["items"][0].snippet.localized.title;

                this.isSending = false;
            },
            async getSubscribersCount() {
                this.isSending = true;

                const response = await getSubscribersCount(this.channelId, this.apiKey);

                this.subscribersCount = response["items"][0].statistics.subscriberCount;
                this.totalVideosCount = response["items"][0].statistics.videoCount;

                this.isSending = false;
            },
            async getVideos() {
                this.isSending = true;

                const response = await getVideos(this.channelId, this.apiKey, this.resultsPerRequest);

                this.videos = response.items;
                this.nextPageToken = response.nextPageToken;

                this.isSending = false;
            },
            async loadMore() {
                this.isSending = true;

                const response = await loadMoreVideos(this.channelId, this.apiKey, this.resultsPerRequest, this.nextPageToken);

                this.videos = [...this.videos, ...response.items];
                this.nextPageToken = response.nextPageToken;

                this.isSending = false;
            },
        },
        mounted() {
            this.getChannelTitleAndAvatar();
            this.getSubscribersCount();
            this.getVideos();
        }
    }

</script>