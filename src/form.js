//import { default as p5 } from '@mattheath/p5js-node'
//console.log(p5)
import { default as $ } from 'purestate'
export { $ }

export let _forms = {}
export let _formc = 0

export function form(o={}) {
    if (o._id) throw new Error(`panic: obj already has _id: ${o}`)
    let _form = {
        _flows: {},
        _id: _formc++,
    }
    for (const [k,v] of Object.entries(o)) {
        if (typeof(v) == 'function' && v.depended_by) { // hack, sentinel value
            _form[k] = v
        } else {
            _form[k] = $(v)
        }
    }
    _forms[_formc] = _form
    return _form
}

export function flow(o) {
    if (!o.flows()) throw new Error(`object has no flows: ${o}`)
    const flows = o.flows()
    for (const [k, v] of Object.entries(o)) {
        if (v.flows) flow(v)
    }
    for (const [k, f] of Object.entries(flows)) {
        f({_:o})
    }
}

export function draw(o) {
    if (!o.faces) throw new Error(`object has no faces: ${o}`)
    const kids = {}
    const faces = o.faces()
    for (const [k, v] of Object.entries(o)) {
        const kids = {}
        if (v.faces) {
            kids[k] = draw(v)
        }
    }
    faces.p5({$:globalThis, _:o, kids})
}

