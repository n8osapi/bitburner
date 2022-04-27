/** @param {import(".").NS} ns **/
export async function main(ns) {

    var ps = ns.getRunningScript(ns.args[0]);
    ns.tprint(JSON.stringify(ps,null,3));
    }
