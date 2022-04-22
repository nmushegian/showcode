const { form, $ } = require('./ents')

export const wisp =args=> {
    let w = form({
        x: $((args && args.x) ?? _.mx()),
        y: $((args && args.y) ?? _.my()),
        dx: $(0),
        dy: $(0),
        hue: $('white'),
        jitter: $(1/50)
    }).tick(() => {
        w.x(w.x() + w.dx())
        w.y(w.y() + w.dy())
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
