/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target = ns.args[0]
    while (true) {
        var amount = await ns.weaken(target);
        if (amount>1) ns.toast(ns.sprintf("%s: weakened by %f",target,amount.toFixed(2)))
		await ns.sleep(1000)
	}
}