/** @param {import(".").NS} ns **/
export async function main(ns) {
    var hostname=ns.args[0];
    await ns.scp(ns.args[1]+'.js', hostname);
    await ns.exec(ns.args[1]+'.js', hostname, ns.args[2], ns.args[3], ns.args[2]);
}