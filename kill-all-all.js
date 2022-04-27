import { spider } from "./tools";

/** @param {import(".").NS} ns **/
export async function main(ns) {
    for (var server of spider(ns)){
        try {
            if (server=="home") continue;
            var result= ns.killall(server)
            if (result) ns.tprintf("%s result = %s",server,result);            
        } catch (error) {
            ns.tprint(error)
        }
    }
}

