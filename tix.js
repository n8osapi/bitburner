/** @param {import(".").NS} ns **/
export async function main(ns) {
    var agent=ns.args[3] ?? "home"
    var target=ns.args[0];
    var amount=ns.args[1] * 1000000;
    var whatif=ns.args[2] ?? false
    var threads = ns.hackAnalyzeThreads(target,amount);
    var server = await ns.getServer(target);

    ns.tprintf("Server has %s available funds of %s",fm(server.moneyAvailable),fm(server.moneyMax))

    if (whatif) {
        ns.tprintf("Needs %d threads to steal %s",threads,fm(amount))
    }
    else
    {
        var stolen = await ns.hack(target,{stock:true,threads:threads});
    }
}

function fm(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}