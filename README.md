# Vue Breakpointer

A simple Vue mixin to augment your Vue instance with a breakpoint helpers

## Install

### Node.js / Webpack

```bash
npm install vue-breakpointer --save
```
or

```bash
yarn add vue-breakpointer --save
```

### UMD / Browser

```html
<script src="https://unpkg.com/vue-breakpointer"></script>
```

## Global usage

```js
import VueBreakpointer from 'vue-breakpointer'
...
Vue.use(VueBreakpointer, {
  // defaults
  breakpoints: {
    xs: 320,
    sm: 480,
    md: 720,
    lg: 1200
  }
})
...
```

## Component usage

```js
// some component
...
import VueBreakpointer from 'vue-breakpointer'

export default {
  ...
  mixins: [ VueBreakpointer ],
  mounted () {
    // initial values
    console.log(windowDimensions: this.windowDimensions)
    console.log(breakpoint: this.breakpoint)
  }
  ...
}
...
```

## General usage

```html
<template>
  <div>
    <!-- show both window.width and window.height -->
    <pre>{{windowDimensions}}</pre>
    <!-- show the current breakpoint -->
    <pre>{{breakpoint}}</pre>

    <div v-if="xs">I am visible only on xs screens</div>
  </div>
</template>
```
