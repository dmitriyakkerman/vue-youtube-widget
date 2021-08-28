[![test](https://github.com/dmitriyakkerman/vue-youtube-widget/actions/workflows/test.yml/badge.svg)](https://github.com/dmitriyakkerman/vue-youtube-widget/actions/workflows/test.yml)
# vue-youtube-widget

> Simple Vue.js youtube widget for your website using YouTube Api 3.

![vue-youtube-widget](https://github.com/dmitriyakkerman/vue-youtube-widget/blob/master/images/vue-youtube-widget.png?raw=true)

* Fetches channel's logo, name and subscribers count
* Fetches initial count of videos 
* Loads additional videos

## Usage

1. Clone repository 
```js
https://github.com/dmitriyakkerman/vue-vuex-i18n-browser-sfc-starter.git
```
2. Install dependencies
```js
npm install
```
3. Import "YouTubeWidget" component in you app

```js
<template>
  <div id="app">
    <YouTubeWidget apiKey="YOUR_API_KEY" channelId="YOUR_CHANNEL_ID"></YouTubeWidget>
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

```

4. Configure component additional props if needed:

```js
<template>
  <div id="app">
    <YouTubeWidget
            apiKey="YOUR_API_KEY"
            channelId="YOUR_CHANNEL_ID"
            :resultsPerRequest="4"
            :subscribersCountToFixed="1"
            subscribersCountText="подписчиков"
            subscribeBtnText="Подписаться"
            loadMoreBtnText="Загрузить еще"
    ></YouTubeWidget>
  </div>
</template>

...
```

5. Import "YouTubeWidget" base styles from "main.scss"

```css
...

<style lang="scss">
    @import "main.scss";
</style>

```

6. Write your additional custom styles for widget.
7. Run dev server:

```js
npm run serve
```
8. Enjoy! 🎉

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

##### `subscribersCountToFixed`
The number of digits to appear after the decimal point in subscribers count

*Type:* Number 
*Required:* false
*Default:* 1

##### `subscribersCountToFixed`
The number of digits to appear after the decimal point in subscribers count

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
