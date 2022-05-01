/*
const cl = p.color('black')
        for (let x = 0; x < p.width; x+=32) {
            for (let y = 0; y < p.height; y+=32) {
                let l = form($=>({
                    x1: x,
                    y1: y,
                    x2: x+32,
                    y2: y,
                    x3: x,
                    y3: y+32,
                    _draw: ({$,_}) => {
                        let d = $.dist(_.x1(), _.y1(), $.mx()+self.r()+64, $.my())
                        cl.setAlpha(255/(d/30))
                        $.stroke(cl)
                        $.noFill()
                        $.curveTightness(1.1)
                        $.line(
                            _.x1(), _.y1(),
                            _.x2(), _.y2(),
                        )
                        $.line(
                            _.x1(), _.y1(),
                            _.x3(), _.y3(),
                        )
                    }
                }))
            }
        }
*/
