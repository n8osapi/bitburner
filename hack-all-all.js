import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var count = 0;
    
    var p = ns.getPlayer();
    for (var server of spider(ns))
    {
        var s = ns.getServer(server);
        if (p.hacking>=s.requiredHackingSkill && s.moneyMax>0) count++;
    } 

    for (var host of ns.getPurchasedServers())
    {
        
        var ram = ns.getServerMaxRam(host);
        var size = ns.getScriptRam('hack.js') * count;
        
        var threads = Math.max(1,Math.floor(ram/size));
        
        for (var server of spider(ns)) {
            var s = ns.getServer(server);
            if (p.hacking < s.requiredHackingSkill || s.moneyMax==0) continue;
            await ns.scp('hack.js', host);
            await ns.exec('hack.js', host, threads,server,threads);
        }
    }
}

