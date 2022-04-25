let interval

export const stream =(t,f)=> {
    interval = setInterval(f, t)
}

export const stop =()=> {
    clearInterval(interval)
}

