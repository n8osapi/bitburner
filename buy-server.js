/** @param {import(".").NS} ns **/
export async function main(ns) {
    var hostname = await ns.purchaseServer("pserv", Math.pow(2,ns.args[0]));
}