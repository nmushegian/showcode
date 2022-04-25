


form($ => ({
    x: $.mx,
    y: $.my,
    text: ""
})).flow('tail', ($,_) => {
    _.tail($.pmx())
}).draw('p5', ($,_)=> {
    $.text(_.x, 100, 100)
})
