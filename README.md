<h1 align="center">Snazzy</h1>

<div align="center">

[![GitHub license](https://img.shields.io/github/license/Wave-Play/snazzy?style=flat)](https://github.com/Wave-Play/snazzy/blob/main/LICENSE) [![Tests](https://github.com/Wave-Play/snazzy/workflows/CI/badge.svg)](https://github.com/Wave-Play/snazzy/actions) ![npm](https://img.shields.io/npm/v/@waveplay/snazzy) [![minizipped size](https://badgen.net/bundlephobia/minzip/@waveplay/snazzy)](https://bundlephobia.com/result?p=@waveplay/snazzy)

**Synthetic sugar for styling on React Native**

</div>

## Getting started

Install the package:

```bash
npm install @waveplay/snazzy
```

Instead of using `StyleSheet.create()`, use `sheet()` to create your styles:

```ts
import { sheet } from '@waveplay/snazzy'

const styles = sheet({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

// Alternatively, you can use the default export
import snazzy from '@waveplay/snazzy'

const styles = snazzy.sheet({
  // ...
})
```

You can now use destructuring to access your styles:

```tsx
<View {...styles.container}/>
```

See the [sample project](https://github.com/Wave-Play/snazzy/tree/master/example) for more usage examples.

## Individual styles

If you'd like to create individual styles, you can use `css()`:

```ts
import { css } from '@waveplay/snazzy'

const containerStyle = css({
  flex: 1,
  backgroundColor: 'white'
})
```

... and use it like this:

```tsx
<View {...containerStyle}/>
```

This is useful for creating styles as functions:

```ts
import { css } from '@waveplay/snazzy'

const containerStyle = (color) => css({
  flex: 1,
  backgroundColor: color
})
```

... and use it like this:

```tsx
<View {...containerStyle('white')}/>
```

## Merge styles

You can merge styles using the `merge()` function:

```ts
import { css, merge } from '@waveplay/snazzy'

const containerStyle = css({
  flex: 1,
  backgroundColor: 'white'
})

const textStyle = css({
  color: 'black'
})

const mergedStyle = merge(containerStyle, textStyle)
```

## Raw styles

Sometimes you may need to use raw style objects. You can use `cssRaw()` instead of `css()` to create these:

```ts
import { cssRaw } from '@waveplay/snazzy'

const containerStyle = cssRaw({
  flex: 1,
  backgroundColor: 'white'
})
```

This is useful for keeping the same syntax but making it compatible with more elements such as HTML:

```tsx
<div {...containerStyle}/>
```

## Conditional raw styles

Alternatively, you can pass a `raw` option to `css()`. The value can be a `boolean`, `'native'`, or `'web'`:

```ts
const containerStyle = css({
  flex: 1,
  backgroundColor: 'white'
}, {
  raw: 'web' // This will be a raw style object on web, but a style object on native
})
```

## Custom backends

Snazzy is powered by React Native's `StyleSheet` API by default. If you'd like to use a different backend, you can create your own backend by implementing the `SnazzyBackend` interface:

```ts
import { SnazzyBackend } from '@waveplay/snazzy/backend'

class CustomBackend implements SnazzyBackend {
  create<T>(style: T): T {
    // ...
  }

  merge<T>(...styles: T[]): T {
    // ...
  }
}
```

You can then create a new instance of Snazzy with your custom backend:

```ts
import { Snazzy } from '@waveplay/snazzy/core'

const snazz = new Snazzy({
  backend: new CustomBackend()
})
export default snazz
```

Don't forget to also export individual function bindings to keep the same import syntax:

```ts
export const css = snazz.css
export const cssRaw = snazz.cssRaw
export const merge = snazz.merge
export const sheet = snazz.sheet
```

## Transformers

Transformers are functions that can modify the styles. You can create your own transformers by implementing the `SnazzyTransformer` interface and passing it to the `transformers` option in a new instance of Snazzy:

```ts
import { Snazzy } from '@waveplay/snazzy/core'
import { DefaultBackend } from '@waveplay/snazzy/backend/default'
import type { SnazzyOptions, StyleType } from '@waveplay/snazzy/backend'

// This transformer will change the background color of the style to pink if the id is 'title'
const exampleTransformer = <T extends StyleType>(style: T, options: SnazzyOptions) => {
  if (options?.id === 'title') {
    style.backgroundColor = 'pink'
  }

  return style
}

const snazz = new Snazzy({
  backend: new DefaultBackend(),
  transformers: [ exampleTransformer ]
})
```

## Default instance

When you use `import snazzy from '@waveplay/snazzy'`, you're importing the default instance of Snazzy. This instance uses `StyleSheet` as its backend.

This may be considered unnecessary overhead if you're creating new instances of Snazzy in your code instead of using the default instance. Import from `@waveplay/snazzy/core` instead to avoid this overhead.

```ts
import { Snazzy } from '@waveplay/snazzy/core'

const snazzy = new Snazzy({
  // ... your custom options
})
```

## Credits

This project was originally developed for [WavePlay](https://waveplay.com).

## License

The MIT License.
