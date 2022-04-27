/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target = ns.args[0];
    var targetServer = ns.getServer(target);
    var scriptSize = ns.getScriptRam("grow-target.js");
    var targetRam = targetServer.maxRam-targetServer.ramUsed;
    
    var threads = Math.floor(targetRam/scriptSize)
    await ns.scp("grow-target.js",target)
    await ns.exec("grow-target.js",target,threads)
}