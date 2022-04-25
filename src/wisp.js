import { form, $ } from './ents.js'

export const wisp =args=> {
    let w = form({
        x: $((args && args.x) ?? _.mx()),
        y: $((args && args.y) ?? _.my()),
        dx: $(0),
        dy: $(0),
        hue: $(color(random(255), random(255), random(255))),
        jitter: $(1/50)
    }).tick(() => {
        let x2 = (w.x() + w.dx()) % width
        w.x( x2 > 0 ? x2 : width )
        let y2 = (w.y() + w.dy()) % height
        w.y( y2 > 0 ? y2 : height )
        w.dx(w.dx() + (random() - 1/2)*w.jitter())
        w.dy(w.dy() + (random() - 1/2)*w.jitter())
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
