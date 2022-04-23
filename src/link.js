const { form, $ } = require('./ents')

export const link =(a,b)=> {
    let l = form({
        x1: $(()=>a.x()),
        y1: $(()=>a.y()),
        x2: $(()=>b.x()),
        y2: $(()=>b.y()),
        hue: $('white')
    }).tick(()=>{
    }).draw(()=>{
        push()
        stroke(l.hue())
        line(l.x1(), l.y1(), l.x2(), l.y2())
        pop()
    })
    return l
}
