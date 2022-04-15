O = PureState

see =s=> JSON.stringify(s, null, 2)
view =x=> {
    let s = ""
    let o = {}
    for (let k of Object.keys(x)) {
        if (k[0] != "_") {
            o[k] = x[k]()
        }
    }
    for (let [k,v] of Object.entries(o)) {
        s += `${k}:${nfp(v,4,2)}\n`
    }
    return s
}

sh = O("")

cmd =s=>{
    console.log(s)
    let x = eval(s)
    console.log(x)
}
keyPressed =(k)=> {
    if (k.key == "Enter") {
        let c = sh()
        sh("")
        glowbox(mouseX+64,mouseY,c)
        cmd(c)
    } else if (k.key == "Backspace") {
        let s = sh()
        sh(s.slice(0, s.length-1))
    } else {
        if (k.key.length == 1) {
            sh(sh() + k.key)
        }
    }
}
setup =()=> {
    FPS = 60
    createCanvas(1280, 960)
    angleMode(RADIANS)
    frameRate(FPS)
    textFont('Unifont')
    textSize(32)



    fill('white')
    stroke('white')

    frame = O(0)
    t = O(0)
    bg = O('pink')
    syc = O(() => sin(TAU*t() / 1000))
    cyc = O(() => cos(TAU*t() / 1000))
    mx = O(mouseX)
    my = O(mouseY)

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





