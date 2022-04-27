/** @param {import(".").NS} ns **/
export async function main(ns) {
	var servers = ns.scan("home");

	for (var server of servers) {
        ns.tprintf("%-20s %s of %s",server, formatMoney(ns.getServerMoneyAvailable(server)),formatMoney(ns.getServerMaxMoney(server)))
	}
}

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }) + 'm';
}