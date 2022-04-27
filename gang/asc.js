/** @param {import("..").NS} ns **/
export async function main(ns) {

var result = ns.gang.ascendMember(ns.args[0]);
ns.tprint(JSON.stringify(result,null,2));

}
