import { Servers, s, fm, fn ,ft } from "./tools";
import { printTable, serverConfig } from "./pretty-print"
/** @param {import(".").NS} ns **/
export async function main(ns) {
   
    var config = {...serverConfig,
       ...std("threads", (d)=>d?.growthAnalysis??""),
       ...std("grow", (d)=>ft(d?.growTime??"")),
       ...std("weak", (d)=>ft(d?.weakTime??"")),
       ...std("hack", (d)=>ft(d?.hackTime??"")),
    }

    var myConfig = {
        hostname: {...config.hostname},
        organizationName:{...config.organizationName},
        ramUsed:{...config.ramUsed},
        maxRam:{...config.maxRam},
        ...std("free",(d)=>fn(d.maxRam - d.ramUsed)),
        cpuCores:{...config.cpuCores},
        ip:{...config.ip},
        runningScripts:{...config.runningScripts},
        scripts:{...config.scripts},
    }

    myConfig.ramUsed.f=(d)=>fn(d.ramUsed)
    myConfig.maxRam.f=(d)=>fn(d.maxRam)
    myConfig.cpuCores.visible=true;
    myConfig.ip.visible=true;
    myConfig.runningScripts.visible=true;
    myConfig.scripts.visible=true;
    myConfig.ramUsed.visible=true;
    myConfig.maxRam.visible=true;

    var player = ns.getPlayer();
    var data = Servers(ns);
    data.forEach(d=>d.hackChance=ns.hackAnalyzeChance(d.hostname))
    var mine = data.filter(z=>z.purchasedByPlayer);
    var notMine = data.filter(z=>!z.purchasedByPlayer)
    // notMine = notMine.filter(z=>z.)
    notMine.filter(z=>z.moneyMax>0).forEach(z=>z.growthAnalysis=z.moneyAvailable==0?"INF":Math.ceil(ns.growthAnalyze(z.hostname,z.moneyMax/(z.moneyAvailable??1))))
    notMine.filter(z=>z.moneyMax>0 && z.moneyAvailable>0).forEach(z=>z.weakTime=Math.ceil(ns.getWeakenTime(z.hostname)))
    notMine.filter(z=>z.moneyMax>0 && z.moneyAvailable>0).forEach(z=>z.growTime=Math.ceil(ns.getGrowTime(z.hostname)))
    notMine.filter(z=>z.moneyMax>0 && z.moneyAvailable>0).forEach(z=>z.hackTime=Math.ceil(ns.getHackTime(z.hostname)))
    var hackable = notMine.filter(z=>z.requiredHackingSkill<=player.hacking)
    var notHackable = notMine.filter(z=>z.requiredHackingSkill>player.hacking)
    config.purchasedByPlayer.visible=false;

    notHackable.sort((a,b)=>a.requiredHackingSkill-b.requiredHackingSkill)
    hackable.sort((a,b)=>a.requiredHackingSkill-b.requiredHackingSkill)


    await printTable(ns,"My Servers", mine,myConfig,(o)=>ns.tprintf("%s",o))
    await printTable(ns,"Non-Hackable Servers",notHackable,config,(o)=>ns.tprintf("%s",o))
    await printTable(ns,"Hackable Servers",hackable,config,(o)=>ns.tprintf("%s",o))

	


}



function std(obj,formatter){
    var b = {}
     b[obj]={
        header:obj,
        visible:true,
        f:formatter
    }
    return b
}