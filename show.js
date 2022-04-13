
_ = PureState
see =s=> JSON.stringify(s, null, 2)

setup =()=> {
    createCanvas(1280, 960)

    fill('white')
    stroke('white')

    frame = _(0)
    t = _(0)
    bg = _('black')
    syc = _(sin(0))
    cyc = _(cos(0))
    mx = _(mouseX)
    my = _(mouseY)
}

draw =()=> {
    background(bg())
    frame(frameCount)
    t(t() + deltaTime)
    syc(sin(t()))
    cyc(cos(t()))
    mx(mouseX)
    my(mouseY)

}

