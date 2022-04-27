import {rootedServers, formatMillions} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var flags = ns.flags([['all',false]]);
    var p = ns.getPlayer();
    
    var servers = rootedServers(ns);
    servers = servers.sort((a,b)=>a.requiredHackingSkill - b.requiredHackingSkill)
    var total = 0;
    for(var s of servers)
    {
        if (s.purchasedByPlayer || s.moneyMax==0) continue;
        ns.tprintf("%-24s | %15s / %15s | %5.2f | %6.2f %% | %5s | %4s | %s" , 
            s.hostname + ` (${s.maxRam})` + (s.hasAdminRights?" R":""), 
            s.moneyMax==s.moneyAvailable ? formatMillions(s.moneyMax) : `(${formatMillions(s.moneyMax - s.moneyAvailable)})`, 
            formatMillions(s.moneyMax),
            s.hackDifficulty - s.minDifficulty, 
            ns.hackAnalyzeChance(s.hostname)*100.0,
            s.moneyMax>0?ns.nFormat(ns.growthAnalyze(s.hostname,(s.moneyMax??1)/(s.moneyAvailable??1)),"0,0"):"",
            s.requiredHackingSkill,
            ns.tFormat(ns.getWeakenTime(s.hostname))
        )	
        total += s.moneyAvailable
    }

    ns.tprintf("%s total available",formatMillions(total))
}
