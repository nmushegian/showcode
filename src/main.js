console.log('load main.js')
//const { Ent } = require('./ent')

const glif = require('./ent/glif')

const O = require('purestate')

window.keyPressed =(k)=> {
    console.log('pressed')
    if (k.key == "Enter") {
        let c = sh()
        sh("")
        glowbox(mouseX+64,mouseY,c)
        cmd(c)
    } else if (k.key == "Backspace") {
        let s = sh()
        sh(s.slice(0, s.length-1))
    } else {
        if (k.key.length == 1) {
            sh(sh() + k.key)
        }
    }
}

export let _ents = {}
export let FPS
export let frame
export let t
export let bg
export let syc
export let cyc
export let mx
export let my
export let c
export let ch = O("")
export let sh = O("")

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


