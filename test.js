const client = require('./client')
const name = process.argv[2];
const port = process.argv[3];
const fig = process.argv[4];
let testC = client(name, port, move)
testC.talk(testC, data, move)
let a = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
function print(data) {
    console.log(data.toString())
   // move(data)
}
function data(pos) {
    console.log(pos)
    return JSON.stringify({
        pos: pos,
        fig: fig
    })
}
function move(mss) {
    let ms = JSON.parse(mss)
    a[ms.pos] = ms.fig
    console.log()
    console.log('[' + a[0] + '][' + a[1] + '][' + a[2] + ']')
    console.log('[' + a[3] + '][' + a[4] + '][' + a[5] + ']')
    console.log('[' + a[6] + '][' + a[7] + '][' + a[8] + ']')
    return ms
}
print(a)