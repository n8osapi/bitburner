/** @param {import(".").NS} ns **/
export async function main(ns) {
    var s = ns.getServer(ns.args[0])
    ns.tprint(JSON.stringify(s,null,3));
}
