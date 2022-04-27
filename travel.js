//import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {

    var cities = [
        "Aevum",
        "Sector-12",
        "New Tokyo",
        "Ishima",
        "Volhaven",
        "Chongqing"
    ]

    for(var c of cities)
    {
        if (ns.travelToCity(c))
    {
        ns.tprintf("Traveled to %s.",c)
    }
        await ns.sleep(20000)
    }
}
