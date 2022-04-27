import {fm,fn} from './tools'

async function printTable(ns,title,data,config,output){
    if (data.length==0) return;
    var columns = Object.keys(config).filter(f=>config[f].visible)
    var o = {}
    var padLength=1
    var output = []
    columns.forEach(c=>{
        o[c]={}
        o[c].values=data.map(z=>String(config[c].f(z)??""))
        o[c].shortName=config[c].header
        o[c].maxLength=Math.max(...(o[c].values.map(el => el.length)),o[c].shortName.length)+(config[c].pad?padLength:0);
        o[c].padded = config[c].pad
    })
    var max = columns.reduce((p,c)=>p+o[c].maxLength,0) + columns.length + columns.filter(z=>o[z].padded).length -1
    output.push("┌"+columns.map(c=>ns.sprintf("─".repeat(config[c].pad?padLength:0) + "%-"+o[c].maxLength+"s","─".repeat(o[c].maxLength))).join("─")+"┐")
    output.push("│"+ center("  " + title + "  ",max,'░') +"│")
    output.push("├"+columns.map(c=>ns.sprintf("─".repeat(config[c].pad?padLength:0) + "%-"+o[c].maxLength+"s","─".repeat(o[c].maxLength))).join("┬")+"┤")
    output.push("│"+columns.map(c=>ns.sprintf("%-"+o[c].maxLength+"s",center(o[c].shortName,o[c].maxLength+(config[c].pad?padLength:0)))).join("│")+"│")
    output.push("├"+columns.map(c=>ns.sprintf("─".repeat(config[c].pad?padLength:0) + "%-"+o[c].maxLength+"s","─".repeat(o[c].maxLength))).join("┼")+"┤")
    output.push(...data.map(x=>"│"+columns.map(c=>ns.sprintf((config[c].pad?" ".repeat(padLength):"")+"%"+(config[c].align=="left"?"-":"")+o[c].maxLength+"s",config[c].f(x)??"")).join("│")+"│"))
    output.push("└"+columns.map(c=>ns.sprintf("─".repeat(config[c].pad?padLength:0) + "%-"+o[c].maxLength+"s","─".repeat(o[c].maxLength))).join("┴")+"┘")
    ns.tprintf(output.join("\n"))
}
function center(val,width,char=" ")
{

    var l = val.length
    var b = Math.floor((width-l)/2)
    var a = width - (l+b)
    return char.repeat(b) + val + char.repeat(a)
}

const serverConfig={
    contracts:{header:"ctr",visible:false,f:(d)=>d.contracts},
    cpuCores:{header:"cores",visible:false,f:(d)=>d.cpuCores},
    ftpPortOpen:{header:"ftp",visible:false,f:(d)=>d.ftpPortOpen},
    hostname:{header:"name",visible:true,f:(d)=>d.hostname,align:"left",pad:true},
    httpPortOpen:{header:"http",visible:false,f:(d)=>d.httpPortOpen},
    ip:{header:"ip",visible:false,f:(d)=>d.ip},
    isConnectedTo:{header:"conn",visible:false,f:(d)=>d.isConnectedTo},
    messages:{header:"msg",visible:false,f:(d)=>d.messages},
    organizationName:{header:"org",visible:true,f:(d)=>d.organizationName, align:"left",pad:true},
    programs:{header:"prgs",visible:false,f:(d)=>d.programs},
    ram:{header:"ram",visible:true,f:(d)=>fn(d.ramUsed,{maximumFractionDigits:0 }).trim()+"/"+fn(d.maxRam,{maximumFractionDigits:0 }).trim()},
    ramUsed:{header:"used",visible:false,f:(d)=>fn(d.ramUsed,{maximumFractionDigits:0 })},
    maxRam:{header:"ram",visible:false,f:(d)=>fn(d.maxRam,{maximumFractionDigits:0 })},
    runningScripts:{header:"rs",visible:false,f:(d)=>d.runningScripts},
    scripts:{header:"s" ,visible:false,f:(d)=>d.scripts},
    serversOnNetwork:{header:"onnet",visible:false,f:(d)=>d.serversOnNetwork},
    smtpPortOpen:{header:"smtp",visible:false,f:(d)=>d.smtpPortOpen},
    sqlPortOpen:{header:"sql",visible:false,f:(d)=>d.sqlPortOpen},
    sshPortOpen:{header:"ssl",visible:false,f:(d)=>d.sshPortOpen},
    textFiles:{header:"txt",visible:false,f:(d)=>d.textFiles},
    purchasedByPlayer:{header:"P",visible:true,f:(d)=>d.purchasedByPlayer?"☺":""},
    baseDifficulty:{header:"bd",visible:false,f:(d)=>fn(d.baseDifficulty,1).trim()},
    minDifficulty:{header:"md",visible:false,f:(d)=>fn(d.minDifficulty,1).trim()},
    hackDifficulty:{header:"hd",visible:false,f:(d)=>fn(d.hackDifficulty,1).trim()},
    diff:{header:"df",visible:true,f:(d)=>fn(Math.round(d.hackDifficulty-d.minDifficulty),0).trim()},
    moneyAvailable:{header:"$ Avl",visible:true,f:(d)=>d.moneyAvailable==d.moneyMax?"MAX ":fm(d.moneyAvailable,1)},
    moneyMax:{header:"$ Max",visible:true,f:(d)=>fm(d.moneyMax,1)},
    openPortCount:{header:"O",visible:false,f:(d)=>d.openPortCount},
    numOpenPortsRequired:{header:"O/R",visible:true,f:(d)=>d.openPortCount+'/'+d.numOpenPortsRequired},
    hasAdminRights:{header:"A",visible:true,f:(d)=>d.hasAdminRights?"♦":""},
    backdoorInstalled:{header:"B",visible:true,f:(d)=>d.backdoorInstalled?"◙":""},
    requiredHackingSkill:{header:"H",visible:true,f:(d)=>d.requiredHackingSkill},
    serverGrowth:{header:"g",visible:true,f:(d)=>d.serverGrowth},
    hackChance:{header:"h",visible:true, f:(d)=>{
        var v= Math.round((d.hackChance??0)*100)
        if (v==100) v='■'
        else if (v==0) v='□'
        return v
    }
}
}

export { printTable, serverConfig}