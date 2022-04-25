import { form } from './form.js'

export function wand(o={}) {
    return form({
        x: o.x ?? 0,
        y: o.y ?? 0,
        line: "",
        hue: o.hue ?? 'black',
        faces: {
            p5: ({$,_}) => {
                $.fill(_.hue())
                $.text(_.line(), 100, 100)
            }
        }
    })
}
