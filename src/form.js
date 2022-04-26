import { default as V } from 'purestate'
export { V }

export let _forms = {}
export let _formc = 0

export let _p5 = undefined

export function init(p5) {
    _p5 = p5
}

export function form(o={}) {
    if (o._id) throw new Error(`panic: obj already has _id: ${o}`)
    let _form = {
        _id: _formc++,
    }
    for (const [k,v] of Object.entries(o)) {
        if (k[0] == '_') {
            _form[k] = v
        } else if (typeof(v) == 'function' && v.depended_by) { // hack, sentinel value
            _form[k] = v
        } else {
            _form[k] = V(v)
        }
    }
    _forms[_formc] = _form
    return _form
}

export function tick(o) {
    if (o._tick) {
        o._tick({$:_p5, _:o})
    }
}
export function draw(o) {
    if (o._draw) {
        _p5.push()
        o._draw({$:_p5, _:o})
        _p5.pop()
    }
}

