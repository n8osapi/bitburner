import {fm,fn } from "./tools";
/** @param {import(".").NS} ns **/
export async function main(ns) {

    for (var f of ns.getPlayer().factions     ){
        var rep = ns.getFactionRep(f)
        var favor = ns.getFactionFavor(f)
        var gain = ns.getFactionFavorGain (f)
        if (rep>0 || ns.args[0]=="--all")
        ns.tprintf("%-30s %10s %10s + %10s = %10s", f, fn(rep), fn(favor), fn(gain), fn(favor + gain))
    }
}