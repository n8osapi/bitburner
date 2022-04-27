import { spider } from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {

    var host = ns.args[0];
    var servers = spider(ns);
    var all = servers.map(s=>ns.getServer(s));
    var hacked = all.filter(s=>!s.purchasedByPlayer && s.moneyMax>0 && s.hasAdminRights && s.backdoorInstalled)
    await ns.scp("weaken.js",host)
    for (var h of hacked)
    {
        var pid = ns.exec("weaken.js",host, 2000, h.hostname, Math.random())
        ns.tprint(h.hostname + ":" + pid)
    }
}
