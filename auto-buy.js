/** @param {import(".").NS} ns **/
export async function main(ns) {


    var limit = ns.getPurchasedServerLimit()
    var count = ns.getPurchasedServers().length
    
    while(true)
    {
        if (count>=limit) {
            await ns.sleep(10000);
            var count = ns.getPurchasedServers().length
            continue;
        }
        var p = ns.getPlayer();
        if (p.money>=ns.getPurchasedServerCost(Math.pow(2,ns.args[0])))
        {
            var hostname = await ns.purchaseServer("pserv", Math.pow(2,ns.args[0]));
            ns.exec("early-all-all.js","home")
            count += 1
        }
        await ns.sleep(1000)       
    }



}
