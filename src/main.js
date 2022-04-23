console.log('load main.js')

require('@fontsource/unifont')

const { _ents } = require('./ents')

globalThis.$ = require('purestate')
globalThis._ = {}
const O = $

export let FPS
_.bg = $()
_.frame = $()
_.t = $()
_.mx = $()
_.my = $()
_.syc = $(()=>{})
_.cyc = $(()=>{})
_.sh = $('')

_.cmd =s=> {
    console.log(s)
    let x = eval(s)
    console.log(s)
}

export let c = 32
export let ch =s=> { let _c = c; text(s, _c, 64); _c+=32; c+=32 }

window.keyPressed =(k)=> {
    if (k.key == "Enter") {
        let c = _.sh()
        _.sh("")
        _.cmd(c)
    } else if (k.key == "Backspace") {
        let s = _.sh()
        _.sh(s.slice(0, s.length-1))
    } else {
        if (k.key.length == 1) {
            _.sh(_.sh() + k.key)
        }
    }
}

window.keyReleased =k=> {
    console.log('released')
}


const { self } = require('./self')
export const reset =()=> {
    for (const [k,v] of Object.entries(_ents)) {
        delete _ents[k]
    }
    _.self = self()
}

window.setup =()=> {
    FPS = 60
    createCanvas(1280, 960)
    angleMode(RADIANS)
    frameRate(FPS)
    textFont('Unifont')
    textSize(32)
    cursor(CROSS)

    _.t(0)
    _.bg('pink')
    _.frame(frameCount)
    _.syc = $(() => sin(TAU*_.t() / 1000))
    _.cyc = $(() => cos(TAU*_.t() / 1000))
    _.syc2 = $(()=> sin(2*TAU*_.t() / 10000))

    const { wisp } = require('./wisp')
    const { link } = require('./link')
    globalThis.wisp = wisp
    globalThis.link = link

    const { stream, stop } = require('./stream')
    globalThis.stream = stream
    globalThis.stop = stop
    const { paint } = require('./paint')
    globalThis.paint = paint

    const { glif } = require('./glif')
    globalThis.glif = glif

    const { matrix } = require('./matrix')
    globalThis.matrix = matrix

    globalThis.reset = reset
    reset()


//    _.w = _.wisp()
}


let _firstdraw = true
window.draw =()=> {
    if (_firstdraw) {
      console.log('firstdraw')
        _firstdraw = false
    }
    background(lerpColor(color('pink'), color('lightgrey'), _.syc2()))
    _.frame(frameCount)
    _.t(_.t() + deltaTime)
    _.mx(mouseX)
    _.my(mouseY)
    c = 32
    ch("\u0F06")
    ch("\u0F3A")
    text(nfp(_.syc(), 2, 4), 32, 32)

    for (let [eid,ent] of Object.entries(_ents)) {
        ent._tick()
    }
    for (let [eid,ent] of Object.entries(_ents)) {
        ent._draw()
    }

}


