import { rootedServers, fn, fm } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target = ns.args[0] 
    var limit = ns.args[1] ?? 20
    var results = []
    var total = 0;
    for (var host of rootedServers(ns)){
            var processes = ns.ps(host.hostname);
            for(var p of processes)
            {
                var income = ns.getScriptIncome(p.filename,host.hostname,...p.args )
                //ns.tprintf("%s %s %s %f", host.hostname,p.filename,JSON.stringify(p.args),JSON.stringify(income))
                results.push({host:host.hostname,file:p.filename,args:p.args,income:income})
            }

            
        }
        // ns.tprintf("%-20s %10s %s    %6s  %10s","Total","","",total,"")

        var r = results.sort((a,b)=>b.income-a.income);
        if (target) r = r.filter(z=>z.args[0]==target||target=="all")
        //ns.tprintf(JSON.stringify(r,null,2));
        var i=0;
        r.filter(z=>z.income>0).slice(0,limit).forEach(z=>{
            ns.tprintf("%4d %-10s %-15s %-30s %10s/s",++i, z.host, z.file, JSON.stringify(z.args), fn(z.income))
        })
        var tot = 0;
        r.filter(z=>z.income>0).forEach(z=>{
            tot += z.income
        })
        ns.tprintf("%4s %-10s %-15s %-30s %10s","", "", "", "", "------------")
        ns.tprintf("%4s %-10s %-15s %-30s %10s/s","", "Total", "", "", fm(tot))


}