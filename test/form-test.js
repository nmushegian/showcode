import { test as it } from 'tapzero'
//const t = require('tapzero').test
//const { $, form, flow } = require('../src/form')
import { $, form, flow } from '../src/form.js'



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
        flows: $(()=>({
            xmove: ({_}) => {
                _.x(_.x() + 1)
            },
            ymove: ({_}) => {
                _.y(_.y() + 1)
            }
        }))
    })
    pt.flows().xmove({_:pt})
    t.equal(pt.x(), 101)
    pt.flows().xmove({_:pt})
    t.equal(pt.x(), 102)

    flow(pt)
    t.equal(pt.x(), 103)
})
