/** @param {import(".").NS} ns **/
export async function main(ns) {
while (true){
    // var wait = ns.commitCrime("Shoplift")
    // await ns.sleep(wait);
    // while (ns.isBusy()){
    //     await ns.sleep(1)
    // }
    var wait = ns.commitCrime("Mug someone")
    await ns.sleep(wait);
    while (ns.isBusy()){
        await ns.sleep(1)
    }
    // var wait = ns.commitCrime("Homicide")
    // await ns.sleep(wait);
    // while (ns.isBusy()){
    //     await ns.sleep(1)
    // }
}
}