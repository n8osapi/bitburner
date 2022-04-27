/** @param {import(".").NS} ns **/
export async function main(ns) {
    for(var i = 0; i<ns.args[1]; i++)
    {
        ns.toast((ns.args[1]-i)+ " to go")
        var wait = await ns.commitCrime(ns.args[0])
        await ns.sleep(wait);
        while (ns.isBusy()){
            await ns.sleep(100)
        }
    }
}
