/** @param {import(".").NS} ns **/
export async function main(ns) {
    var result = eval(ns.args[0])
    if (result) ns.tprintf("%s",JSON.stringify(result))
}