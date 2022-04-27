import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var p = ns.getPlayer();
    var count=0;
    var ss= []
    for (var server of spider(ns))
    {
        var s = ns.getServer(server);
        if (p.hacking>=s.requiredHackingSkill && s.moneyMax>0 && s.moneyAvailable>0) {
            ss.push(server)
            count++
        };
    
    } 
   // if (ns.args[1]) count=Math.min(ns.args[1],count)
    
    var ram = ns.getServerMaxRam('home') - 200;
    var size = ns.getScriptRam(ns.args[0]+'.js') * count;
    
    var threads = Math.floor(ram/size);

    ns.tprintf("%s",threads)
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
    for (var server of ss) {
        var s = ns.getServer(server);
        
        if (p.hacking<s.requiredHackingSkill || s.moneyMax==0 || s.numOpenPortsRequired > hacks ) continue;
        if (c>count) continue;
        c++;
        
        ns.tprint(server)
        await ns.exec(ns.args[0] + '.js', 'home', threads,server,threads);
        await ns.sleep(1);
	}
}

