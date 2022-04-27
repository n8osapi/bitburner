import { post } from './tools'
import { state } from './early-state';
/** @param {import(".").NS} ns **/
export async function main(ns) {
    ns.disableLog('sleep');
    ns.disableLog('scan');
    while(true){
        var s = state(ns);
        post(ns,"/apiv2/state",s)
        await ns.sleep(6000);
    }
}