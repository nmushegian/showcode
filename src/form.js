import { default as $ } from 'purestate'
export { $ }

export let _forms = {}
export let _formc = 0

export function form(o={}) {
    let _form = {
        _flows: {},
        _id: _formc,
    }
    console.log('forming')
    for (const [k,v] of Object.entries(o)) {
        if (typeof(v) == 'function' && v.depended_by) { // hack, sentinel value
            console.log('its a purestate')
            _form[k] = v
        } else if (typeof(v) == 'function') {
            console.log('its a plain function')
            _form[k] = $(v)
        } else {
            _form[k] = $(v)
        }
    }
    _forms[_formc] = _form
    _formc++
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


