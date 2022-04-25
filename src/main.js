console.log('load main.js')

import '@fontsource/unifont'

import { init, _forms, form, $, tick, draw as drawform } from './form.js'

import { wand } from './wand.js'

globalThis.$ = $
globalThis._ = {}


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
_.fps = $(60)

_.cmd =s=> {
    console.log(s)
    let x = eval(s)
    console.log(s)
}

_.self = wand({x: _.mx, y: _.my})


window.mouseWheel =e=> {
    const neu = _.self.r() - e.delta / 10
    _.self.r(neu > 10 ? neu : 10)
}

window.keyPressed =(k)=> {
    if (k.key == "ArrowUp") {
        _.bpm(_.bpm()+1)
    }
    if (k.key == "ArrowDown") {
        _.bpm(_.bpm()-1)
    }
    if (k.key == "Enter") {
        let c = _.self.line()
        try {
            let res = _.cmd(c)
            console.log(res)
            _.self.line("")
        } catch (e) {
            console.log(e)
            _.self.hue('red')
            setTimeout(()=>{_.self.hue('black')}, 100)
        }
    } else if (k.key == "Backspace") {
        _.self.line(_.self.line().slice(0, _.self.line().length-1))
    } else {
        if (k.key.length == 1) {
            _.self.line(_.self.line() + k.key)
        }
    }
}

window.keyReleased =k=> {
}


import { self } from './self.js'
export const reset =()=> {
    for (const [k,v] of Object.entries(_forms)) {
        delete _forms[k]
    }
    _.self = wand({x:_.mx,y:_.my})
}

import { wisp } from './wisp.js'
//import { link } from './link.js'
//const { stream, stop } = require('./stream')
//const { paint } = require('./paint')
//const { glif } = require('./glif')
//const { matrix } = require('./matrix')
//const { sun } = require('./sun')
window.setup =()=> {
    noCursor()
    init(globalThis)
    _.fps(60)
    createCanvas(1280, 960)
    angleMode(RADIANS)
    frameRate(_.fps())
    textFont('Unifont')
    textSize(32)

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
    text(nfp(_.bpm()),32,32)
    text(1 + _.beatframe() % 4,32,64)
    const baton = String.fromCharCode(100 + (_.beatframe()*1001)%1600)
    text(baton, 32, 96)

    for (let [eid,ent] of Object.entries(_forms)) {
        tick(ent)
    }
    for (let [eid,ent] of Object.entries(_forms)) {
        drawform(ent)
    }
}


