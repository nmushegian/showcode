import {default as $} from 'purestate'
export {$}

export let _forms = {}
export let _formc = 0

export const form =o=> {
    let _form = {}
    console.log('input o', o)
    for (const [k,v] of Object.entries(o ?? {})) {
        console.log(k, v)
        if (typeof(v) == 'function' && v.depended_by) { // hack, sentinel value
            _form[k] = v
        } else if (typeof(v) == 'function') {
            _form[k] = $(v)
        } else {
            _form[k] = $(()=> v)
        }
    }
    _forms[_formc] = _form
    _formc++
    console.log('returning', _form)
    return _form
}

export let _flows = undefined
export const flow =()=> {
    for (const [name,form] of Object.entries(_forms)) {
        if (!form.flow) continue
        for (const [fname,flow] of Object.entries(form.flow)) {
            flow(form)
        }
    }
}

