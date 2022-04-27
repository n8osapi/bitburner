/** @param {import(".").NS} ns **/
export async function main(ns) {
    var target=ns.args[0];
    var amount = await ns.hack(target);
    ns.print(`Finished stealing ${formatMillions(amount)} from ${target}`)
    ns.tprintf(`Finished stealing ${formatMillions(amount)} from ${target}`)
    ns.toast(`Finished stealing ${formatMillions(amount)} from ${target}`)
}

function formatMillions(number) {
  return (number/1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:3 })+'m';
}