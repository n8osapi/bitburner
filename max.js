import { rootedServers } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {

    var skips =  []//'foodnstuff','sigma-cosmetics']

    var script = ns.args[0] + '.js'
    var size = ns.getScriptRam(script);
    for (var server of rootedServers(ns)){
        var target = ns.args[1]
        if (skips.includes(server.hostname))
        {
            ns.tprintf("Skipping %s",server.hostname)
        }

        if (!(target=='all' || target==server.hostname)) {
            continue
        };

        if (server.maxRam - server.ramUsed == 0 ) {
            continue
        };

        if ((server.moneyMax==0 || server.moneyAvailable==0) && !server.purchasedByPlayer && server.hostname==target) {
            ns.tprintf("Skipping %s (No Money)",server.hostname)
            continue
        };
        //if (ns.args[3] && ns.args[3]=='kill') ns.killall(server.hostname)
        var targetRam = ns.getServerMaxRam(server.hostname) - ns.getServerUsedRam(server.hostname) + (server.hostname=="home"?20:0)
        var victim = ns.args[2] ?? ns.args[1]
        if (victim=="self") victim = server.hostname;    
        var threads = Math.floor(targetRam/size)            

        if (threads==0) {
            ns.tprintf("Skipping %s (No Threads)",server.hostname)
            continue;
        }
        await ns.scp(script,'home',server.hostname)
        ns.exec(script,server.hostname,threads,victim,threads)
    }
    

}