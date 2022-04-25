import {test as t} from 'tapzero'
//const t = require('tapzero').test
//const { $, form, flow } = require('../src/form')
import { $, form, flow} from '../src/form.js'



t('form', t=>{
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
