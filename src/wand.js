import { form } from './form.js'
console.log('load wand.js')
export function wand(o={}) {
    return form({
        r: 16,
        x: o.x ?? 0,
        y: o.y ?? 0,
        line: "",
        hue: o.hue ?? 'black',
        _draw: ({$,_}) => {
            $.stroke(_.hue())
            $.fill(_.hue())
            $.text(">" + _.line(), _.x()+_.r()/2, _.y()+8)
            $.noFill()
            $.circle(_.x(), _.y(), _.r())
        }
    })
}
