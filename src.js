const { form, orb } = require('./ent')
const font = require('@fontsource/unifont')

O = orb

onload =()=>{

_ = {}

glif =g=> {
    let e = form({
        g: O(g),
        x: O(mx()),
        y: O(my()),
        dx: O(0),
        dy: O(0),
        hue: O('white')
    }).tick(()=>{
        e.x( e.x() + e.dx() )
        e.y( e.y() + e.dy() )
        e.dy( e.dy() + (random() - 1/2)/20)
        e.dx( e.dx() + (random() - 1/2)/20)
    }).draw(()=>{
        push()
        textSize(36)
        fill(e.hue())
        text(e.g(), e.x(), e.y())
        textSize(8)
        text(view(e), e.x(), e.y() + 24)
        pop()
    })
    return e
}


const c = form({
    x: O(mouseX),
    y: O(mouseY),
    buff: O(()=>sh())
}).tick(() => {
    c.x( mouseX )
    c.y( mouseY )
}).draw(() => {
    push()
    text("\u2609 ", c.x()+32, c.y())
    text(c.buff(), c.x()+64, c.y())
    pop()
})

glif("A")

wisp =args=> {
    let w = form({
        x: O((args && args.x) ?? mx()),
        y: O((args && args.y) ?? my()),
        dx: O(0),
        dy: O(0),
        hue: args && args.hue ? O(args.hue) : O('white')
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


}
