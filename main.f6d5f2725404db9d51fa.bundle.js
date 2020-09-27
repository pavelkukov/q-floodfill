(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{304:function(module,exports,__webpack_require__){__webpack_require__(305),__webpack_require__(451),module.exports=__webpack_require__(452)},369:function(module,exports){},452:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(303);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(696)],module)}.call(this,__webpack_require__(453)(module))},696:function(module,exports,__webpack_require__){var map={"./0-CanvasDemo.stories.tsx":697};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=696},697:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"CanvasDemo",(function(){return CanvasDemo}));var react=__webpack_require__(8);function getColorAtPixel(imageData,x,y){var width=imageData.width,data=imageData.data,startPos=4*(y*width+x);if(void 0===data[startPos+3])throw new Error("Invalid pixel coordinates: x="+x+"; y="+y);return{r:data[startPos],g:data[startPos+1],b:data[startPos+2],a:data[startPos+3]}}function setColorAtPixel(imageData,color,x,y){var width=imageData.width,data=imageData.data,startPos=4*(y*width+x);if(void 0===data[startPos+3])throw new Error("Invalid pixel coordinates. Cannot set color at: x="+x+"; y="+y);data[startPos+0]=255&color.r,data[startPos+1]=255&color.g,data[startPos+2]=255&color.b,data[startPos+3]=255&color.a}function isSameColor(a,b,tolerance){return void 0===tolerance&&(tolerance=0),!(Math.abs(a.r-b.r)>tolerance||Math.abs(a.g-b.g)>tolerance||Math.abs(a.b-b.b)>tolerance||Math.abs(a.a-b.a)>tolerance)}function colorToRGBA(color){if(-1!==color.indexOf("rgba")){var _a=/rgba\(.*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9\.]{1,})/g.exec(color),r=(_a[0],_a[1]),g=_a[2],b=_a[3],a=_a[4];return{r:parseInt(r),g:parseInt(g),b:parseInt(b),a:Math.ceil(255*parseFloat(a))}}if(-1!==color.indexOf("rgb")){var _b=/rgb\(.*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9]{1,3})/g.exec(color);_b[0],r=_b[1],g=_b[2],b=_b[3];return{r:parseInt(r),g:parseInt(g),b:parseInt(b),a:255}}if(-1!==color.indexOf("#"))return function hex2RGBA(hex,alpha){void 0===alpha&&(alpha=255);var parsedHex=hex;if(0===hex.indexOf("#")&&(parsedHex=hex.slice(1)),3===parsedHex.length&&(parsedHex=parsedHex[0]+parsedHex[0]+parsedHex[1]+parsedHex[1]+parsedHex[2]+parsedHex[2]),6!==parsedHex.length)throw new Error("Invalid HEX color "+parsedHex+".");return{r:parseInt(parsedHex.slice(0,2),16),g:parseInt(parsedHex.slice(2,4),16),b:parseInt(parsedHex.slice(4,6),16),a:alpha}}(color);throw new Error("Unsupported color format. Please use CSS rgba, rgb, or HEX!")}var src=function(){function FloodFill(imageData){this.collectModifiedPixels=!1,this.modifiedPixelsCount=0,this.modifiedPixels=new Set,this._tolerance=0,this._queue=[],this.imageData=imageData,this.isSameColor=isSameColor,this.setColorAtPixel=setColorAtPixel,this.getColorAtPixel=getColorAtPixel,this.colorToRGBA=colorToRGBA}return FloodFill.prototype.fill=function(color,x,y,tolerance){this._newColor=this.colorToRGBA(color),this._replacedColor=this.getColorAtPixel(this.imageData,x,y),this._tolerance=tolerance,this.isSameColor(this._replacedColor,this._newColor,this._tolerance)||(this.addToQueue([x,x,y,-1]),this.fillQueue())},FloodFill.prototype.addToQueue=function(line){this._queue.push(line)},FloodFill.prototype.popFromQueue=function(){return this._queue.length?this._queue.pop():null},FloodFill.prototype.isValidTarget=function(pixel){if(null!==pixel){var pixelColor=this.getColorAtPixel(this.imageData,pixel.x,pixel.y);return this.isSameColor(this._replacedColor,pixelColor,this._tolerance)}},FloodFill.prototype.fillLineAt=function(x,y){if(!this.isValidTarget({x:x,y:y}))return[-1,-1];this.setPixelColor(this._newColor,{x:x,y:y});for(var minX=x,maxX=x,px=this.getPixelNeighbour("left",minX,y);px&&this.isValidTarget(px);)this.setPixelColor(this._newColor,px),minX=px.x,px=this.getPixelNeighbour("left",minX,y);for(px=this.getPixelNeighbour("right",maxX,y);px&&this.isValidTarget(px);)this.setPixelColor(this._newColor,px),maxX=px.x,px=this.getPixelNeighbour("right",maxX,y);return[minX,maxX]},FloodFill.prototype.fillQueue=function(){for(var line=this.popFromQueue();line;){for(var start=line[0],end=line[1],y=line[2],parentY=line[3],currX=start;-1!==currX&&currX<=end;){var _a=this.fillLineAt(currX,y),lineStart=_a[0],lineEnd=_a[1];-1!==lineStart&&(lineStart>=start&&lineEnd<=end&&-1!==parentY?(parentY<y&&y+1<this.imageData.height&&this.addToQueue([lineStart,lineEnd,y+1,y]),parentY>y&&y>0&&this.addToQueue([lineStart,lineEnd,y-1,y])):(y>0&&this.addToQueue([lineStart,lineEnd,y-1,y]),y+1<this.imageData.height&&this.addToQueue([lineStart,lineEnd,y+1,y]))),-1===lineEnd&&currX<=end?currX+=1:currX=lineEnd+1}line=this.popFromQueue()}},FloodFill.prototype.setPixelColor=function(color,pixel){this.setColorAtPixel(this.imageData,color,pixel.x,pixel.y),this.modifiedPixelsCount++,this.collectModifiedPixels&&this.modifiedPixels.add(pixel.x+"|"+pixel.y)},FloodFill.prototype.getPixelNeighbour=function(direction,x,y){var coords;switch(x|=0,y|=0,direction){case"right":coords={x:x+1|0,y:y};break;case"left":coords={x:x-1|0,y:y}}return coords.x>=0&&coords.x<this.imageData.width?coords:null},FloodFill}();function getRandomInt(min,max){return min=Math.ceil(min),max=Math.floor(max),Math.floor(Math.random()*(max-min+1))+min}function addRects(num,canvas){for(var ctx=canvas.getContext("2d"),width=canvas.width,height=canvas.height,rects=num;--rects;){var w=getRandomInt(Math.round(.05*width),Math.round(.3*width)),h=getRandomInt(Math.round(.05*height),Math.round(.3*height)),x=getRandomInt(0,width-w),y=getRandomInt(0,height-h),r=getRandomInt(0,255),g=getRandomInt(0,255),b=getRandomInt(0,255);ctx.fillStyle="rgb("+r+", "+g+", "+b+")",ctx.fillRect(x,y,w,h)}}function addCircles(num,canvas){for(var ctx=canvas.getContext("2d"),width=canvas.width,height=canvas.height,circles=num;--circles;){var radius=getRandomInt(Math.round(.05*height),Math.round(.3*height)),x=getRandomInt(radius,width-radius),y=getRandomInt(radius,height-radius),r=getRandomInt(0,255),g=getRandomInt(0,255),b=getRandomInt(0,255);ctx.beginPath(),ctx.arc(x,y,radius,0,2*Math.PI,!1),ctx.fillStyle="rgb("+r+", "+g+", "+b+")",ctx.fill(),ctx.lineWidth=5,ctx.strokeStyle="#000",ctx.stroke()}}__webpack_exports__.default={title:"q-floodfill"};function CanvasDemo(){var canvas=react.useRef(),_a=react.useState("#333333"),fillColor=_a[0],setFillColor=_a[1],_b=react.useState(0),pixelsCount=_b[0],setPixelsCount=_b[1],_c=react.useState(0),fillTime=_c[0],setFillTime=_c[1];return react.useEffect((function(){var ctx=canvas.current.getContext("2d"),width=canvas.current.width,height=canvas.current.height;ctx.fillStyle="#f99",ctx.fillRect(0,0,width,height),addRects(10,canvas.current),addCircles(10,canvas.current),addRects(10,canvas.current)}),[]),react.createElement("div",null,react.createElement("div",null,react.createElement("h1",null,"q-floodfill"),react.createElement("div",null,"Click on canvas to see it in action!"),react.createElement("button",{style:{margin:"10px",padding:"5px"},onClick:function(){var ctx=canvas.current.getContext("2d"),width=canvas.current.width,height=canvas.current.height;ctx.fillStyle="#f99",ctx.fillRect(0,0,width,height)}},"Remove shapes from canvas"),react.createElement("button",{style:{margin:"10px",padding:"5px"},onClick:function(){addRects(10,canvas.current),addCircles(10,canvas.current),addRects(10,canvas.current)}},"Add shapes"),react.createElement("label",null,"Select fill color:"," ",react.createElement("input",{type:"color",value:fillColor,onChange:function(e){setFillColor(e.target.value)}}))),react.createElement("div",{style:{padding:"10px",margin:"10px"}},"Affected pixels: ",pixelsCount," / Fill time: ",fillTime,"ms"),react.createElement("div",null,react.createElement("canvas",{ref:canvas,width:800,height:660,onClick:function(e){var currentTargetRect=e.currentTarget.getBoundingClientRect(),eX=Math.floor(e.pageX-currentTargetRect.left);eX-=e.pageX-e.clientX;var eY=Math.floor(e.pageY-currentTargetRect.top);eY-=e.pageY-e.clientY;var context=canvas.current.getContext("2d"),imgData=context.getImageData(0,0,canvas.current.width,canvas.current.height),start=(new Date).getTime(),ff=new src(imgData);ff.fill(fillColor,eX,eY,0);var time=(new Date).getTime()-start;context.putImageData(ff.imageData,0,0),setFillTime(time),setPixelsCount(ff.modifiedPixelsCount)}})))}}},[[304,1,2]]]);
//# sourceMappingURL=main.f6d5f2725404db9d51fa.bundle.js.map