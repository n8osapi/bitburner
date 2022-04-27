/** @param {import("..").NS} ns **/
export async function main(ns) {
    while(true){
        for (var member of ns.gang.getMemberNames())
        {
            var a = ns.gang.getAscensionResult(member);
            if (a && a.dex>1.1) ns.gang.ascendMember(member);
        }
        await ns.sleep(1000)
    }
}
