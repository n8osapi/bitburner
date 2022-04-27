import { spider } from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {

    var host = ns.args[0];
    var servers = spider(ns);
    var all = servers.map(s=>ns.getServer(s));
    var hacked = all.filter(s=>!s.purchasedByPlayer && s.moneyMax>0 && s.hasAdminRights && s.backdoorInstalled)

    await ns.scp("grow.js",host)

    var threads = ns.getServerMaxRam(host)/ ( ns.getScriptRam("grow.js") * hacked.length)

    for (var h of hacked)
    {
        var pid = ns.exec("grow.js",host, threads, h.hostname, Math.random())
        ns.tprint(h.hostname + ":" + pid)
    }
}
