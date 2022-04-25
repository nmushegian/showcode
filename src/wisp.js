import { form, $ } from './form.js'

export const wisp =(o={})=> {
    let w = form({
        x: _.mx(),
        y: _.my(),
        dx: 0,
        dy: 0,
        hue: color(random(255), random(255), random(255)),
        jitter: 1/50,
        _tick: ({$,_})=>{
            let x2 = (_.x() + _.dx()) % width
            _.x( x2 > 0 ? x2 : width )
            let y2 = (_.y() + _.dy()) % height
            _.y( y2 > 0 ? y2 : height )
            _.dx(_.dx() + (random() - 1/2)*_.jitter())
            _.dy(_.dy() + (random() - 1/2)*_.jitter())
        },
        _draw: ({$,_})=>{
            $.translate(_.x(), _.y());
            for (let i = 0; i < 60; i++) {
                $.rotate(TAU / 60);
                $.stroke(_.hue());
                let d = $.abs($.floor($.randomGaussian(0, 15)));
                line(0, 0, d, 0);
            }
        }
    })
    return w
}
