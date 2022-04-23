const { $, form } = require('./ents')

const glowbox =(x,y,t)=> {
    let g = form({
        t,
        x,
        y,
        age: $(2)
    }).tick(()=>{
        g.age(g.age()+1)
    }).draw(()=>{
        push()
          grey = 255/(g.age()/2)
          fill(color(255,255,255,grey))
          stroke(color(255,255,255,grey))
          text(t, x, y)
        pop()
    });
    return g
}

