import { test as it } from 'tapzero'
import { $, form, flow, draw, init } from '../src/form.js'
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
        let pt = form()
        t.ok(pt)

        pt = form({
            x: 1,
            y: ()=>2,
            z: $(()=>3)
        })
        t.equal(1, pt.x())
        t.equal(2, pt.y())
        t.equal(3, pt.z())

        let below = form({
            x: pt.x,
            y: _ => pt.y() + 100
        })

        t.equal(below.y(), 102)

        pt.y(200)
        t.equal(below.y(), 300)
    })

    it('flow', t=> {
        let pt =
            form({
                x: 100,
                y: 100,
                flows: {
                    xmove: ({_}) => {
                        _.x(_.x() + 1)
                    },
                    ymove: ({_}) => {
                        _.y(_.y() + 1)
                    }
                },
                faces: {
                    p5: ({$,_}) => {
                        $.fill('black')
                        $.strokeWeight(10)
                        $.stroke('black')
                        $.point(_.x(), _.y())
                    },
                    svg: ({svg,_}) => {}
                }
            })
        pt.flows().xmove({_:pt})
        t.equal(pt.x(), 101)
        pt.flows().xmove({_:pt})
        t.equal(pt.x(), 102)

        flow(pt)
        t.equal(pt.x(), 103)

        P.draw =()=> draw(pt)
        P.redraw()

        const buff = P.canvas.toBuffer()
        fs.writeFileSync('test.png', buff)
    })

})})
