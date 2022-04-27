/** @param {import("..").NS} ns **/
export async function main(ns) {

    // ns.tprint(JSON.stringify(ns.gang.getGangInformation(),null,2));

    // ns.tprint(JSON.stringify(ns.gang.getMemberNames(),null,2));

    for (var member of ns.gang.getMemberNames())
    {
        var m = ns.gang.getMemberInformation(member);
        // ns.tprint(JSON.stringify(m,null,2));
        var ar = ns.gang.getAscensionResult(member)
        if (ar)
        {
            ns.tprintf("%10s  %5.2f  %5.2f  %5.2f  %5.2f  %5.2f  %5.2f  %s",member, c(ar.hack), c(ar.str), c(ar.def), c(ar.dex), c(ar.agi), c(ar.cha), m.task);
        }
        else
        {
            ns.tprintf("%10s  %5.2f  %5.2f  %5.2f  %5.2f  %5.2f  %5.2f  %s",member, 0, 0, 0, 0, 0, 0, m.task);
        }

    }

}

function c(val)
{
    return (val-1)*100.0
}
