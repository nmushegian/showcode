import {default as $} from 'purestate'
export {$}

export let _forms = {}
export let _formc = 0

export const form =o=> {
    let _form = {}
    console.log('forming')
    for (const [k,v] of Object.entries(o ?? {})) {
        if (typeof(v) == 'function' && v.depended_by) { // hack, sentinel value
            console.log('its a purestate')
            _form[k] = v
        } else if (typeof(v) == 'function') {
            console.log('its a plain function')
            _form[k] = $(v)
        } else {
            _form[k] = $(()=> v)
        }
    }
    _forms[_formc] = _form
    _formc++
    return _form
}

export let _flows = {}
export const flow =(o,f)=> {
    console.log('building flow')
    return form({
        flow: ()=>()=>f(o)
    })
}

export const flowall =()=> {
    for (const [name,form] of Object.entries(_forms)) {
        if (!form.flow) continue
        for (const [fname,flow] of Object.entries(form.flow)) {
            flow(form)
        }
    }
}

