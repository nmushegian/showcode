console.log('load main.js')

import '@fontsource/unifont'

import { init, _forms, form, V, tick, draw as drawform } from './form.js'

import { wand } from './wand.js'
import { wisp } from './wisp.js'

import { default as p5 } from 'p5'

new p5(p=>{

    init(p)
    globalThis.$ = {}
    $.frame = V()
    $.t = V(0)
    p.mx = $.mx = V()
    p.my = $.my = V()
    $.sh = V('')
    $.fps = V(60)
    $.p = p

    p.setup =()=> {

        $.fps(60)
        p.noCursor()

        p.createCanvas(1280, 960)
        p.angleMode(p.RADIANS)
        p.frameRate($.fps())
        p.textFont('Unifont')
        p.textSize(32)

        $.t(0)
        $.frame(p.frameCount)

        $.bg = V(()=>'darkgrey')

        globalThis.wisp = wisp
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
        $.frame(p.frameCount)
        $.t($.t() + p.deltaTime)
        $.mx(p.mouseX)
        $.my(p.mouseY)

        for (let [eid,ent] of Object.entries(_forms)) {
            tick(ent)
        }
        for (let [eid,ent] of Object.entries(_forms)) {
            drawform(ent)
        }
    }


})
