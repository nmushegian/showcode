

import {default as orb} from  'purestate'
export { orb }
export const $ = orb

export let _ents = {}
export let _entc = 0

export class Ent {
    constructor(o) {
        if (o) {
            Object.assign(this, o)
        }
    }
    _tick() {}
    _draw() {}

    tick(f) {
        let _t = this._tick;
        this._tick = ()=> { _t(); f() }
        return this
    }

    draw(f) {
        let _d = this._draw;
        this._draw = ()=> { _d(); f() }
        return this
    }
}

export let form =o=> {
    const e = new Ent(o)
    _ents[_entc] = e
    console.log(`formed`, _entc, e)
    _entc++
    return e
}

