import {rootedServers,fm,fn } from "./tools";
/** @param {import("..").NS} ns **/
export async function main(ns) {
    var whatif = ns.args[0]=="--whatif"
    var augName = "NeuroFlux Governor"
    var player = ns.getPlayer();
    var augPrice = ns.getAugmentationPrice(augName)
    var augRep = ns.getAugmentationRepReq(augName)
    var faction = player.factions.map(z=>({name:z, rep:ns.getFactionRep(z)})).sort((a,b)=>b.rep-a.rep)[0]
    var canAffordAug = player.money >= augPrice
    var hasRep = faction.rep > augRep
    var repPrice = !hasRep ? (augRep-faction.rep) * Math.pow(10,6) / player.faction_rep_mult : 0;
    var canAffordRep = player.money >= repPrice
    var canAffordBoth = player.money >= (repPrice + augPrice)
    var needsRep = !hasRep
    var purchase = false;
    var tot = ns.getScriptIncome()[0]
    var diff = (augPrice + repPrice) - player.money

    ns.tprintf("Current %s Price: %s",augName, fm(augPrice))
    ns.tprintf("Current %s Rep: %s",augName, fn(augRep))
    
    ns.tprintf("Current Player Money: %s",fm(player.money))
    ns.tprintf("Current %s Rep: %s",faction.name, fn(faction.rep))
    
    if (needsRep && (canAffordRep || canAffordBoth)){
        if (whatif){
            ns.tprintf("Purchasing %s rep from %s for %s",fn(augRep-faction.rep),faction.name,fm(repPrice))
        } else {
            var donation = ns.donateToFaction(faction.name, repPrice)
            if (donation) {
                ns.tprintf("Purchased %s rep from %s for %s",fn(augRep-faction.rep),faction.name,fm(repPrice))
            }
        }
    } else if (needsRep && !canAffordRep) {
        ns.tprintf("Need %s more money (%s) to gain %s rep with %s (%s) in %s", fm(repPrice - player.money),fm(repPrice),fm(augPrice),fn(augRep-faction.rep),faction.name,ns.tFormat((repPrice - player.money)*1000/tot));
    }    
    
    if (!needsRep && canAffordAug){
        if (whatif){
            ns.tprintf("Purchasing %s from %s for %s",augName, faction.name,fm(augPrice))
        } else {
            var result = ns.purchaseAugmentation(faction.name,augName)    
            if (result){
                ns.tprintf("Purchased %s from %s for %s",augName, faction.name,fm(augPrice))
                purchase = true;
            }
            else
            {
                ns.tprintf("Could not purchase %s. no idea why", augName)
            }
        }
    }
    else if (!canAffordAug){
        ns.tprintf("Need %s more money (%s) to purchase %s in %s", fm(augPrice - player.money), fm(augPrice), augName ,ns.tFormat((augPrice - player.money)*1000/tot));
    } 
    if (!purchase){
        ns.tprintf("Total needed: %s @ %s/s = %s",fm(diff),fm(tot), ns.tFormat(diff * 1000 /tot))
    }
    ns.tprintf("-------------------------------------------------------------------------")  
} 