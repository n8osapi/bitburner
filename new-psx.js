import { Servers, s, fm, fn, ft } from "./tools";
import { printTable } from "./pretty-print"
/** @param {import(".").NS} ns **/
export async function main(ns) {
    // ns.tprintf("┌%-20s┬%20s%3s┬%6s┬%12s┬%s┐" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))
    // ns.tprintf("│ %-20s│ %20s %3s │%6s │ %17s │ %5s │" ,"Server","Script","PID","Threads","Args","RAM")
    // ns.tprintf("├%-20s┼%20s%3s┼%6s┼%12s┼%s┤" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))

    var host = ns.args[0] ?? ""
    var maxRows = ns.args[1] ?? 0
    var data = []

    var total = 0;
    var totalRam = 0
    for (var host of Servers(ns).filter(z=>z.hostname==host || host=="")){
        var processes = ns.ps(host.hostname);
        for(var p of processes)
        {   
            var sr = ns.getScriptRam(p.filename,host.hostname)
            total += p.threads
            totalRam += (sr * p.threads)
            var info = ns.getRunningScript(p.pid)
            //ns.tprint(s(info))
            var d = {
                "server": host.hostname, 
                "filename": p.filename,
                "threads": p.threads,
                "pid": p.pid,
                "ramUsage": sr,
                "args": p.args,
                "logs": [],
                "offlineExpGained": 0,
                "offlineMoneyMade": 0,
                "offlineRunningTime":0,
                "onlineExpGained": 0,
                "onlineMoneyMade": 0,
                "onlineRunningTime":0, 
            }
            //ns.tprint(s(d))
            //ns.exit()
            data.push(info)
            //ns.tprintf("│ %-20s│ %20s:%-3s │ %6s │ %-17s │ %5d │",host.hostname.trim(),p.filename,p.pid,p.threads,p.args, sr * p.threads)
            //total += p.threads
            //totalRam += (sr * p.threads)
        }
        
    }

    data = data.filter(z=>z.onlineMoneyMade>0||true).sort((b,a)=>b.onlineMoneyMade - a.onlineMoneyMade)

    if (maxRows>0) data = data.slice(0,maxRows)
    var config = {...processConfig}
    config.filename.header="file:pid"
    config.filename.f=(d)=>d.filename + ":" + d.pid
    config.pid.visible=false;
    printTable(ns,"All Processes",data,config,(o)=>ns.tprintf("%s",o))
    
    //ns.tprint(s(data))
    // ns.tprintf("├%-20s┼%20s%3s┼%6s┼%10s┼%s┤" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))

        // ns.tprintf("│ %-20s│ %20s %3s │ %6s │ %17s │ %5d │" ,"Total","","",total,"",totalRam)
        // ns.tprintf("└%-20s┴%20s%3s┴%6s┴%10s┴%s┘" ,"─".repeat(21),"─".repeat(22),"─".repeat(4),"─".repeat(8),"─".repeat(19),"─".repeat(7))

}

const processConfig = {
    "server": {header:"host",visible:true,f:(d)=>d.server,order:1},
    "filename": {header:"file",visible:true,f:(d)=>d.filename,order:2},
    "threads": {header:"threads",visible:true,f:(d)=>d.threads,order:3},
    "pid": {header:"pid",visible:true,f:(d)=>d.pid,order:4},
    "ramUsage": {header:"ram",visible:true,f:(d)=>d.ramUsage,order:5},
    "args": {header:"args",visible:true,f:(d)=>d.args,order:6},
    "offlineExpGained": {header:"offXp",visible:true,f:(d)=>fn(d.offlineExpGained),order:8},
    "offlineMoneyMade": {header:"off$",visible:true,f:(d)=>fm(d.offlineMoneyMade),order:9},
    "offlineRunningTime": {header:"offTime",visible:true,f:(d)=>ft(d.offlineRunningTime*1000),order:10},
    "onlineExpGained": {header:"onXp",visible:true,f:(d)=>fn(d.onlineExpGained),order:11},
    "onlineMoneyMade": {header:"on$",visible:true,f:(d)=>fm(d.onlineMoneyMade),order:12},
    "onlineRunningTime": {header:"onTime",visible:true,f:(d)=>ft(d.onlineRunningTime*1000),order:13},
    "logs": {header:"logs",visible:false,f:(d)=>"",order:7},
}