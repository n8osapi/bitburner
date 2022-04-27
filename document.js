import {fm,fn, s} from './tools'
/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
    if (args.help) {
        ns.tprint("This script will enhance your HUD (Heads up Display) with custom statistics.");
        ns.tprint(`Usage: run ${ns.getScriptName()}`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()}`);
        return;
    }
    ns.tprint(s(ns.heart.break()))
    ns.exploit()
    ns.alterReality();
    const doc = eval('document');

    const hook0 = doc.getElementById('unclickable');
    ns.tprint(hook0.HT)

    await hook0.click();
    await ns.sleep(1000);
    ns.exit();


    var cache = [];
    var j = JSON.stringify(window, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // Enable garbage collection
    //ns.tprintf("%s",j)


    var p = Object.keys(window);
    ns.tprintf("%s",s(p))


}