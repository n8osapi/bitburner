/** @param {import("..").NS} ns **/
export async function main(ns) {

    for (var m of ns.gang.getMemberNames())
    {
        var result = ns.gang.ascendMember(m);
        ns.tprint(JSON.stringify(result,null,2));
    }

}
