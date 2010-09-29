var portchecker = require('./portchecker');

var host = 'localhost',
    startPort = 80,
    endPort = 8080;


//------ check first available port between start and endPort on host ---------------
portchecker.getFirstAvailable(startPort, endPort, host, function(p, host) {
    if (p === -1) {
        console.log('no free ports found on ' + host + ' between ' + startPort + ' and ' + endPort);
    } else {
        console.log('the first free port found on ' + host + ' between ' + startPort + ' and ' + endPort + ' is ' + p);
    }
});


//---- check if the port is open ---------------------------------------------------
//portchecker.isOpen(80, 'localhost', function(isOpen){
//    console.log('port 80 on localhost is ' + (isOpen ? 'open' : 'closed'));
//})
