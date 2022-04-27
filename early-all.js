import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var p = ns.getPlayer();
    var count=0;
    for (var server of spider(ns))
    {
        var s = ns.getServer(server);
        if (p.hacking>=s.requiredHackingSkill && s.moneyMax>0) count++;
    } 
    if (ns.args[0]) count=Math.min(ns.args[0],count)
    
    var ram = (ns.getServerMaxRam('home') - (1000 + ns.getServerUsedRam('home')));
    var size = ns.getScriptRam('early.js') * count;
    
    var threads = Math.floor(ram/size);

    var hacks = 0;
    if (ns.fileExists("BruteSSH.exe")){
        hacks++;
    }
    if (ns.fileExists("HTTPWorm.exe")){
        hacks++
    }
    if (ns.fileExists("SQLInject.exe")){
        hacks++
    }
    if (ns.fileExists("FTPCrack.exe")){
        hacks++
    }
    if (ns.fileExists("RelaySMTP.exe")){
        hacks++
    }

    var c=0;
    threads = Math.max(threads,1);
    for (var server of spider(ns)) {
        var s = ns.getServer(server);
        
        if (p.hacking<s.requiredHackingSkill || s.moneyMax==0 || s.numOpenPortsRequired > hacks ) continue;
        if (c>count) continue;
        c++;
        
        ns.tprint(server)
        await ns.exec('early.js', 'home', threads,server,threads);
        await ns.sleep(1);
	}
}

