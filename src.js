const ents = require('./ent')
const font = require('@fontsource/unifont')

O = ents.orb

const e = ents
  .form({
      x: O(100), dx: O(1), y: O(100)
  })
  .tick(()=>{
    e.x( e.x() + e.dx() )
  })
  .draw(()=>{
    push()
    textSize(12)
    text(see(e), e.x(), e.y())
    pop()
  })
