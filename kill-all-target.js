import {Servers} from './tools'
/** @param {import(".").NS} ns **/
export async function main(ns) {
        var target = ns.args[0]
        var servers = Servers(ns);
        for(var s of servers){
        var processes = ns.ps(s.hostname);
        for(var p of processes)
        {
            if (p.args.includes(target)) 
            {
                if (ns.kill(p.pid))
                {
                    ns.tprintf("Killing %s on %s",p.filename,s.hostname)
                }
            }
        }
    }   
}

