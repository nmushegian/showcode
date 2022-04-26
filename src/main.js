console.log('load main.js')

import '@fontsource/unifont'

import { init, _forms, form, V, tick, draw as drawform } from './form.js'

import { wand } from './wand.js'
import { wisp } from './wisp.js'

import {default as p5} from 'p5'

new p5(p=>{
    init(p)
    globalThis._ = {}
    _.frame = V()
    _.t = V(0)
    p.mx = _.mx = V()
    p.my = _.my = V()
    _.bpm = V(120)
    _.beat = V(()=>{})
    _.bar = V(()=>{})
    _.syc = V(()=>{})
    _.cyc = V(()=>{})
    _.sh = V('')
    _.fps = V(60)
    _.p = p

    _.cmd =s=> {
        const test = 'hello'
        let x = eval(s)
        return x
    }

    _.self = wand({x: _.mx, y: _.my})

    p.mouseWheel =e=> {
        const neu = _.self.r() - e.delta / 10
        _.self.r(neu > 16 ? neu : 16)
    }

    p.keyPressed =(k)=> {
        if (k.key == "ArrowUp") {
            _.bpm(_.bpm()+1)
        }
        if (k.key == "ArrowDown") {
            _.bpm(_.bpm()-1)
        }
        if (k.key == "Enter") {
            let c = _.self.line()
            try {
                console.log(c)
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

    p.keyReleased =k=> {
    }

    p.setup =()=> {
        p.noCursor()
        _.fps(60)
        p.createCanvas(1280, 960)
        p.angleMode(p.RADIANS)
        p.frameRate(_.fps())
        p.textFont('Unifont')
        p.textSize(32)

        _.t(0)
        _.frame(p.frameCount)

        let bps = V(()=>(_.bpm() / 60))
        _.beat = V(() => p.sin(_.t() * p.TAU * bps() / 1000))
        _.beatframe = V(() => Math.floor(bps() * _.t() / 1000))

        _.syc = V(() => p.sin(p.TAU*_.t() / 1000))
        _.cyc = V(() => p.cos(p.TAU*_.t() / 1000))
        _.syc2 = V(()=> p.sin(2*p.TAU*_.t() / 10000))
        _.bg = V(()=>p.lerpColor(p.color('teal'), p.color('darkgrey'), _.syc2()))

        globalThis.wisp = wisp
    }

    let _firstdraw = true
    p.draw =()=> {
        if (_firstdraw) {
            console.log('firstdraw')
            _firstdraw = false
        }

        p.background(_.bg())
        _.frame(p.frameCount)
        _.t(_.t() + p.deltaTime)
        _.mx(p.mouseX)
        _.my(p.mouseY)
        p.text(p.nfp(_.bpm()),32,32)
        p.text(1 + _.beatframe() % 4,32,64)
        const baton = String.fromCharCode(100 + (_.beatframe()*1001)%1600)
        p.text(baton, 32, 96)

        for (let [eid,ent] of Object.entries(_forms)) {
            tick(ent)
        }
        for (let [eid,ent] of Object.entries(_forms)) {
            drawform(ent)
        }
    }


})
