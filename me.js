import {fn} from './tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var cores = ns.getUpgradeHomeCoresCost();
    var ram = ns.getUpgradeHomeRamCost();
    var money = ns.getPlayer().money;
    if (ns.args[0]=="--ram"){
        if (ns.upgradeHomeRam())
        {
            ns.tprint("Purchased RAM.")
        }
        else {
            ns.tprintf("Need %s more money.",fn(ram-money))
        }
    } else if (ns.args[0]=="--cores"){
        if (ns.upgradeHomeCores())
        {
            ns.tprint("Purchased Cores.")
        }
        else{
            ns.tprintf("Need %s more money.",fn(cores-money))
        }
    } else {

        ns.tprintf("RAM:   %s",fn(ram))
        ns.tprintf("Cores: %s",fn(cores))
    }
}
