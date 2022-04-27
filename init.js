/** @param {import(".").NS} ns **/
export async function main(ns) {
    var p = ns.getPlayer();
    if (p.tor) {
        ns.tprintf("Already purchased")
    }
    else
    {
      ns.tprintf(ns.purchaseTor()?"Router Purchased!":"Unable to purcahase router!");
    }
    ns.exec("/ticker.js","home",1)
    ns.exec("/ticker2.js","home",1)
    //ns.exec("/auto-contracts.js","home",1)
    ns.exec("/stats.js","home",1)
    ns.exec("/hashes.js","home",1,"5")
    //ns.exec("/hacknet.js","home",1,)
    ns.exec("/attack.js","home",1)
    ns.exec("/early-all.js","home",1)

}