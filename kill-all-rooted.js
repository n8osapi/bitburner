import { rootedServers } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {
    for(var host of rootedServers(ns))
        ns.killall(host.hostname);
}

