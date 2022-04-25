import { test as it } from 'tapzero'

import {default as p5} from '@mattheath/p5js-node'
import * as fs from 'fs'

import { init, draw, flow } from '../src/form.js'

import { wand } from '../src/wand.js'

it('p5 setup', ()=>{ new p5(p=>{
    init(p)
    p.setup =()=> {
        p.createCanvas(600, 400)
        p.background('white')
        p.noLoop()
    }
    it('wand', t=>{
        let w = wand()
        t.ok(w)

        w = wand({
            x: 100,
            y: 100,
        })
        w.hue('red')
        w.line('hi')

        flow(w)
        
        p.draw =()=> draw(w)
        p.redraw()

        const buff = p.canvas.toBuffer()
        fs.writeFileSync('test.png', buff)
    })
})})
