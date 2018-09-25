var os = require('os');
var ifaces = os.networkInterfaces();
let ip=[]
module.exports=get_ip
function get_ip(port) {
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                ip.push({
                    name:ifname+ ':' + alias,
                    ip:iface.address+':'+port
                })
            } else {
                // this interface has only one ipv4 adress
                ip.push({
                    name:ifname,
                    ip:iface.address+':'+port
                })
            }
            ++alias;
        });
    });
    return ip
}
/*
console.log(get_ip())
*/