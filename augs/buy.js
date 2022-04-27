/** @param {import("..").NS} ns **/
export async function main(ns) {
    var result = ns.purchaseAugmentation(ns.args[0], ns.args[1])
    ns.tprintf("%s", result)
} 
