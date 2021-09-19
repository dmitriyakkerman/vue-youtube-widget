<template>
  <div id="app">
    <YouTubeWidget
            apiKey="YOUR_API_KEY"
            channelId="YOUR_CHANNEL_ID"
            :resultsPerRequest="4"
            subscribersCountText="подписчиков"
            subscribeBtnText="Подписаться"
            loadMoreBtnText="Загрузить еще"
    ></YouTubeWidget>
  </div>
</template>

<script>
import YouTubeWidget from "./components/YouTubeWidget";

export default {
  name: 'App',
  components: {
    YouTubeWidget
  }
}
</script>

<style lang="scss">
    @import "main.scss";
</style>
