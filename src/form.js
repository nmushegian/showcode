import { default as $ } from 'purestate'
export { $ }

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
        console.log(k,v)
        if (k[0] == '_') {
            console.log('direct assign prop', k)
            _form[k] = v
        } else if (typeof(v) == 'function' && v.depended_by) { // hack, sentinel value
            _form[k] = v
        } else {
            _form[k] = $(v)
        }
    }
    _forms[_formc] = _form
    return _form
}

export function draw(o) {
    console.log('drawing')
    if (o._draw) {
        console.log('has a _draw')
        _p5.push()
        o._draw({$:_p5, _:o})
        _p5.pop()
    }
}

