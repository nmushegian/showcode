const { form, $ } = require('./ents')

export const beat =(bpm=120)=> {
    const b = form({
        x: $(_.mx()),
        y: $(_.my()),
        val: $(()=>sin(_.t() * TAU * (bpm / 60) / 1000))
    }).draw(()=>{
        console.log(b.val())
        text(nfp(b.val(), 2, 4), b.x(), b.y())
    })
    return b
}
