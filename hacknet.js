//import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var flags = ns.flags([
        ['level',true],
        ['ram',true],
        ['core',true],
        ['cache',true],
    ])

    var max = ns.hacknet.maxNumNodes()
    var count = ns.hacknet.numNodes()
    
    ns.tprintf("%s/%s",count,max)
    
    while(true)
    {
        var player = ()=>ns.getPlayer();
        if (player().money > ns.hacknet.getPurchaseNodeCost())
        {
            ns.hacknet.purchaseNode()
        }
        var count = ns.hacknet.numNodes()
        for(var i=0;i<count;i++)
        {
            if (flags.level && player().money>ns.hacknet.getLevelUpgradeCost(i,1)) ns.hacknet.upgradeLevel(i,1)
            if (flags.ram && player().money>ns.hacknet.getRamUpgradeCost(i,1)) ns.hacknet.upgradeRam(i,1)
            if (flags.core && player().money>ns.hacknet.getCoreUpgradeCost(i,1)) ns.hacknet.upgradeCore(i,1)
            if (flags.cache && player().money>ns.hacknet.getCacheUpgradeCost(i,1)) ns.hacknet.upgradeCache(i,1)
        }

        await ns.sleep(1000 * 60)

    }
    // var i = ns.hacknet.purchaseNode();
    // ns.hacknet.upgradeLevel(i,99);
    // ns.hacknet.upgradeCore(i,3)
    // ns.hacknet.upgradeRam(i,3)
}