import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {

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

    var p = ns.getPlayer();

    for(var server of spider(ns)){
        var s = ns.getServer(server);
        if (s.hasAdminRights) continue;
        if(s.numOpenPortsRequired<=hacks)
        {
            if (ns.fileExists("BruteSSH.exe")) ns.brutessh(server)
            if (ns.fileExists("HTTPWorm.exe"))ns.httpworm(server)
            if (ns.fileExists("SQLInject.exe"))ns.sqlinject(server)
            if (ns.fileExists("FTPCrack.exe"))ns.ftpcrack(server)
            if (ns.fileExists("RelaySMTP.exe"))ns.relaysmtp(server);
            ns.tprint(`Hacking ${server}`)
            ns.nuke(server);
            //ns.installBackdoor(target);
        }
    }
}

