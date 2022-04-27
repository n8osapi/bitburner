/** @param {import("..").NS} ns **/
export async function main(ns) {
    for(var m of ns.gang.getMemberNames())
    {
        for (var e of ns.gang.getEquipmentNames())
        {
            ns.gang.purchaseEquipment(m,e);
        }
    }
}