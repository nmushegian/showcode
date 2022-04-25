const { form, $ } = require('./ents')

export const sun =()=> {
    const s = form({
        x: $(_.mx()),
        y: $(_.my()),
        r0: $(40),
        r1: $(60),
        pts: $(5+random(20)),
        theta: $(()=>_.beat()),
    }).draw(()=>{
        let angle = TWO_PI / s.pts();
        console.log(angle)
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let b = a + s.theta()
            let sx = s.x() + cos(b) * s.r1();
            let sy = s.y() + sin(b) * s.r1();
            vertex(sx, sy);
            sx = s.x() + cos(b + halfAngle) * s.r0();
            sy = s.y() + sin(b + halfAngle) * s.r0();
            vertex(sx, sy);
        }
        endShape(CLOSE);
    })
    return s
}
