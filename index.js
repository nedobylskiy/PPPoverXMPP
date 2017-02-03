/**
 PPP over XMPP (Jabber)
 @author Andrey Nedobylsky
 @git https://github.com/lailune/PPPoverXMPP
 */

var nodeTuntap = require('node-tuntap');
var Client = require('xmpp-client').Client;

/**
 * Implements PPPoverXMPP object
 *
 * @param {{interface:string, ip: string, gateway: string, mask: string, login: string, password: string, gatewayContact:string, debug: boolean }} options
 * @returns {PPPoverXMPP}
 * @constructor
 */
function PPPoverXMPP(options) {
	var that = this;

	function log(message) {
		if (typeof options.debug != 'undefined' && options.debug) {
			console.log('PPPoXMPP: ' + message);
		}
	}

	this.tuntap = nodeTuntap({
		type: 'tun',
		name: options.interface,
		mtu: typeof options.mtu == 'undefined' ? 1500 : options.mtu,
		addr: options.ip,
		dest: options.gateway,
		mask: options.mask,
		ethtype_comp: 'none',
		persist: false,
		up: true,
		running: true
	});

	this.client = new Client({
		jid: options.login,
		password: options.password
	}, function () {
		log("XMPP Connected");

		that.tuntap.on('data', function (data) {
			log('>>> Send packet');
			that.client.message(options.gatewayContact, new Buffer(data).toString('base64'));
		});

		this.addListener('message', function (from, message) {
			if (from.indexOf(options.gatewayContact) !== -1) {
				log('<<< Recived packet');
				that.tuntap.write(new Buffer(message, 'base64'));
			}

		});
	});

	return this;
}


module.exports = PPPoverXMPP;