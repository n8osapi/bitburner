/** @param {import(".").NS} ns **/
export async function main(ns) {
    var p = ns.getPlayer();
    for(var ss of spider(ns))
    {
        var s = ns.getServer(ss)
		if (!s.purchasedByPlayer && s.moneyMax==0 && s.hasAdminRights && s.backdoorInstalled )
			ns.tprintf("%-24s | %15s | %5.2f ", 
				s.hostname + ` (${s.maxRam})` + (s.hasAdminRights?" R":""), 
				s.moneyMax==s.moneyAvailable ? formatMillions(s.moneyMax) : `(${formatMillions(s.moneyMax - s.moneyAvailable)})`, 
				s.hackDifficulty - s.minDifficulty
			)	

    }
}

function spider(ns) {
    // Return an array of all identifiable servers
    
    // Create a serversSeen array, containing only 'home' for now
    var serversSeen = ['home'];

    // For every server we've seen so far, do a scan
    for (var i = 0; i < serversSeen.length; i++) {
        var thisScan = ns.scan(serversSeen[i]);
        // Loop through results of the scan, and add any new servers
        for (var j = 0; j < thisScan.length; j++) {
            // If this server isn't in serversSeen, add it
            if (serversSeen.indexOf(thisScan[j]) === -1) {
                serversSeen.push(thisScan[j]);
            }
        }
    }
    return serversSeen;
}

function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }) + 'm';
}