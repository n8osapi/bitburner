/** @param {import(".").NS} ns **/
export async function main(ns) {

    ns.tprint(spider(ns));
    
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