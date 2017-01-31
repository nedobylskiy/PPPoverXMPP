/**
	PPP over XMPP (Jabber)
	@author Andrey Nedobylsky
	@git https://github.com/lailune/PPPoverXMPP
*/

var login = 'ethernet@jabber.ru';
var password = '';

var gatewayContact = 'ethernet@xmpp.ru';

var idAdress = '192.168.123.3';
var gatewayIp = '192.168.123.2';
var networkMask = '255.255.255.192';
var interfaceId = 'tap1';

//******************************************************

var tuntap = require('node-tuntap');
var Client = require('xmpp-client').Client;

try {
	var tt = tuntap({
		type: 'tun',
		name: interfaceId,
		mtu: 1500,
		addr: idAdress,
		dest: gatewayIp,
		mask: networkMask,
		ethtype_comp: 'none',
		persist: false,
		up: true,
		running: true,
	});
}
catch(e) {
	console.log('Tuntap creation error: ', e);
	process.exit(0);
}



var c = new Client({
  	jid: login,
  	password: password 
}, function() {
    	console.log("XMPP Connected");
	
	
	tt.on('data', function(data){
		console.log('>>> Send packet');
		c.message(gatewayContact, new Buffer(data).toString('base64'));
	});

	this.addListener('message', function(from, message){
		if(from.indexOf(gatewayContact) !== -1){
			console.log('<<< Recived packet');
			tt.write(new Buffer(message, 'base64'));	
		}
		
	});
});


