// a flow is just a form that depends directly on time or another flow

function form(parent, build) {
}

const aging = form({}, ({$,$$}) => {
    const born = $$.t() // global
    return {
        age: ({_,__}) => _.t() - born
    }
})

const decaying = form(aging, ({$}) => ({
    decay: _ => 1 / _.age()
})
