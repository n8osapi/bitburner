/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target=ns.args[0];
    var myThreads = ns.args[1]

    ns.tprint(`Initializing on ${ns.getHostname()} targetting ${target} with ${myThreads} threads.`)
    var moneyThresh = ns.getServerMaxMoney(target) * 1;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    while(true) {
        var server = await ns.getServer(target);
        var sec = ns.getServerSecurityLevel(target);
        if (sec > securityThresh) {
            var w = await ns.weaken(target);
        } else if (server.moneyAvailable < moneyThresh) {
            var grown = await ns.grow(target);
        }
        await ns.sleep(1000);
    }
}

function fm(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}