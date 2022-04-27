/** @param {import(".").NS} ns **/
export async function main(ns) {
    var agent=ns.args[3] ?? "home"
    var target=ns.args[0];
    var amount=ns.args[1] * 1000000;
    while(true){
    var threads = ns.hackAnalyzeThreads(target,amount);
    var server = await ns.getServer(target);
    // ns.tprintf("%s has %s available funds of %s",server.hostname, fm(server.moneyAvailable),fm(server.moneyMax))
    if (server.moneyAvailable==server.moneyMax){
        var stolen = await ns.hack(target,{stock:false,threads:threads});
        ns.tprintf("Stole %s from %s with %d threads", fm(stolen), server.hostname,threads)
    }
    await ns.sleep(1000)
    }
}

function fm(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}