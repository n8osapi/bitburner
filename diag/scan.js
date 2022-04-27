/** @param {import(".").NS} ns **/
export async function main(ns) {
	var host = ns.args[0]
	var s = ns.getServer(host)
	ns.tprintf(JSON.stringify(s,null,2))
}
