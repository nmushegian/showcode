const { form, $ } = require('./ents')

export const link =(a,b)=> {
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
