/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target=ns.args[0];
    var sec = ns.getServerSecurityLevel(target);
    var min = ns.getServerMinSecurityLevel(target);
    var result = await ns.weaken(target);
    var x = Math.max(sec - result,min);
    var sx = ns.sprintf("%.2f",x);
    var minx = ns.sprintf("%.2f",min);
    var message = `${target} weakened ${result} to ${sx} of ${minx} from ${ns.getHostname()}`

    ns.toast(`[toast]:${message}`)
    ns.tprint(`[tprint]:${message}`)
    ns.print(`[print]:${message}`)
}