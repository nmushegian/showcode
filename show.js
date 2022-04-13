
_ = PureState
see =s=> JSON.stringify(s, null, 2)

make =(props)=> {
    let ent
    ent = {
        view: _(()=> see(props()))
    }
    ents.push(ent)
    return ent
}
setup =()=> {
    createCanvas(1280, 960)

    fill('white')
    stroke('white')

    ents = []

    frame = _(0)
    t = _(0)
    bg = _('black')
    syc = _(sin(0))
    cyc = _(cos(0))
    mx = _(mouseX)
    my = _(mouseY)
    metatext = _()

    s1 = createSlider(0, 100)
    v1 = _()

    e1 = make(_(() => ({'test':'test'})))
}

draw =()=> {
    background(bg())
    frame(frameCount)
    t(t() + deltaTime)
    syc(sin(t()))
    cyc(cos(t()))
    v1(s1.value())
    mx(mouseX)
    my(mouseY)
    metatext(`
frame ${frame()}
time  ${t()}
syc   ${syc()}
cyc   ${cyc()}
v1    ${v1()}
mx    ${mx()}
my    ${my()}
`)


    text(metatext(), 25, 25)
    for (let ent of ents) {
        console.log(ent)
        console.log(ent.view())
        text(ent.view(), 100, 100)
    }
}

