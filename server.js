"use strict"
//module.exports = open_server
// se traen la depoendencias
const WebSocket = require('ws');
const client = require('./client')
var prompt = require('prompt');
function open_server(name, port, num) {
    const wss = new WebSocket.Server({ port: port });
    var client_num = 0
    // Broadcast to all.
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(data) {
            // Broadcast to everyone else.
            let msg
            if (ws.id) {
                msg = data
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(msg);
                    }
                });
            } else {
                client_num += 1
                ws.id = data
                if (client_num > num) {
                    ws.close()
                } else {

                    /*
                    msg = 'bienvenido ' + ws.id + ' usuario ' + client_num + '/' + num
                    wss.clients.forEach(function each(client) {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(msg);
                        }
                    });
                    */
                }
            }

        });
        ws.on('close', function close() {
            client_num -= 1
            console.log(ws.id + '-> disconnected');
        });
        ws.on('error', function err(er) {
            //console.log(ws.id + '-> ' + er)
        });
    });
    let testC = client('diego', 8085, console.log)
    testC.talk(testC, console.log)
}
open_server('diego', 8085, 3)