import { form } from './form.js'

export function wand(o={}) {
    return form({
        x: o.x ?? 0,
        y: o.y ?? 0,
        line: "",
        hue: o.hue ?? 'black',
        _draw: ({$,_}) => {
            console.log('in _draw')
            $.fill(_.hue())
            $.text(_.line(), 100, 100)
            // $.draw( kids )
        }
    })
}
