console.log('load self.js')

const { form, $ } = require('./ents')

export const self = form({
    x: _.mx,
    y: _.my,
    buff: _.sh,
    hue: $('black')//()=>color(255*_.syc(), 255*_.cyc(), 255-(_.syc())))
}).tick(() => {
}).draw(() => {
    push()
    fill(self.hue())
    stroke(self.hue())
    text("\u2609 ", self.x()+32, self.y())
    text(self.buff(), self.x()+64, self.y())
    pop()
})

