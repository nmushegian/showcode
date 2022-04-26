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
            let _x = _.x() + _.r()/2 + 16
            let _y = _.y() + 16
            _x = _x - (_x % 32) + 16
            _y = _y - (_y % 32)
            $.text(">" + _.line(), _x, _y)
            $.noFill()
            $.circle(_.x(), _.y(), _.r())
            $.line(_x, _y, $.mx(), $.my())
        }
    }))
}
