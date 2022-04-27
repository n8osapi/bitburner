import { formatMillions, rootedServers } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var mine = (ns.args[0] ?? "")=="mine"
    for (var server of rootedServers(ns).filter(z=>z.purchasedByPlayer==mine)){
        var scripts = ns.ps(server.hostname)
        ns.tprintf("%-20s | %12s/%12s | %4d/%5d", server.hostname,formatMillions(server.moneyAvailable), formatMillions(server.moneyMax), server.ramUsed, server.maxRam)
        for (var s of scripts){
           ns.tprintf("%s %s:%s:%s"," ".repeat(65), s.filename, s.threads,s.args)
        }
    }   

}