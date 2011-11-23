var portchecker = require('../index');

var host = '192.168.1.1',
    startPort = 50,
    endPort = 90;


//------ check first available port between start and endPort on host ---------------
console.log('checking ports');
portchecker.getAllOpen(startPort, endPort, host, function(openPorts, host) {
    openPorts.length && console.log('open ports on ' + host + ' between ' + startPort + ' and ' + endPort + ' are: ' + openPorts.join(', '));
    !openPorts.length && console.log('no open ports in given range on ' + host);
});

portchecker.getFirstAvailable(startPort, endPort, host, function(p, host) {
    if (p === -1) {
        console.log('no free ports found on ' + host + ' between ' + startPort + ' and ' + endPort);
    } else {
        console.log('the first free port found on ' + host + ' between ' + startPort + ' and ' + endPort + ' is ' + p);
    }
});


//---- check if the port is open ---------------------------------------------------
// wait max 1 sec for result (defautl 400 milisecs)
portchecker.setTimeout(1000);
portchecker.isOpen(80, 'google.com', function(isOpen, port, host){
    console.log('port '+port+' on '+host+' is ' + (isOpen ? 'open' : 'closed'));
})
