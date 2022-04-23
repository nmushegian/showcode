const { form, orb, O } = require('./ent')
const font = require('@fontsource/unifont')

console.log('src.js')

window.onload =()=>{

view =x=> {
    let s = ""
    let o = {}
    for (let k of Object.keys(x)) {
        if (k[0] != "_") {
            o[k] = x[k]()
        }
    }
    for (let [k,v] of Object.entries(o)) {
        s += `${k}:${nfp(v,4,2)}\n`
    }
    return s
}

cmd =s=>{
    console.log(s)
    let x = eval(s)
    console.log(x)
}

    see =s=> JSON.stringify(s, null, 2)

_ = {}


    glowbox =(x,y,t)=> {let g = form({
        t,
        x,
        y,
        age: O(2)
    }).tick(()=>{
        g.age(g.age()+1)
    }).draw(()=>{
        push()
          grey = 255/(g.age()/2)
          fill(color(255,255,255,grey))
          stroke(color(255,255,255,grey))
          text(t, x, y)
        pop()
    }); return g}



