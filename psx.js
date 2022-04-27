import { rootedServers } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.tprintf("┌%-20s┬%20s%3s┬%6s┬%12s┬%s┐" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))
    ns.tprintf("│ %-20s│ %20s %3s │%6s │ %17s │ %5s │" ,"Server","Script","PID","Threads","Args","RAM")
    ns.tprintf("├%-20s┼%20s%3s┼%6s┼%12s┼%s┤" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))

    var total = 0;
    var totalRam = 0
    for (var host of rootedServers(ns)){
            var processes = ns.ps(host.hostname);
            for(var p of processes)
            {   
                var sr = ns.getScriptRam(p.filename,host.hostname)
                ns.tprintf("│ %-20s│ %20s:%-3s │ %6s │ %-17s │ %5d │",host.hostname.trim(),p.filename,p.pid,p.threads,p.args, sr * p.threads)
                total += p.threads
                totalRam += (sr * p.threads)
            }
            
        }
        ns.tprintf("├%-20s┼%20s%3s┼%6s┼%10s┼%s┤" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))

        ns.tprintf("│ %-20s│ %20s %3s │ %6s │ %1s │ %5d │" ,"Total","","",total,"",totalRam)
        ns.tprintf("└%-20s┴%20s%3s┴%6s┴%10s┴%s┘" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))

}

