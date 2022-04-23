let brush
export const paint =(n,f)=> {
    brush = setInterval(f, 100)
    setTimeout(()=>{ clearInterval(brush) }, 100*n)
}
