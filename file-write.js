import { rootedServers } from "./tools";

var shared = [];

/** @param {import(".").NS} ns **/
export async function main(ns) {

    switch(ns.args[0]){
        case "add":
            for(var s of rootedServers(ns).filter(z=>z.moneyMax>0)){
                var min = s.minDifficulty
                var cur = s.hackDifficulty
                shared.push({server:s.hostname, script:ns.getScriptName(), minimum:min, current:cur})
            }
            ns.tprint(JSON.stringify(shared,null,0));
            break;
        case "watch":
            while(true)
            {
                ns.tprint(JSON.stringify(shared,null,2));
                await ns.sleep(5000);
            }
            break;
        case "clear":
            shared = []
        default:
    }


}