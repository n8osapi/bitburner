/** @param {import("..").NS} ns **/
export async function main(ns) {
    var price = ns.getAugmentationPrice("NeuroFlux Governor")
    var rep = ns.getAugmentationRepReq("NeuroFlux Governor")
    //var result = ns.purchaseAugmentation(ns.args[0], ns.args[1])
    ns.tprintf("%s %s", x(price), x(rep))
} 

const COUNT_ABBRS = [ '', 'k', 'm', 'b', 't', 'p'];

function x(count, withAbbr = true, decimals = 3) {
    const i     = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
    let result  = parseFloat((count / Math.pow(1000, i)).toFixed(decimals));
    if(withAbbr) {
        result += `${COUNT_ABBRS[i]}`; 
    }
    return result;
}
