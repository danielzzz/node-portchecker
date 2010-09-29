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
exports.getFirstAvailable = function (p, m, host, callback) {
    var notFree = false;
    var conn = net.createConnection(p, host);
    var onClose = function() {
        if (notFree) {conn.connect(p); notFree = false; return;}
        delete conn;
        callback(p, host);    
    };
    
    var onOpen = function() {
        notFree = true;
        console.log(host+":"+p+" is taken");
        
        //not found
        if (p >= m) { 
            conn.removeListener('close', onClose);
            delete conn;
            callback(-1, host); 
            
        }
        
        p++;
        conn.end();
    };
    
    conn.on('close', onClose);
    conn.on('error', function() {});
    
    conn.on('connect', onOpen);
    
    
}

//usage example: find first available port between 2000 and 2100 on localhost
this.getFirstAvailable(80, 8090, 'localhost', function(p, host) { console.log(host+":"+p+" is free");});
