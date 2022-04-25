

const { form, $ } = require('./ents.js')

export const matrix =()=> {
    const m = form({
        x: $(_.self.x()),
        y: $(_.self.y()),
        len: $(31),
        pos: $(0),
        buff: $("hi"),
        hue: $(color(random(255), random(255), random(255)))
    }).tick(()=>{
        const s = m.buff()
        const p = m.pos()
        const pre = s.slice(0,p)
        const r = 100 + random(1600)
        const c = String.fromCharCode(floor(r))
        const post = s.slice(p+1)
        const s2 = pre + c + post
        m.buff(s2)
        m.pos((m.pos()+1) % m.len())
    }).draw(()=>{
        push()
        fill(m.hue())
        stroke('black')
        text(m.buff(), m.x(), m.y())
        pop()
    })
    return m
}
