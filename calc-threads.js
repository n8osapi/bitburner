import {servers} from 'servers.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {

    var host = ns.args[1] ?? ns.getHostname();
    var count = 1
    var flags = ns.flags([
        ['all',false]
    ])
    if (flags.all) count = servers.length;
    
    var ram = ns.getServerMaxRam(host);
    var size = ns.getScriptRam(ns.args[0]) * count;
    ns.tprint(flags.all)
    ns.tprintf("%s threads of %s can be ran on %s's %s RAM",ns.nFormat(ram/size,"0,0"),ns.args[0],host, ns.nFormat(ram,"0,0"))
}

