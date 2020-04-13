export type ColorRGBA = {
    r: number
    g: number
    b: number
    a: number
}

export function getColorAtPixel(
    imageData: ImageData,
    x: number,
    y: number,
): ColorRGBA {
    const { width, data } = imageData
    const startPos = 4 * (y * width + x)
    if (data[startPos + 3] === undefined) {
        throw new Error('Invalid pixel coordinates: x=' + x + '; y=' + y)
    }
    return {
        r: data[startPos],
        g: data[startPos + 1],
        b: data[startPos + 2],
        a: data[startPos + 3],
    }
}

export function setColorAtPixel(
    imageData: ImageData,
    color: ColorRGBA,
    x: number,
    y: number,
): void {
    const { width, data } = imageData
    const startPos = 4 * (y * width + x)
    if (data[startPos + 3] === undefined) {
        throw new Error(
            'Invalid pixel coordinates. Cannot set color at: x=' +
                x +
                '; y=' +
                y,
        )
    }
    data[startPos + 0] = color.r & 0xff
    data[startPos + 1] = color.g & 0xff
    data[startPos + 2] = color.b & 0xff
    data[startPos + 3] = color.a & 0xff
}

export function isSameColor(
    a: ColorRGBA,
    b: ColorRGBA,
    tolerance = 0,
): boolean {
    return !(
        Math.abs(a.r - b.r) > tolerance ||
        Math.abs(a.g - b.g) > tolerance ||
        Math.abs(a.b - b.b) > tolerance ||
        Math.abs(a.a - b.a) > tolerance
    )
}

export function hex2RGBA(hex: string, alpha = 255): ColorRGBA {
    let parsedHex = hex
    if (hex.indexOf('#') === 0) {
        parsedHex = hex.slice(1)
    }
    // convert 3-digit hex to 6-digits.
    if (parsedHex.length === 3) {
        parsedHex =
            parsedHex[0] +
            parsedHex[0] +
            parsedHex[1] +
            parsedHex[1] +
            parsedHex[2] +
            parsedHex[2]
    }
    if (parsedHex.length !== 6) {
        throw new Error(`Invalid HEX color ${parsedHex}.`)
    }
    const r = parseInt(parsedHex.slice(0, 2), 16)
    const g = parseInt(parsedHex.slice(2, 4), 16)
    const b = parseInt(parsedHex.slice(4, 6), 16)
    return {
        r,
        g,
        b,
        a: alpha,
    }
}

export function colorToRGBA(color: string): ColorRGBA {
    if (color.indexOf('rgba') !== -1) {
        const [
            _,
            r,
            g,
            b,
            a,
        ] = /rgba\(.*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9\.]{1,})/g.exec(
            color,
        )
        return {
            r: parseInt(r),
            g: parseInt(g),
            b: parseInt(b),
            a: Math.ceil(parseFloat(a) * 255),
        }
    } else if (color.indexOf('rgb') !== -1) {
        const [
            _,
            r,
            g,
            b,
        ] = /rgb\(.*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9]{1,3})/g.exec(color)
        return {
            r: parseInt(r),
            g: parseInt(g),
            b: parseInt(b),
            a: 255,
        }
    } else if (color.indexOf('#') !== -1) {
        return hex2RGBA(color)
    } else {
        throw new Error(
            'Unsupported color format. Please use CSS rgba, rgb, or HEX!',
        )
    }
}
