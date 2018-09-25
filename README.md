# Vue Breakpointer

A simple Vue plugin/mixin to augment your Vue instance with breakpoint helpers

## Install

### NPM/Yarn

```bash
npm install vue-breakpointer --save
```

or

```bash
yarn add vue-breakpointer --save
```

### Browser

```html
<script src="https://unpkg.com/vue-breakpointer"></script>
```

## Plugin

```js
import VueBreakpointer from 'vue-breakpointer'
...
Vue.use(VueBreakpointer, {
  // defaults
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
})
...
```

## Mixin

```js
import { VueBreakpointerMixin } from 'vue-breakpointer'
...
export default {
  ...
  mixins: [ VueBreakpointerMixin ],
  data () {
    return {
      // defaults
      breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
      }
    }
  }
  ...
}
...
```

## Data & Computed Properties

| Property  | Type | Description |
| ------------- | ------------- | ------------- |
| windowDimensions  | Object | On object containing both the current window width & height (in pixels)  |
| xs  | Boolean | < sm |
| sm  | Boolean | >= sm && < md  |
| md  | Boolean | >= md && < lg  |
| lg  | Boolean | >= lg && < xl  |
| xl  | Boolean | >= xl  |

## Example usage

```html
<template>
  <div>
    <!-- an object showing both width and height of window -->
    <pre>{{windowDimensions}}</pre>

    <!-- the current breakpoint -->
    <pre>{{breakpoint}}</pre>

    <!-- use to determine visibility of elements and components at certain breakpoints -->
    <div v-if="xs">I am visible only on xs screens</div>
    <div v-if="sm">I am visible only on sm screens</div>
    <div v-if="md">I am visible only on md screens</div>
    <div v-if="lg">I am visible only on lg screens</div>
    <div v-if="xl">I am visible only on xl screens</div>
  </div>
</template>
```
