import { form } from './form.js'
console.log('load wand.js')
export function wand(o={}) {
    return form($=>({
        r: 32,
        x: o.x ?? 0,
        y: o.y ?? 0,
        line: "",
        hue: o.hue ?? 'black',
        _draw: ({$,_}) => {
            $.stroke(_.hue())
            $.fill(_.hue())
            let _x = _.x() + _.r()/2
            let _y = _.y() + 32
            _x = _x - (_x % 32) + 32
            _y = _y - (_y % 32)
            $.text("\u2A00" + _.line(), _x, _y)
            $.noFill()
            $.circle(_.x(), _.y(), _.r())
            $.line(_x+16, _y-11, $.mx(), $.my())
        }
    }))
}
