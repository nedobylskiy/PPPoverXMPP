# PPP over XMPP (jabber)
It creates a TAP interface and allows you to use the XMPP (jabber) as PPP tunnel.

## Usage

The project is in the stage of "proof-of-concept". Therefore, the configuration is done by editing the application main file. Sorry for this.

Example:

```javascript
var PPPoverXMPP = require('pppoverxmpp')({
	'interface': 'tun1',
	'ip': '192.168.0.2',
	'gateway': '192.168.0.1',
	'mask': '255.255.255.0',
	'login': 'mygateway@jabber.cc',
	'password': 'poweroverwhelming',
	'gatewayContact': 'mygateway@jabber.cc',
	'debug': true
});
```
**login and password** - from you jabber account. Do not use Jabber clients simultaneously using PPP over XMPP.

**gatewayContact** - authorized user from contact list. Another instance of PPP over XMPP should be connected to this account.

**id** - adress of current device in PPP network

**gateway** - usually the address of another device

**mask** - IPv4 subnetting reference (networking mask)

**interface** - name of network interface created in system

After configuring run application from superuser. 

Run another instance of application on gatewayContact with same networkMask and try use ping command for test.

## Additional features

Tou can have access to node-tuntap and xmpp-client instances by **PPPoverXMPP.tuntap** and **PPPoverXMPP.client** properties.

##Troubles

* Depency module **node-tuntap** very unstable.
* Some XMPP provider very slow
