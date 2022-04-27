/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target=ns.args[0];
    var myThreads = ns.args[1]

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
        if (sec <= securityThresh && server.moneyAvailable > moneyThresh) {
            // Otherwise, hack it
            // but only take 33%
            var amount = ns.getServerMoneyAvailable(target)/3// server.moneyAvailable / 3;
            var threads = Math.ceil(Math.min(ns.hackAnalyzeThreads(target,amount),myThreads));
            if (threads>0){
                var stolen = await ns.hack(target,{threads:threads});
                ns.toast(ns.sprintf("%s: Hacked %s",target,fm(stolen)))
            }
        }
        else
        {
            if (sec>securityThresh)
                ns.print(ns.sprintf("%s: Security > Threshold: %.2f < %.2f",target, sec,securityThresh))
            if (server.moneyAvailable < server.moneyThresh)
                ns.print(ns.sprintf("%s: Money < Threshold: %.2f < %.2f",target, server.moneyAvailable,moneyThresh))
        }
        await ns.sleep(1000);
    }
}

function fm(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}