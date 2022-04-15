const { form, orb } = require('./ent')
const font = require('@fontsource/unifont')

O = orb

onload =()=>{

_ = {}


    anim = {
    }

glif =(l,r,d)=> {
    if (l == 'snake') {
        l = 5407
        r = 5
    } else if (l == 'star') {
        l = 10030
        r = 6
    }else if (l == 'china') {
        l = 15000
        r = 100
    } else if (l == 'rune') {
        l = 5808
        r = 15
    } else if (l == 'braille') {
        l = 10240
        r = 100
    } else if (l == 'shatter') {
        l = 63696
        r = 16
    } else if (l == 'flower') {
        l = 1421
        r = 2
    } else {
        if (l == undefined) {
            l = random(16000)
            r = 10
        }
    }
    let e = form({
        l: O(l),
        r: O(r),
        g: O(l),
        d: O( d ? d : 3),
        x: O(mx()),
        y: O(my()),
        dx: O(0),
        dy: O(0),
        hue: self.hue()
    }).tick(()=>{
        e.x( e.x() + e.dx() )
        e.y( e.y() + e.dy() )
        e.dy( e.dy() + (random() - 1/2)/20)
        e.dx( e.dx() + (random() - 1/2)/20)
        let ff = floor(frame()/e.d())
        let av = e.l() + (ff % e.r())
        let s = String.fromCharCode(av)
        e.g(s)
    }).draw(()=>{
        push()
        textSize(36)
        fill(e.hue)
        text(e.g(), e.x(), e.y())
        textSize(8)
        pop()
    })
    return e
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
