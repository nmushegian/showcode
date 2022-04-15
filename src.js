const { form, orb } = require('./ent')
const font = require('@fontsource/unifont')

O = orb

onload =()=>{

const glif =g=> {
    let e = form({
        g: O(g),
        x: O(100),
        y: O(100),
        dx: O(0),
        dy: O(0)
    }).tick(()=>{
        e.x( e.x() + e.dx() )
        e.y( e.y() + e.dy() )
        e.dy( e.dy() + random() - 1/2)
        e.dx( e.dx() + random() - 1/2)
    }).draw(()=>{
        push()
        textSize(36)
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
    textSize(36)
    text("O", c.x(), c.y())
    textSize(24)
    text(c.buff(), c.x()+24, c.y())
    pop()
})

glif("A")

wisp =()=> {
    let w = form({
        x: mx,
        y: my,
        hue: O('white')
    }).tick(() => {
        w.x(w.x() + random() - 1/2)
        w.y(w.y() + random() - 1/2)
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
}

}
