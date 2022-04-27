/** @param {import("..").NS} ns **/
export async function main(ns) {

    // ns.tprint(JSON.stringify(ns.gang.getGangInformation(),null,2));

    // ns.tprint(JSON.stringify(ns.gang.getMemberNames(),null,2));

    for (var member of ns.gang.getMemberNames())
    {
        var m = ns.gang.getMemberInformation(member);
        // ns.tprint(JSON.stringify(m,null,2));
        ns.tprintf("%10s  %5.2f  %5.2f  %5.2f  %5.2f  %5.2f  %5.2f  %s",member, m.hack_asc_mult, m.str_asc_mult, m.def_asc_mult, m.dex_asc_mult, m.agi_asc_mult, m.cha_asc_mult, m.task);

    }

}

function c(val)
{
    return (val-1)*100.0
}
