console.log('load main.js')

import '@fontsource/unifont'

import { _ents } from './ents.js'

import {default as $} from 'purestate'
globalThis.$ = $
globalThis._ = {}
const O = $

export let FPS

_.frame = $()
_.t = $()
_.mx = $()
_.my = $()
_.bpm = $(120)
_.beat = $(()=>{})
_.bar = $(()=>{})
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
    console.log(k)
    if (k.key == "ArrowUp") {
        _.bpm(_.bpm()+1)
        console.log(_.bpm())
    }
    if (k.key == "ArrowDown") {
        _.bpm(_.bpm()-1)
        console.log(_.bpm())
    }
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


import { self } from './self.js'
export const reset =()=> {
    for (const [k,v] of Object.entries(_ents)) {
        delete _ents[k]
    }
    _.self = self()
}

import { wisp } from './wisp.js'
import { link } from './link.js'
//const { stream, stop } = require('./stream')
//const { paint } = require('./paint')
//const { glif } = require('./glif')
//const { matrix } = require('./matrix')
//const { sun } = require('./sun')
window.setup =()=> {

    FPS = 60
    createCanvas(1280, 960)
    angleMode(RADIANS)
    frameRate(FPS)
    textFont('Unifont')
    textSize(32)
    cursor(CROSS)

    _.t(0)
    _.frame(frameCount)

    let bps = $(()=>(_.bpm() / 60))
    _.beat = $(() => sin(_.t() * TAU * bps() / 1000))
    _.beatframe = $(() => Math.floor(bps() * _.t() / 1000))

    _.syc = $(() => sin(TAU*_.t() / 1000))
    _.cyc = $(() => cos(TAU*_.t() / 1000))
    _.syc2 = $(()=> sin(2*TAU*_.t() / 10000))
    _.bg = $(()=>lerpColor(color('teal'), color('darkgrey'), _.syc2()))


    globalThis.wisp = wisp
    globalThis.link = link

/*
    globalThis.stream = stream
    globalThis.stop = stop

    globalThis.paint = paint


    globalThis.glif = glif


    globalThis.matrix = matrix

   // const { beat } = require('./beat')
   // globalThis.beat = beat



    globalThis.sun = sun

    globalThis.reset = reset
    reset()
*/

//    _.w = _.wisp()
}

let _firstdraw = true
window.draw =()=> {
    console.log(_.beatframe())
    if (_firstdraw) {
      console.log('firstdraw')
        _firstdraw = false
    }

    background(_.bg())
    _.frame(frameCount)
    _.t(_.t() + deltaTime)
    _.mx(mouseX)
    _.my(mouseY)
    c = 32
    text(nfp(_.bpm()),32,32)
    text(1 + _.beatframe() % 4,32,64)
    const baton = String.fromCharCode(100 + (_.beatframe()*1001)%1600)
    text(baton, 32, 96)

    for (let [eid,ent] of Object.entries(_ents)) {
        ent._tick()
    }
    for (let [eid,ent] of Object.entries(_ents)) {
        ent._draw()
    }

}


