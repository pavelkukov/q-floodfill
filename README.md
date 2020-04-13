# q-floodfill

Optimized, non-recursive flood fill algorithm using a scan line search.

Implemented in TypeScript. Zero dependencies and bundle size around 1.7k (gzipped and minified).


## 📈 Performance
~35-40ms to fill 800x660 canvas
For comparison, wasm-flood-fill needs ~50-60ms for the same size.

As far as I know from my benchmarks, this is the fastest flood fill implementation around.

## 🧩 Installing
```shell
npm install --save q-floodfill
```

## ✔ Usage
```typescript
// import default from module
import FloodFill from 'q-floodfill'
// get 2d context
const context = canvas.getContext('2d')
// get image data
const imgData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
)
// Construct flood fill instance
const floodFill = new FloodFill(imgData)
// Modify image data
floodFill.fill(fillColor, x, y, 0)
// put the modified data back in context
context.putImageData(floodFill.imageData, 0, 0)
```

**Options**
* Prevent mutation of ImageData
```typescript
// If you wish to clone image data object
// use the second argument in the constructor
new FloodFill(imgData, false)
```
* Get modified pixels count
```typescript
// Construct flood fill instance
const floodFill = new FloodFill(imgData)
// Modify image data
floodFill.fill(fillColor, x, y, 0)
// Read property modifiedPixelsCount
const count = floodFill.modifiedPixelsCount
```

* Collect modified pixels. This option is having a significant impact on performance.
```typescript
const floodFill = new FloodFill(imgData)
// Set collectModifiedPixels to true
floodFill.collectModifiedPixels = true
// Modify image data
floodFill.fill(fillColor, x, y, 0)
// Read property modifiedPixels
const pixels = floodFill.modifiedPixels
// The type of modifiedPixels is Set<string>
// Each point is stored in the format `${x}|${y}`
```

## 🧾 Notes
* NPM - https://www.npmjs.com/package/q-floodfill
* GitHub - https://github.com/pavelkukov/q-floodfill
* Storybook - https://pavelkukov.github.io/q-floodfill/

## 👋 Author
Pavel Kukov <pavelkukov@gmail.com>

## © LICENSE (MIT)
See LICENSE.txt in the root directory

## 🙌 Acknowledgments
The work here is heavily inspired from QuickFill algorithm by John R. Shaw.
https://www.codeproject.com/Articles/6017/QuickFill-An-Efficient-Flood-Fill-Algorithm

## Similar packages
wasm-flood-fill - https://www.npmjs.com/package/wasm-flood-fill
ts-flood-fill - https://www.npmjs.com/package/ts-flood-fill
