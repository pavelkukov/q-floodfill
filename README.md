# q-floodfill

Optimized, non-recursive flood fill algorithm using a scan line search.

Implemented in TypeScript. Zero dependencies and bundle size around 1.8k (gzipped and minified).

Demo - https://pavelkukov.github.io/q-floodfill/

## 🙌 Acknowledgments

The work here is heavily inspired from QuickFill algorithm by John R. Shaw.
https://www.codeproject.com/Articles/6017/QuickFill-An-Efficient-Flood-Fill-Algorithm

## 📈 Performance

Needs ~30-40ms to fill 800x660 canvas. For comparison, [wasm-flood-fill](https://www.npmjs.com/package/wasm-flood-fill) needs ~50-60ms for the same operation.

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
const imgData = context.getImageData(0, 0, canvas.width, canvas.height)
// Construct flood fill instance
const floodFill = new FloodFill(imgData)
// Modify image data
floodFill.fill(fillColor, x, y, 0)
// put the modified data back in context
context.putImageData(floodFill.imageData, 0, 0)
```

**Options**

-   Get modified pixels count

```typescript
// Construct flood fill instance
const floodFill = new FloodFill(imgData)
// Modify image data
floodFill.fill(fillColor, x, y, 0)
// Read property modifiedPixelsCount
const count = floodFill.modifiedPixelsCount
```

-   Collect modified pixels. This option is having a significant impact on performance.

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

-   Use custom color comparison function

```typescript
// Compare colors as difference in contrast
// See: https://www.w3.org/TR/AERT/#color-contrast
function isSameColor(a: ColorRGBA, b: ColorRGBA, tolerance = 0): boolean {
    brightnessA = (299 * a.r + 587 * a.g + 114 * a.b) / 1000
    brightnessB = (299 * b.r + 587 * b.g + 114 * b.b) / 1000
    return Math.abs(brightnessA - brightnessB) <= tolerance
}
// Construct flood fill instance
const floodFill = new FloodFill(imgData)
// Set custom implementation
floodFill.isSameColor = isSameColor
// Modify image data
floodFill.fill(fillColor, x, y, 0)
```

-   Use custom implementations of dependency functions

```typescript
import {
    isSameColor,
    setColorAtPixel,
    getColorAtPixel,
    colorToRGBA,
} from './util/myColorFunctions'
// Construct flood fill instance
const floodFill = new FloodFill(imgData)
// Set custom implementation
floodFill.isSameColor = isSameColor
floodFill.setColorAtPixel = setColorAtPixel
floodFill.getColorAtPixel = getColorAtPixel
floodFill.colorToRGBA = colorToRGBA
// Modify image data
floodFill.fill(fillColor, x, y, 0)
```

**Useful exports**

```typescript
{
    isSameColor, // Compare two colors for equality with optional tolerance
    setColorAtPixel, // Set pixel color by x, y coordinates in ImageData array
    getColorAtPixel, // Get pixel color from ImageData array by x, y coordinates
    colorToRGBA, // Convert CSS rgba, rgb or HEX color to RGBA color
    hex2RGBA, // convert CSS hex to RGBA color. Alpha is 255 by default
    ColorRGBA, // Type definition {r: number, g: number, b: number, a: number}
}
```

## 🧾 Notes

-   NPM - https://www.npmjs.com/package/q-floodfill
-   GitHub - https://github.com/pavelkukov/q-floodfill
-   Storybook - https://pavelkukov.github.io/q-floodfill/

## 👋 Author

Pavel Kukov <pavelkukov@gmail.com>

## © LICENSE (MIT)

See LICENSE.txt in the root directory

## Similar packages

-   wasm-flood-fill - https://www.npmjs.com/package/wasm-flood-fill
-   ts-flood-fill - https://www.npmjs.com/package/ts-flood-fill
