[![test](https://github.com/dmitriyakkerman/vue-youtube-widget/actions/workflows/test.yml/badge.svg)](https://github.com/dmitriyakkerman/vue-youtube-widget/actions/workflows/test.yml)
# vue-youtube-widget

> Vue.js YouTube widget for your website using YouTube API 3.

![vue-youtube-widget](https://github.com/dmitriyakkerman/vue-youtube-widget/blob/master/images/vue-youtube-widget.png?raw=true)

* Fetches channel's logo, name and subscribers count
* Fetches initial count of videos 
* Loads additional videos

## Installation

### npm

```js
npm i vue-youtube-widget
```

### Github

1. Clone repository 
```js
https://github.com/dmitriyakkerman/vue-youtube-widget.git
```
2. Install dependencies
```js
npm install
```

## Usage

1. Import "YouTubeWidget" component in you app

```js
<template>
  <div>
    <YouTubeWidget apiKey="YOUR_API_KEY" channelId="YOUR_CHANNEL_ID"></YouTubeWidget>
  </div>
</template>

<script>
import YouTubeWidget from "./components/YouTubeWidget";

export default {
  components: {
    YouTubeWidget
  }
}
</script>

```

2. Configure component additional props if needed:

```js
<template>
  <div>
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

...
```

3. Import "YouTubeWidget" basic styles from "main.scss"

```css
...

<style>
  @import "~vue-youtube-widget/dist/YouTubeWidget.min.css";
</style>

```

4. Write your additional custom styles for widget.
5. Enjoy! 🎉

-------------

### Props

##### `apiKey`
API key from Google API Console

*Type:* String  

*Required:* true

##### `channelId`
ID of Youtube channel

*Type:* String  

*Required:* true

##### `resultsPerRequest`
Number of requested videos per request

*Type:* Number

*Required:* false

*Default:* 1

##### `subscribersCountText`
"subscribers" word replacement for localized text using vue-i18n

*Type:* String 

*Required:* false

*Default:* "subscribers"

##### `subscribeBtnText`
"Subscribe" word replacement in "Subscribe" button for localized text using vue-i18n

*Type:* String 

*Required:* false

*Default:* "Subscribe"

##### `loadMoreBtnText`
"Load more" word replacement in "Load more" button for localized text using vue-i18n

*Type:* String 

*Required:* false

*Default:* "Load more"
