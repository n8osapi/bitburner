/** @param {import(".").NS} ns **/
export async function main(ns) {
    var threads = ns.args[0];
    var result = ns.weakenAnalyze(threads);
    ns.tprintf("Weakening with %d threads results in a %g decrease",threads,result)
}