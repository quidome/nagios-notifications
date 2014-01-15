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
// load pushbullet library
var PushBullet = require('pushbullet');

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
var addresses = argv.A.split(";");
var host = argv.H;
var type = argv.T;
var description = argv.D;
var state = argv.S;
var output = argv.O;


// Iterate over addresses
addresses.map( function(address) {
	// scanning the addresses one by one
	if (address) {
		// console.log("we've got an address");
		// console.log("address: %s", address);

		// servicename is in the part before : 
		var parts = address.split(":");
		var service = parts[0];
		var destination = parts[1];

		// console.log("service: %s", service);
		// console.log("destination: %s", destination);

		if (service == 'pushbullet') {
			// we've got a winner
			var s = destination.split(",");
			var apikey = s[0];
			var deviceId = s[1];
			// console.log("push message to:\nkey: %s\ndevice: %s\n", apikey, deviceId);

			// this script is but-ugly but I have the vars :)
			var noteTitle;
			var noteBody;
			// prepare the message
			if (type == 'host') {
				noteTitle = 'Host status update';
				noteBody = host.concat(' changed into state: ', state, ' : ', output);
			} else if (type == 'service') {
				noteTitle = 'Host status update';
				noteBody = host.concat(' changed into state: ', state, ' for service: ', description, ': ', output);				
			} else {
				noteTitle = 'unknown type';
				noteBody = host.concat(' changed into state: ', state, ' for : ', description, ': ', output);
			}

			// console.log("title: %s", noteTitle);
			// console.log("body: %s", noteBody);

			// we should push the message now
			var pusher = new PushBullet(apikey);

			// // get devices
			// pusher.devices(function(error, response) {
			// 	if (error) {
			// 		console.log("error: %j", error);
			// 	} else {
			// 		console.dir(response);
			// 	}
			// });

			// push message to given device
			pusher.note(deviceId, noteTitle, noteBody, function(error, response) {
				if (error) {
					console.log("error: %j", error);
				} else {
					console.dir(response);
				}
			});

		}		

	}

});
