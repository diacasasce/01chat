"use strict"
var prompt = require('prompt')
prompt.start()
const WebSocket = require('ws');

module.exports= Client
function Client(name,address,cb){
    return new client(name,address,cb)
}
class client {
    constructor(name, address,cb) {
        this.name = name
        this.ws = new WebSocket('ws://'+address);
        let ws=this.ws
        ws.on('open', function open() {
            ws.send(name);
        });
        ws.on('message', function incoming(data) {
            cb(data);
        });
        ws.on('close', function close() {
            console.log(ws.id + '-> disconnected');
            prompt.stop()
        });
        ws.on('error', function err(er) {
            //console.log(ws.id + '-> ' + er)
        });
    }
    talk(obj,data,game) {
        prompt.get(['data'], function (err, result) {
            if (result) {
                if (result.data != null) {
                    obj.talk(obj,data,game)
                    if (obj.ws.readyState === WebSocket.OPEN) {
                        console.log(result.data)
                        console.log(data(result.data));
                        obj.ws.send(data(result.data));
                        game(data(result.data))
                    }
                }
            }
        })
    }
}


