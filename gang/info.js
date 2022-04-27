/** @param {import("..").NS} ns **/
export async function main(ns) {

    // ns.tprint(JSON.stringify(ns.gang.getGangInformation(),null,2));

    // ns.tprint(JSON.stringify(ns.gang.getMemberNames(),null,2));


        var m = ns.gang.getMemberInformation(ns.args[0]);

         ns.tprint(JSON.stringify(m,null,2));
        var ar = ns.gang.getAscensionResult(ns.args[0])
        
        
        if (ar)
        {
            ns.tprintf("Strength:  %4.2f -> %4.2f ( %5.2f %%)",m.str_asc_mult, m.str_asc_mult * ar.str, c(ar.str));
            ns.tprintf("Defense:   %4.2f -> %4.2f ( %5.2f %%)",m.def_asc_mult, m.def_asc_mult * ar.def, c(ar.def));
            ns.tprintf("Dexterity: %4.2f -> %4.2f ( %5.2f %%)",m.dex_asc_mult, m.dex_asc_mult * ar.dex, c(ar.dex));
            ns.tprintf("Agility:   %4.2f -> %4.2f ( %5.2f %%)",m.agi_asc_mult, m.agi_asc_mult * ar.agi, c(ar.agi));
            ns.tprintf("Charisma:  %4.2f -> %4.2f ( %5.2f %%)",m.cha_asc_mult, m.cha_asc_mult * ar.cha, c(ar.cha));
        }
    

}

function c(val)
{
    return (val-1)*100.0
}
