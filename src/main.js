console.log('load main.js')

require('@fontsource/unifont')

globalThis.$ = require('purestate')
globalThis._ = {}
const O = $

export let _ents = {}
export let FPS
export let frame
export let t
export let bg
export let syc
export let cyc
export let mx
export let my

export let sh = O("")

_.cmd =s=> {
    console.log(s)
    let x = eval(s)
    console.log(s)
}

export let c = 32
export let ch =s=> { let _c = c; text(s, _c, 64); _c+=32; c+=32 }

window.keyPressed =(k)=> {
    if (k.key == "Enter") {
        let c = sh()
        sh("")
        _.cmd(c)
    } else if (k.key == "Backspace") {
        let s = sh()
        sh(s.slice(0, s.length-1))
    } else {
        if (k.key.length == 1) {
            sh(sh() + k.key)
        }
    }
}

window.keyReleased =k=> {
    console.log('released')
}


window.setup =()=> {
    FPS = 60
    createCanvas(1280, 960)
    angleMode(RADIANS)
    frameRate(FPS)
    textFont('Unifont')
    textSize(32)

    fill('white')
    stroke('white')

    frame = O(0)
    t = O(0)
    bg = O('pink')
    syc = O(() => sin(TAU*t() / 1000))
    cyc = O(() => cos(TAU*t() / 1000))
    mx = O(mouseX)
    my = O(mouseY)

}

let _firstdraw = true
window.draw =()=> {
    if (_firstdraw) {
      console.log('firstdraw')
        _firstdraw = false
    }
    background(bg())
    frame(frameCount)
    t(t() + deltaTime)
    mx(mouseX)
    my(mouseY)
    c = 32
    ch("\u0F06")
    ch("\u0F3A")
    text(nfp(syc(), 2, 4), 32, 32)

    for (let [eid,ent] of Object.entries(_ents)) {
        ent._tick()
    }
    for (let [eid,ent] of Object.entries(_ents)) {
        ent._draw()
    }

}


