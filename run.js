/** @param {import(".").NS} ns **/
export async function main(ns) {
    var hostname=ns.args[0];
    await ns.killall(hostname);
    await ns.scp(ns.args[1], hostname);
    await ns.exec(ns.args[1], hostname, ns.args[2], ns.args[3]);
}