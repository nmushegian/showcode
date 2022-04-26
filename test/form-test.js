import { test as it } from 'tapzero'
import { form, V, init } from '../src/form.js'
import {default as p5} from '@mattheath/p5js-node'
import * as fs from 'fs'

it('init, form, flow, draw', ()=> { new p5(P=>{
    init(P)

    P.setup =()=>{
        P.createCanvas(600,400)
        P.background('white')
        P.noLoop()
    }
    it('form', t=>{
        let pt = form($=>({
            x: 1,
            y: ()=>2,
            z: V(()=>3)
        }))
        t.equal(1, pt.x())
        t.equal(2, pt.y())
        t.equal(3, pt.z())

        let below = form($=>({
            x: pt.x,
            y: _ => pt.y() + 100
        }))

        t.equal(below.y(), 102)

        pt.y(200)
        t.equal(below.y(), 300)
    })

})})
