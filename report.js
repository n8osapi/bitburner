import { rootedServers, fn, fm } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {
    var limit=ns.args[0] ?? "20"
    var results = []
    var total = 0;
    for (var host of rootedServers(ns)){
            var processes = ns.ps(host.hostname);
            for(var p of processes)
            {
                var income = ns.getScriptIncome(p.filename,host.hostname,...p.args )
                //ns.tprintf("%s %s %s %f", host.hostname,p.filename,JSON.stringify(p.args),JSON.stringify(income))
                results.push({host:host.hostname,file:p.filename,target:p.args[0],threads:p.args[1],income:income})
            }

            
        }
        // ns.tprintf("%-20s %10s %s    %6s  %10s","Total","","",total,"")

        var r = results.filter(z=>z.income>0).sort((a,b)=>b.income-a.income);
        //ns.tprintf(JSON.stringify(r,null,2));
        var i=0;
        var g = groupBy(r,["target"])
        var rresults = [];
        for (var gg of Object.keys(g)){
            rresults.push({server:gg,income:g[gg].reduce((a,c)=>a+(c.income*1),0)})
        }
        var sresults = rresults.sort((a,b)=>b.income-a.income) 
        //ns.tprintf("%s",JSON.stringify(sresults,null,2))
        if (limit=="all") limit = sresults.length
        sresults.slice(0,limit).forEach(z=>ns.tprintf("%-20s %10s/s",z.server,fm(z.income)))
        
        //ns.tprintf("%-20s %10s/s",gg, )  ;//[0].income));//.reduce((p,c)=>p.income+c.income));
        //ns.tprintf("%s %s",gg, JSON.stringify(g[gg][1].income));//.reduce((p,c)=>p.income+c.income));
        
        // r.filter(z=>z.income>0).forEach(z=>{
        //     ns.tprintf("%4d %-10s %-15s %-30s %10s/s",++i, z.host, z.file, JSON.stringify(z.args), fn(z.income))
        // })
        // var tot = 0;
        // r.filter(z=>z.income>0).forEach(z=>{
        //     tot += z.income
        // })
        // ns.tprintf("%4s %-10s %-15s %-30s %10s","", "", "", "", "------------")
        // ns.tprintf("%4s %-10s %-15s %-30s %10s/s","", "Total", "", "", fm(tot))


}


/**
 * @param {any[]} arr
 * @param {string[]} keys

 */
 const groupBy = (arr, keys) => {
    return arr.reduce((storage, item) => {
      const objKey = keys.map(key => `${ item[key] }`).join(':'); //should be some unique delimiter that wont appear in your keys
      if (storage[objKey]) {
        storage[objKey].push(item);
      } else {
        storage[objKey] = [item];
      }
      return storage;
    }, {});
  };
  