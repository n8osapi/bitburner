/** @param {import(".").NS} ns **/
export async function main(ns) {
    var amount = ns.args[0] * 1000000;
    var target = ns.args[1];
    var threads = ns.hackAnalyzeThreads(target,amount);
    ns.tprintf("you'll need %f threads to steal %s from %s",threads,formatMillions(amount),target)
}

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}