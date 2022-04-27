import FourSigmaTIXStock from "./classes/if.stock.4s";

/** @param {import(".").NS} ns **/
export async function main(ns) {

    var s = new FourSigmaTIXStock(ns,"NTLK");
    ns.tprintf("%s",JSON.stringify(s,null,2))
}