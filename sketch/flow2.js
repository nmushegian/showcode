const $ = require('purestate')
/*
const form =f=> {
  return () => {
    return o.map(v=>$(()=>v))
  }
}

const form=f=>o=>f(o).map(r=>$(()=>r))

const wisp = form(({}=i)=>({
    x: _ => _.x() + _.dx()
  , y: _ => _.y() + _.dy()
  , dx: i.dx ?? 0
  , dy: i.dy ?? 0
})).flow(t=>{
})

const wisp2 = form( o=> {
    // constants
    return {
        x: _=> o.x ?? 0
      , y: _=> o.y ?? 0
      , dx: _=> o.dx ?? 0
      , dy: _=> o.dy ?? 0
    }
})
.flow(_=> {
    _.x(_.x() + _.dx())
})


x = wisp()

x = wisp({x:50})

x = wisp({x: 50, y:50}).flow(w=>w.x(w.x()+1))

const wisp =({x=100}=o)=> {
}

*/


const form =o=> {
    const _forms = {}
    for (const [k,v] of Object.entries(o)) {
        if (typeof(v) == 'function' && v.depended_by) { // hack, sentinel value
            _forms[k] = v
        } else if (typeof(v) == 'function') {
            _forms[k] = $(v)
        } else {
            _forms[k] = $(()=> v)
        }
    }
    return _forms
}


const pair = form({
  x: 100
, y: ()=>100
, z: $(()=>100)
, flow: {
    xmove: _=> { _.x(_.x() + 1) }
  , ymove: _=> { _.y(_.y() + 1) }
  }
})

console.log(pair.x())
console.log(pair.y())
console.log(pair.z())

const wisp =({
    x=100,
    y=100,
    dx=0.1,
    dy=0.1
}=o={})=> form({
    x, y, dx, dy,
    flow: {
        xmove: _=> { _.x(_.x() + _.dx()) }
     ,  ymove: _=> { _.y(_.y() + _.dy()) }
    }
})

console.log(wisp())

/*
let form = {
    _forms: {},
    _flows: {},
}

class Form {
    let _form = {}
    let _flows = {}
}
*/















