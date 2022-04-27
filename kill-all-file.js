import {Servers} from './tools'
/** @param {import(".").NS} ns **/
export async function main(ns) {
        var file = ns.args[0]
        var servers = Servers(ns);
        for(var s of servers){
        var processes = ns.ps(s.hostname);
        for(var p of processes)
        {
            if (p.filename==file) ns.scriptKill(file,s.hostname)
        }
    }   
}

