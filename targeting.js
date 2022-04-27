import { rootedServers } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {

    var total = 0;
    for (var host of rootedServers(ns)){
            var processes = ns.ps(host.hostname);
            for(var p of processes)
            {
                if (p.args[0]!=ns.args[0]) continue;
                if (p.filename==ns.getScriptName()) continue;
                ns.tprintf("%-20s %10s:%s %6s  %-10s",host.hostname.trim(),p.filename,p.pid,p.threads,p.args)
                total += p.threads
            }
            
        }
        ns.tprintf("%-20s %10s %s     %6s  %10s","Total","","",total,"")

}