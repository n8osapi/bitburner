/** @param {import(".").NS} ns **/
export async function main(ns) {
        var host = ns.args[0]
        ns.killall(host);
}

