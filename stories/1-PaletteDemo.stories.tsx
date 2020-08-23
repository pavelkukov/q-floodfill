import * as React from 'react'
import FloodFill from '../src'

const background = '#ff9999'
const stroke = '#000000'

const palette: string[] = [
    '#655151',
    '#EC7A73',
    '#F3D2C1',
    '#C5F3C1',
    '#C665DE',
    stroke,
    background,
]

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor(): string {
    const paletteOptions = palette.filter(
        (color) => color !== background && color !== stroke,
    )
    const i = getRandomInt(0, paletteOptions.length - 2)

    return paletteOptions[i]
}

function addRects(num: number, canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    let rects = num
    while (--rects) {
        const w = getRandomInt(
            Math.round(0.05 * width),
            Math.round(0.3 * width),
        )
        const h = getRandomInt(
            Math.round(0.05 * height),
            Math.round(0.3 * height),
        )
        const x = getRandomInt(0, width - w)
        const y = getRandomInt(0, height - h)

        ctx.fillStyle = getRandomColor()
        ctx.fillRect(x, y, w, h)
    }
}

function addCircles(num: number, canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    let circles = num
    while (--circles) {
        const radius = getRandomInt(
            Math.round(0.05 * height),
            Math.round(0.3 * height),
        )
        const x = getRandomInt(radius, width - radius)
        const y = getRandomInt(radius, height - radius)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = getRandomColor()
        ctx.fill()
        ctx.lineWidth = 5
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}

export default {
    title: 'q-floodfill',
}

export function PaletteDemo(): React.ReactElement {
    const canvas = React.useRef<HTMLCanvasElement>()
    const [fillColor, setFillColor] = React.useState('#333333')
    const [pixelsCount, setPixelsCount] = React.useState(0)
    const [fillTime, setFillTime] = React.useState(0)
    React.useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        const width = canvas.current.width
        const height = canvas.current.height
        ctx.fillStyle = background
        ctx.fillRect(0, 0, width, height)
        addRects(10, canvas.current)
        addCircles(10, canvas.current)
        addRects(10, canvas.current)
    }, [])
    return (
        <div>
            <div>
                <h1>q-floodfill</h1>
                <div>Using the palette option</div>
                <button
                    style={{
                        margin: '10px',
                        padding: '5px',
                    }}
                    onClick={() => {
                        const ctx = canvas.current.getContext('2d')
                        const width = canvas.current.width
                        const height = canvas.current.height
                        ctx.fillStyle = background
                        ctx.fillRect(0, 0, width, height)
                    }}
                >
                    Remove shapes from canvas
                </button>
                <button
                    style={{
                        margin: '10px',
                        padding: '5px',
                    }}
                    onClick={() => {
                        addRects(10, canvas.current)
                        addCircles(10, canvas.current)
                        addRects(10, canvas.current)
                    }}
                >
                    Add shapes
                </button>
                <label>
                    Select fill color:{' '}
                    <input
                        type="color"
                        value={fillColor}
                        onChange={(e) => {
                            setFillColor(e.target.value)
                        }}
                    />
                </label>
            </div>
            <div
                style={{
                    padding: '10px',
                    margin: '10px',
                }}
            >
                Affected pixels: {pixelsCount} / Fill time: {fillTime}ms
            </div>
            <div>
                <canvas
                    ref={canvas}
                    width={800}
                    height={660}
                    onClick={(e) => {
                        const currentTargetRect = e.currentTarget.getBoundingClientRect()
                        let eX = Math.floor(e.pageX - currentTargetRect.left)
                        eX -= e.pageX - e.clientX
                        let eY = Math.floor(e.pageY - currentTargetRect.top)
                        eY -= e.pageY - e.clientY
                        const context = canvas.current.getContext('2d')
                        const imgData = context.getImageData(
                            0,
                            0,
                            canvas.current.width,
                            canvas.current.height,
                        )
                        const start = new Date().getTime()
                        const ff = new FloodFill(imgData, { palette })
                        ff.fill(fillColor, eX, eY, 0)
                        const time = new Date().getTime() - start
                        context.putImageData(ff.imageData, 0, 0)
                        setFillTime(time)
                        setPixelsCount(ff.modifiedPixelsCount)
                    }}
                />
            </div>
        </div>
    )
}
