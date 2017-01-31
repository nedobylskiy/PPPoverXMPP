# PPP over XMPP (jabber)
It creates a TAP interface and allows you to use the XMPP (jabber) as PPP tunnel.

## Usage

The project is in the stage of "proof-of-concept". Therefore, the configuration is done by editing the application main file. Sorry for this.

**login and password** - from you jabber account. Do not use Jabber clients simultaneously using PPP over XMPP.

**gatewayContact** - authorized user from contact list. Another instance of PPP over XMPP should be connected to this account.

**idAdress** - adress of current device in PPP network

**gatewayIp** - usually the address of another device

**networkMask** - IPv4 subnetting reference

**interfaceId** - name of network interface created in system

After configuring run application from superuser. 

```bash
sudo npm start
```
in Debian based systems.

Run another instance of application on gatewayContact with same networkMask and try use ping command for test.

##Troubles

* Depency module **node-tuntap** very unstable.
* Some XMPP provider very slow
