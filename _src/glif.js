const { $, form } = require('./ents')

export const glif =(l,r,d)=> {
        if (l == 'snake') {
        l = 5407
        r = 5
    } else if (l == 'bird') {
        console.log('hi')
        l = 10000
        r = 100
    }else if (l == 'star') {
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
        l: $(l),
        r: $(r),
        g: $(l),
        d: $( d ? d : 3),
        x: $(_.mx()),
        y: $(_.my()),
        dx: $(0),
        dy: $(0),
        c1: $(color(random(255), random(255), random(255))),
        c2: $(color(random(255), random(255), random(255))),
        hue: $('white'),
    }).tick(()=>{
        let x2 = (e.x() + e.dx()) % width
        let y2 = (e.y() + e.dy()) % height
        e.x( x2 > 0 ? x2 : width )
        e.y( y2 > 0 ? y2 : height )
        e.dy( (e.dy() + (random() - 1/2)/20) )
        e.dx( (e.dx() + (random() - 1/2)/20) )
        e.hue(lerpColor(e.c1(), e.c2(), _.beat()))
        let ff = floor(_.beatframe())
        let av = e.l() + (ff % e.r())
        let s = String.fromCharCode(av)
        e.g(s)
    }).draw(()=>{
        push()
        textSize(36)
        fill(e.hue())
        text(e.g(), e.x(), e.y())
        textSize(8)
        pop()
    })
    return e
}
