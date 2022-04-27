/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target=ns.args[0];
    var myThreads = ns.args[1]
    ns.disableLog("sleep")
    ns.disableLog("getServerSecurityLevel")
    ns.tprint(`Initializing on ${ns.getHostname()} targetting ${target} with ${myThreads} threads.`)

    // Defines how much money a server should have before we hack it
    // In this case, it is set to 75% of the server's max money
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

    // Defines the maximum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

    // Infinite loop that continously hacks/grows/weakens the target server
    while(true) {
        var server = await ns.getServer(target);
        var sec = ns.getServerSecurityLevel(target);
        if (sec > securityThresh) {
            // If the server's security level is above our threshold, weaken it
//            ns.print(`Security Level Too Low: ${securityThresh} < ${sec} `);
            var w = await ns.weaken(target);
            var message = `Weakened ${server.hostname} by ${w} ${ns.getHostname()}`
            //ns.toast(`${message}`)
            //ns.tprint(`${message}`)
          ns.print(`${message}`)
        } else if (server.moneyAvailable < moneyThresh) {
            // If the server's money is less than our threshold, grow it
//            ns.print(`Not enough money on server: ${server.moneyAvailable} < ${moneyThresh}`);
            var grown = await ns.grow(target);
            var message = ns.sprintf("Grew %s to %s of %s on %s (%s)",fm((grown * server.moneyAvailable)-server.moneyAvailable),fm(grown * server.moneyAvailable), fm(server.moneyMax),target, ns.getHostname())
            //ns.toast(`${message}`)
            //ns.tprint(`${message}`)
            ns.print(`${message}`)
        } else {
            // Otherwise, hack it
            // but only take 33%
            var amount = ns.getServerMoneyAvailable(target)/3// server.moneyAvailable / 3;
            var threads = Math.ceil(Math.min(ns.hackAnalyzeThreads(target,amount),myThreads));
            if (threads>0)
                var stolen = await ns.hack(target,{threads:threads});
                var message = ns.sprintf("Stole %s from %s (%s)",fm(stolen),target, ns.getHostname())
                //if (stolen>1000000000) ns.toast(`${message}`)
                //ns.tprint(`${message}`)
                ns.print(`${message}`)
        }
        await ns.sleep(1000);
    }
}

function fm(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}