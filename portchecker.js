/** 
* LICENSE MIT
* (C) Daniel Zelisko
* http://github.com/danielzzz/node-portchecker
*
* a simple tcp port checker
* Use it for checking if a service is up or to find available ports on a machine
*/

var sys = require('sys');
var net = require('net');




// start port, last port, host, callback
exports.getFirstAvailable = function (startPort, endPort, host, callback) {
    if (startPort>endPort) {
        throw new Error('portchecker: startPort must be lower than endPort');
    }
    console.log('looking for an available port in ' + startPort + '-' + endPort + ' on ' + host);
    var notFree = false;
    var currentPort = startPort;
    
    var onCheckPort = function(isOpen){
        isOpen && check();
        !isOpen && callback((currentPort-1), host);
    }
    
    var check = function() {
        //---- return -1 if we checked all ports from the range already
        currentPort>endPort && callback(-1, host);
        
        console.log('checking :' + currentPort);
        exports.isOpen(currentPort, host, onCheckPort);
        currentPort++;
    }
    
    //----- start checking ----------
    check();
        
    
}

exports.isOpen = function (p, host, callback) {
    var isOpen = false;
    var conn = net.createConnection(p, host);
    var onClose = function() {
        delete conn;
        callback(isOpen);    
    };
    
    var onOpen = function() {
        isOpen = true;
        //console.log(host+":"+p+" is taken");
        conn.end();
    };
    
    conn.on('close', onClose);
    conn.on('error', function() {});
    
    conn.on('connect', onOpen);
}


