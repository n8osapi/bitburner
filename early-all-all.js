import {Servers,spider} from './tools'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var count = 0;
    
    var p = ns.getPlayer();
    for (var server of spider(ns))
    {
        var s = ns.getServer(server);
        if (p.hacking>=s.requiredHackingSkill && s.moneyMax>0) count++;
    } 
    


    for (var host of Servers(ns).filter(z=>z.purchasedByPlayer))
    {
        if (host=="home") continue;
        
        var ram = ns.getServerMaxRam(host.hostname);
        var size = ns.getScriptRam('early.js') * count;
        
        var threads = Math.max(1,Math.floor(ram/size));
        
        for (var server of spider(ns)) {
            var s = ns.getServer(server);
            if (p.hacking < s.requiredHackingSkill || s.moneyMax==0) continue;
            await ns.scp('early.js', host.hostname);
            await ns.exec('early.js', host.hostname, threads,server,threads);
        }

        await ns.sleep(100)
    }
}

