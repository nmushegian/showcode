const { form, orb, O } = require('./ent')
const font = require('@fontsource/unifont')

console.log('src.js')

window.onload =()=>{

c = 32
ch =s=> { let _c = c; text(s, _c, 64); _c+=32; c+=32 }

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

sh = O("")

cmd =s=>{
    console.log(s)
    let x = eval(s)
    console.log(x)
}
see =s=> JSON.stringify(s, null, 2)

    console.log('onload')
    console.log(globalThis)
    globalThis.x = "test"
    console.log(globalThis.x)
_ = {}


    anim = {
    }

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

    glowbox(100,100, 'testtesttest')

const c = form({
    x: O(mouseX),
    y: O(mouseY),
    buff: O(()=>sh()),
    hue: O(()=>color(255*syc(), 255*cyc(), 255-(syc())))
}).tick(() => {
    c.x( mouseX )
    c.y( mouseY )
}).draw(() => {
    push()
    fill(c.hue())
    stroke(c.hue())
    text("\u2609 ", c.x()+32, c.y())
    text(c.buff(), c.x()+64, c.y())
    pop()
})
self = c

wisp =args=> {
    let w = form({
        x: O((args && args.x) ?? mx()),
        y: O((args && args.y) ?? my()),
        dx: O(0),
        dy: O(0),
        hue: O('white')
    }).tick(() => {
        w.x(w.x() + w.dx())
        w.y(w.y() + w.dy())
        w.dx(w.dx() + (random() - 1/2)/50)
        w.dy(w.dy() + (random() - 1/2)/50)
    }).draw(() => {
        push()
        translate(w.x(), w.y());
        for (let i = 0; i < 60; i++) {
            rotate(TAU / 60);
            stroke(w.hue());
            let d = abs(floor(randomGaussian(0, 15)));
            line(0, 0, d, 0);
        }
        pop()
    })
    return w
}

    link =(a,b)=> {
    let l = form({
      x1: O(()=>a.x()),
      y1: O(()=>a.y()),
      x2: O(()=>b.x()),
      y2: O(()=>b.y()),
      hue: O('white')
    }).tick(()=>{
    }).draw(()=>{
        push()
        stroke(l.hue())
        line(l.x1(), l.y1(), l.x2(), l.y2())
        pop()
    })
    return l
}

let interval
stream =f=> {
    interval = setInterval(f, 701)
}
    stop =()=> { clearInterval(interval) }

    trix =(l,r,d)=>{
        let t = form({
            row: O(() => [])
        })
    }

}
