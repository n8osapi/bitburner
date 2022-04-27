/** @param {import("..").NS} ns **/
export async function main(ns) {

    // ns.tprint(JSON.stringify(ns.gang.getGangInformation(),null,2));

    // ns.tprint(JSON.stringify(ns.gang.getMemberNames(),null,2));

    for (var member of ns.gang.getMemberNames())
    {
        var m = ns.gang.getMemberInformation(member);
        ns.gang.setMemberTask(ns.args[0]);
    }

}
