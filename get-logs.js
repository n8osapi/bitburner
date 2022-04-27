/** @param {import(".").NS} ns **/
export async function main(ns) {

    var ps = ns.ps(ns.args[0]);
    ns.tprint(JSON.stringify(ps,null,2))
    for(var p of ps)
    {
        ns.tprintf("%s %s %s",p.filename,ns.args[0],JSON.stringify(p.args))
        var logs = ns.getScriptLogs(p.filename,ns.args[0],...p.args)
        for(var l of logs){
            ns.tprintf("%s %s %s",p.filename, JSON.stringify(p.args), l)
        }
    }

    }
