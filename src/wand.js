import { form } from './form.js'
console.log('load wand.js')
export function wand(o={}) {
    return form({
        x: o.x ?? 0,
        y: o.y ?? 0,
        line: "",
        hue: o.hue ?? 'black',
        _draw: ({$,_}) => {
            $.fill(_.hue())
            $.text(_.line(), _.x(), _.y())
        }
    })
}
