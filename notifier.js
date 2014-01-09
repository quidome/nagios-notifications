#!/usr/bin/env node

/*
Incoming arguments:
-A Contact information (API keys, device ID's, that kind of stuff)
-H Hostname
-T Type (host or service)
-D HOST_OBJECT / SERVICEDESC
-S Host/Service state
-O Host/Service output

Make the call:
notifier_script -A "pushalot:API_KEY;pushbullet:API_KEY,deviceId;;;;" -T <host/service> -H <hostname> -D <description> -S <state> -O <output>

Host config in OP5/Nagios
/opt/nagios-notifications/bin/notify.js -A "$CONTACTADDRESS1$\;$CONTACTADDRESS2$\;$CONTACTADDRESS3$\;$CONTACTADDRESS4$\;$CONTACTADDRESS5$\;$CONTACTADDRESS6$" -H "$HOSTNAME$" -T host -D "HOST_OBJECT" -S "$HOSTSTATE" -O "$HOSTOUTPUT$"

Service config in OP5/Nagios
/opt/nagios-notifications/bin/notify.js -A "$CONTACTADDRESS1$\;$CONTACTADDRESS2$\;$CONTACTADDRESS3$\;$CONTACTADDRESS4$\;$CONTACTADDRESS5$\;$CONTACTADDRESS6$" -H "$HOSTNAME$" -T service -D "$SERVICEDESC$" -S "$SERVICESTATE" -O "$SERVICEOUTPUT$"

Output Text:
Service text: "<hostname> changed into state: <state> for service: <description>: <output>"
Host text: "<hostname> changed into state: <state> : <output>"

*/


// Load modules

// Load optimist, read/parse command line arguments
var argv = require('optimist')
	.usage('Sends notifications to push notification services.\nUsage: $0 -A [address string] -H [hostname] -T [type] -D [description] -S [state] -O [output]')
	.demand(['A', 'H', 'T', 'D', 'S', 'O'])
	.argv;

/*
# TODO
* contact: extract adresses
* message: distinct between host and service
* message: send

*/



// Handle input parameters
// All arguments were given

// console.dir(addresses);

// Create notification object
console.dir(argv);

argv.A.forEach(function(val) {
	console.log(val);

})