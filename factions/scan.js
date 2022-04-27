import { fn, fm } from 'tools.js'

/** @param {import("..").NS} ns **/
export async function main(ns) {
    var flags = ns.flags([
        ['all',false]
    ])
    var output = []
    for(var f of Object.keys(factions))
    {
        var skip=false;
        var p = ns.getPlayer();
        var existing = p.factions.includes(f)
        output.push(ns.sprintf("%s","\n"))
        for (var r of factions[f].requirements)
        {
            if (skip) continue;
            var key = Object.keys(r)[0];
            var critKey = Object.keys(r)[1];
            var val = r[key]
            var critVal = r[critKey] || false;
            if (checks[key]) {
                var misc={faction:f}
                var result = checks[key](val,misc,ns)
                if (existing) result[0] = true;
                if (result[0]){
                  if (flags.all) output.push(ns.sprintf("      %-25s:%-25s:%s",f,key + " (" +fn(val).trim()+")", "✅"))
                  //ns.tprintf("%s:%s:%s - %s",f, key, val, result)
                }
                else{
                    if (critVal && !flags.all) 
                    {
                        skip=true;
                        continue
                    }
                    // ns.tprintf("INFO: %s:%s:%s = %s",f, key, val, result)
                    output.push(ns.sprintf("INFO: %-25s:%-25s:%s",f, key + " (" + fn(val).trim() + ")", result[1]))
                }
            }
            else
            {
               output.push(ns.sprintf("WARN: %s:%s:%s =  No check!", f, key, val))
            }
        
        }
        if (factions[f].note) {
            output.push(ns.sprintf("INFO: %-25s:%-25s:%s",f, "note", factions[f].note))
        }   
    if (output.length>1){
        output.forEach(z=>ns.tprintf("%s",z))
    }
    output = []
    }
}

const checks = {
/** @param {import("..").NS} ns **/
backdoor:(host,misc,ns)=>{
    var s = ns.getServer(host);
    var issues = [];
    if (!s.backdoorInstalled) { issues.push("Need backdoor on " + host + ".")}
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
ports:(host,misc,ns)=>{
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
    
    var s = ns.getServer(host);
    var issues = [];
    if (s.numOpenPortsRequired > s.openPortCount) { issues.push(host + " needs " + (s.numOpenPortsRequired-s.openPortCount) + " more open ports")}
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
money:(amount, misc,ns)=>{
    var p = ns.getPlayer();
    var issues = []
    if (p.money<amount) issues.push("Need " + fm(amount-p.money) + " more money.")
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
hacking:(val, misc,ns)=>{
    var amount = val;
    if (typeof amount === "string"){
        amount = ns.getServerRequiredHackingLevel(val)
    }
    
    var p = ns.getPlayer();
    var issues = []
    if (p.hacking < amount) issues.push("Needs " + fn(amount-p.hacking).trim() + " more hacking skill.")
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
rep:(amount, misc,ns)=>{
    var issues= []
    var r = ns.getCompanyRep(misc.faction)
    if (r<amount) issues.push("needs " + fn(amount-r).trim() + " more company rep")
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
kills:(amount,misc,ns)=>{
    var issues= []
    var p = ns.getPlayer();
    var k = p.numPeopleKilled||0
    if (k < amount) issues.push("Need " + (amount-k) + " more kills.")
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
augments:(amount,misc,ns)=>{
    var issues= []
    var augments = ns.getOwnedAugmentations(false)
    var a = augments.length
    if (a<amount) issues.push("Need " + (amount-a) + " more augments.")
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
location:(arr,misc,ns)=>{
    var issues= []
    var p = ns.getPlayer();
    if (!arr.includes(p.city)) issues.push("Must be in " + arr.join(" or "))
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
karma:(amount,misc,ns)=>{
    var issues= []
    var p = ns.getPlayer();
    var k = ns.heart.break()||0
    if (k > amount) issues.push("Need to lose " + (k-amount) + " more karma.")
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
combat:(amount,misc,ns)=>{
    var p = ns.getPlayer();
    var issues = [];
    if (p.strength<amount) issues.push("STR:+"+(amount-p.strength))
    if (p.defense<amount) issues.push("DEF:+"+(amount-p.defense))
    if (p.dexterity<amount) issues.push("DEX:+"+(amount-p.dexterity))
    if (p.agility<amount) issues.push("AGI:+"+(amount-p.agility))
    return [issues.length===0, issues.join(",")]
},
/** @param {import("..").NS} ns **/
"hacknet-levels":(amount,misc,ns)=>{
    var count = ns.hacknet.numNodes()
    var levels = 0;
    for(var i=0;i<count;i++)
    {
        levels += ns.hacknet.getNodeStats(i).level
    }
    var issues=[];
    if (levels<=amount) issues.push(ns.sprintf("Hacknet Levels: %s/%s=%s",levels,amount, (amount-levels)))
    return [issues.length===0,issues.join(",")]
},
/** @param {import("..").NS} ns **/
"hacknet-ram":(amount,misc,ns)=>{
    var count = ns.hacknet.numNodes()
    var levels = 0;
    for(var i=0;i<count;i++)
    {
        levels += ns.hacknet.getNodeStats(i).ram
    }
    var issues=[];
    if (levels<=amount) issues.push(ns.sprintf("Hacknet Levels: %s/%s=%s",levels,amount, (amount-levels)))
    return [issues.length===0,issues.join(",")]
},
/** @param {import("..").NS} ns **/
"hacknet-cores":(amount,misc,ns)=>{
    var count = ns.hacknet.numNodes()
    var levels = 0;
    for(var i=0;i<count;i++)
    {
        levels += ns.hacknet.getNodeStats(i).cores
    }
    var issues=[];
    if (levels<=amount) issues.push(ns.sprintf("Hacknet Levels: %s/%s=%s",levels,amount, (amount-levels)))
    return [issues.length===0,issues.join(",")]
},
/** @param {import("..").NS} ns **/
"not-in-faction":(faction,misc,ns)=>{
    var playerFactions = ns.getPlayer().factions
    var issues=[];
    for(var f of faction){
        if(playerFactions.includes(f)) issues.push(f)
    }
    return [issues.length===0,issues.length>0?"Cannot be in: " + issues.join(" or "):""]
},
/** @param {import("..").NS} ns **/
"not-working-for":(faction,misc,ns)=>{
    var p = ns.getPlayer()
    var issues=[];
    if (faction.includes(p.companyName)) issues.push("Cannot be working for " + p.companyName)
    return [issues.length===0,issues]
},
/** @param {import("..").NS} ns **/
"job":(title,misc,ns)=>{
    var p = ns.getPlayer()
    var issues=[];
    var jobs = Object.keys(p.jobs).map(m=>p.jobs[m]);

    var matches = jobs.filter(j=>title.includes(j));

    if (matches.length==0) issues.push("Must be " + title.join(",") + " of a company (" + jobs.join(",") + ")")


    return [issues.length===0,issues]
},
}

const factions = {
    // Early Game Factions
    "CyberSec":{
        group:"Early Game Faction",
        requirements:[
            {"backdoor":"CSEC"},
            {"hacking":"CSEC"},
            {"ports":"CSEC"}
        ]
    },
    "Tian Di Hui":{
        group:"Early Game Faction",
        requirements:[
            {"money":1000000},
            {"location":["Chongqing","New Tokyo","Ishima"]},
            {"hacking":50}
        ]
    },
    "Netburners":{
        group:"Early Game Faction",
        requirements:[
            {"hacking":80},
            {"hacknet-levels":100},
            {"hacknet-ram":8},
            {"hacknet-cores":4}
        ]
    },
    // City Factions
    "Sector-12":{
        group:"City Faction",
        requirements:[
            {"not-in-faction":["Chongqing","New Tokyo","Ishima","Volhaven"],"critical":true},
            {"money":15 * 1000000},
            {"location":["Sector-12"]},
        ]
    },
    "Chongqing":{
        group:"City Faction",
        requirements:[
            {"not-in-faction":["Sector-12","Aevum","Volhaven"],"critical":true},
            {"money":20 * 1000000},
            {"location":["Chongqing"]},
        ]
    },
    "New Tokyo":{
        group:"City Faction",
        requirements:[
            {"not-in-faction":["Sector-12","Aevum","Volhaven"],"critical":true},
            {"money":20 * 1000000},
            {"location":["New Tokyo"]},
        ]
    },
    "Ishima":{
        group:"City Faction",
        requirements:[
            {"not-in-faction":["Sector-12","Aevum","Volhaven"],"critical":true},
            {"money":30 * 1000000},
            {"location":["Ishima"]},
        ]
    },
    "Aevum":{
        group:"City Faction",
        requirements:[
            {"not-in-faction":["Chongqing","New Tokyo","Ishima","Volhaven"],"critical":true},
            {"money":40 * 1000000},
            {"location":["Aevum"]},
        ]
    },
    "Volhaven":{
        group:"City Faction",
        requirements:[
            {"not-in-faction":["Chongqing","New Tokyo","Ishima","Aevum","Sector-12"],"critical":true},
            {"money":50 * 1000000},
            {"location":["Volhaven"]},
        ]
    },
    // Hacking Groups
    "NiteSec":{
        group:"Hacking Group",
        requirements:[
            {"backdoor":"avmnite-02h"},
            {"hacking":"avmnite-02h"},
            {"ports":"avmnite-02h"}
        ]
    },
    "The Black Hand":{
        group:"Hacking Group",
        requirements:[
            {"backdoor":"I.I.I.I"},
            {"hacking":"I.I.I.I"},
            {"ports":"I.I.I.I"},
        ]
    },
    "BitRunners":{
        group:"Hacking Group",
        requirements:[
            {"backdoor":"run4theh111z"},
            {"hacking":"run4theh111z"},
            {"hacking":545},
            {"ports":"run4theh111z"}
        ]
    },
    // Megacorporations
    "ECorp":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "MegaCorp":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "KuaiGong International":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "Four Sigma":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "NWO":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "Blade Industries":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "OmniTek Incorporated":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "Bachman & Associates":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "Clarke Incorporated":{
        group:"Hacking Group",
        requirements:[
            {"rep":200 * 1000}
        ]
    },
    "Fulcrum Technologies":{
        group:"Hacking Group",
        requirements:[
            {"rep":250 * 1000},
            {"backdoor":"fulcrumassets"},
            {"hacking":"fulcrumassets"},
            {"ports":"fulcrumassets"}
        ]
    },
    // Criminal Organizations
    "Slum Snakes":{
        group:"Criminal Organization",
        requirements:[
            {"karma":-9},
            {"combat":"30"},
            {"money":1000000}
        ]
    },
    "Tetrads":{
        group:"Criminal Organization",
        requirements:[
            {"karma":-18},
            {"combat":"75"},
            {"location":["Chongqing","New Tokyo","Ishima"]},
        ]
    },
    "Silhouette":{
        group:"Criminal Organization",
        requirements:[
            {"karma":-22},
            {"money":15 * 1000000},
            {"job":["CTO","CFO","CEO"]},
        ]
    },
    "Speakers for the Dead":{
        group:"Criminal Organization",
        requirements:[
            {"karma":-45},
            {"combat":300},
            {"hacking":300},
            {"kills":30},
            {"not-working-for":["Central Intelligence Agency","National Security Agency"]},
        ]
    },
    "The Dark Army":{
        group:"Criminal Organization",
        requirements:[
            {"karma":-45},
            {"combat":300},
            {"hacking":300},
            {"kills":5},
            {"location":["Chongqing"]},
            {"not-working-for":["Central Intelligence Agency","National Security Agency"]},
        ]
    },
    "The Syndicate":{
        group:"Criminal Organization",
        requirements:[
            {"karma":-90},
            {"combat":200},
            {"hacking":200},
            {"location":["Sector-12","Aevum"]},
            {"not-working-for":["Central Intelligence Agency","National Security Agency"]},
        ]
    },
    // Endgame Factions
    "The Covanent":{
        group:"Endgame Faction",
        requirements:[
            {"augments":20},
            {"combat":850},
            {"hacking":850},
            {"money":75 * 1000 * 1000000}
        ]
    },
    "Daedalus":{
        group:"Endgame Faction",
        requirements:[
            {"augments":30},
            {"combat":1500},
            {"hacking":2500},
            {"money":100 * 1000 * 1000000}
        ],
        note: "Need combat *or* hacking"
    },
    "Illuminati":{
        group:"Endgame Faction",
        requirements:[
            {"augments":30},
            {"combat":1200},
            {"hacking":1500},
            {"money":150 * 1000 * 1000000}
        ]
    },
}