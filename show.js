_ = PureState
see =s=> JSON.stringify(s, null, 2)
view =x=> see(x)

setup =()=> {
    FPS = 60
    createCanvas(1280, 960)
    angleMode(RADIANS)
    frameRate(FPS)
    textFont('Unifont')
    textSize(32)


    fill('white')
    stroke('white')

    frame = _(0)
    t = _(0)
    bg = _('black')
    syc = _(() => sin(TAU*t() / 1000))
    cyc = _(() => cos(TAU*t() / 1000))
    mx = _(mouseX)
    my = _(mouseY)

}

c = 32
ch =s=> { let _c = c; text(s, _c, 64); _c+=32; c+=32 }


draw =()=> {
    background(bg())
    frame(frameCount)
    t(t() + deltaTime)
    mx(mouseX)
    my(mouseY)
    c = 32
    ch("\u0F06")
    ch("\u0F3A")
    text(nfp(syc(), 2, 4), 32, 32)

    for (let [eid,ent] of Object.entries(_ents)) {
        ent._tick()
    }
    for (let [eid,ent] of Object.entries(_ents)) {
        ent._draw()
    }
}

