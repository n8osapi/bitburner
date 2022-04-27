/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target=ns.getHostname();
    while (true) {
        await ns.grow(target);
        ns.sprintf(" %.9s available of %.9s", formatMillions(ns.getServerMoneyAvailable(target)), formatMillions(ns.getServerMaxMoney(target)))
    }
}

function formatMillions(number) {
  return (number/1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:3 })+'m';
}