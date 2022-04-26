console.log('load main.js')

import '@fontsource/unifont'

import { init, _forms, form, V, tick, draw as drawform } from './form.js'

import { wand } from './wand.js'
import { wisp } from './wisp.js'

import {default as p5} from 'p5'

new p5(p=>{
    init(p)
    globalThis.$ = {}
    $.frame = V()
    $.t = V(0)
    p.mx = $.mx = V()
    p.my = $.my = V()
    $.bpm = V(120)
    $.beat = V(()=>{})
    $.bar = V(()=>{})
    $.syc = V(()=>{})
    $.cyc = V(()=>{})
    $.sh = V('')
    $.fps = V(60)
    $.p = p

    p.setup =()=> {
        p.noCursor()
        $.fps(60)
        p.createCanvas(1280, 960)
        p.angleMode(p.RADIANS)
        p.frameRate($.fps())
        p.textFont('Unifont')
        p.textSize(32)

        $.t(0)
        $.frame(p.frameCount)

        let bps = V(()=>($.bpm() / 60))
        $.beat = V(() => p.sin($.t() * p.TAU * bps() / 1000))
        $.beatframe = V(() => Math.floor(bps() * $.t() / 1000))

        $.syc = V(() => p.sin(p.TAU*$.t() / 1000))
        $.cyc = V(() => p.cos(p.TAU*$.t() / 1000))
        $.syc2 = V(()=> p.sin(2*p.TAU*$.t() / 10000))
        $.bg = V('darkgrey')//()=>p.lerpColor(p.color('teal'), p.color('darkgrey'), _.syc2()))

        globalThis.wisp = wisp

        const cl = p.color('black')
        for (let x = 0; x < p.width; x+=32) {
            for (let y = 0; y < p.height; y+=32) {
                let l = form($=>({
                    x1: x,
                    y1: y,
                    x2: x+32,
                    y2: y,
                    x3: x,
                    y3: y+32,
                    _draw: ({$,_}) => {
                        let d = $.dist(_.x1(), _.y1(), $.mx()+self.r()+64, $.my())
                        cl.setAlpha(255/(d/30))
                        $.stroke(cl)
                        $.noFill()
                        $.curveTightness(1.1)
                        $.line(
                            _.x1(), _.y1(),
                            _.x2(), _.y2(),
                        )
                        $.line(
                            _.x1(), _.y1(),
                            _.x3(), _.y3(),
                        )
                    }
                }))
            }
        }

        globalThis.self = $.self = wand({x: $.mx, y: $.my})
        $.cmd =s=> {
            let x = eval(s)
            return x
        }

    }

    p.mouseWheel =e=> {
        const neu = $.self.r() - e.delta / 10
        $.self.r(neu > 16 ? neu : 16)
    }

    p.keyPressed =(k)=> {

        if (k.key == "Enter") {
            let c = $.self.line()
            try {
                console.log(c)
                let res = $.cmd(c)
                console.log(res)
                $.self.line("")
            } catch (e) {
                console.log(e)
                $.self.hue('red')
                setTimeout(()=>{$.self.hue('black')}, 100)
            }
        } else if (k.key == "Backspace") {
            $.self.line($.self.line().slice(0, $.self.line().length-1))
        } else {

            if (k.key == "ArrowUp") {
                $.bpm($.bpm()+1)
            }
            if (k.key == "ArrowDown") {
                $.bpm($.bpm()-1)
            }
            if (k.key.length == 1) {
                form($=>({
                    x: $.mx(),
                    y: $.my(),
                    s: ()=>10,
                    hue: ()=>$.color($.random(200), $.random(200), $.random(200)),
                    _tick: ({_})=>{
                        _.y(_.y()-_.s())
                        _.x(_.x()+$.random(_.s())-_.s()/2)
                    },
                    _draw: ({$,_})=>{
                        $.fill('white')
                        $.stroke(_.hue())
                        $.strokeWeight(2)
                        $.text(k.key, _.x(), _.y())
                    }
                }))
                $.self.line($.self.line() + k.key)
            }
        }
    }

    p.keyReleased =k=> {
    }



    let _firstdraw = true
    p.draw =()=> {
        if (_firstdraw) {
            console.log('firstdraw')
            _firstdraw = false
        }

        p.background($.bg())
        p.text("\u0100",0,32)
        $.frame(p.frameCount)
        $.t($.t() + p.deltaTime)
        $.mx(p.mouseX)
        $.my(p.mouseY)
        p.text(p.nfp($.bpm()),32,32)
        p.text(1 + $.beatframe() % 4,32,64)
        const baton = String.fromCharCode(100 + ($.beatframe()*1001)%1600)
        p.text(baton, 32, 96)


        for (let [eid,ent] of Object.entries(_forms)) {
            tick(ent)
        }
        for (let [eid,ent] of Object.entries(_forms)) {
            drawform(ent)
        }
    }


})
