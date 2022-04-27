//import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {/** @param {NS} ns **/
    while (true) {
        await ns.sleep(100);
        try {
            var hashes = ns.hacknet.numHashes();
            var hashMax=0;
            for (var i=0;i<ns.hacknet.numNodes();i++)
            {
                var stats = ns.hacknet.getNodeStats(i)
                hashMax+=stats.hashCapacity
            }
            //ns.tprint(hashes)
            while (hashes==hashMax) 
            {
                if (ns.hacknet.spendHashes("Sell for Money")){
                    //ns.tprint("Sell for money")
                }
                await ns.sleep(100);
            
                hashes = ns.hacknet.numHashes()
            }
        } catch (error) {
            ns.tprintf("%s",JSON.stringify(error))
        }
        }
    }