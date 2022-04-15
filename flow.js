
// an atom is a string or bigint
// a form is a purestate that returns an atom or an object full of forms
// a flow is a lambda expressing some bindings between forms
// a face is a way to interpret a field of a form as its view function

const S = require('./purestate.js')

form =o=> {
    // onform
    let _ = {}
    Object.assign(_, o)
    for (let [k,v] of Object.entries(_)) {
        // need values are atoms or forms
        _[k] = S(() => {
            // oncopy
            return v
        })
    }
    return S(() => {
        // onread
        return o
    })
}

flow =f=> {
    // onlink
    return S(() => {
        // onflow
        const r = f()
        // onflux
        return r
    })
}

face =(o,f)=> {
    // onface
    let s = o()
    // ondraw
    return f(s)
}

const it = require('tapzero').test

it('form', t=>{
    let x = form(100n)
    let y = form(100n)
    let pt = form({ x, y })
    console.log(pt)
})

