const client = require('./client')
const name = process.argv[2];
const port = process.argv[3];
const fig = process.argv[4];
let testC = client(name, port, move)
testC.talk(testC, data, move)
let a = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]

function print(data) {
    //console.log(data.toString())
    move(data)
}
function data(pos) {
    console.log(pos)
    let coor = pos.split(',')
    return JSON.stringify({
        posx: coor[0],
        posy: coor[1],
        fig: fig
    })
}
function move(mss) {
    let ms = JSON.parse(mss)
    if (a[ms.posx][ms.posy] == ' ') { a[ms.posx][ms.posy] = ms.fig }else{console.log('posicion invalida')}
    check(ms).then(still => {
        if (still) {
            console.log()
            console.log('[' + a[0][0] + '][' + a[0][1] + '][' + a[0][2] + ']')
            console.log('[' + a[1][0] + '][' + a[1][1] + '][' + a[1][2] + ']')
            console.log('[' + a[2][0] + '][' + a[2][1] + '][' + a[2][2] + ']')
        } else {
            console.log(ms.fig + ' Ha ganado')
            console.log('volver a jugar')
            let a = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
            console.log()
            console.log('[' + a[0][0] + '][' + a[0][1] + '][' + a[0][2] + ']')
            console.log('[' + a[1][0] + '][' + a[1][1] + '][' + a[1][2] + ']')
            console.log('[' + a[2][0] + '][' + a[2][1] + '][' + a[2][2] + ']')
        }
    })

}
function check(ms) {
    let x = ms.posx
    let y = ms.posy
    let f = ms.fig
    return new Promise((resolve, reject) => {
        if ((a[x][0] == f) && (a[x][1] == f) && (a[x][2] == f)) {
            console.log('ganaron')
            resolve(false)
        } else if ((a[0][y] == f) && (a[1][y] == f) && (a[2][y] == f)) {
            console.log('ganaron')
            resolve(false)
        } else if ((a[0][0] == f) && (a[1][1] == f) && (a[2][2] == f)) {
            console.log('ganaron')
            resolve(false)
        } else if ((a[0][2] == f) && (a[1][1] == f) && (a[2][0] == f)) {
            console.log('ganaron')
            resolve(false)
        } else {
            console.log('continua')
            resolve(true)
        }
    })

}
//print(a)
