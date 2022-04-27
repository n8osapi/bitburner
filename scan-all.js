import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {

	for (var target of spider(ns)) {
		var s = ns.getServer(target)
		if (!s.purchasedByPlayer && s.moneyMax>0)
			ns.tprintf("%-24s | %14s of %15s | %5.2f / %5.2f | %6.2f %% | %7d | %2d", 
				s.hostname + ` (${s.maxRam})` + (s.hasAdminRights?" R":""), 
				formatMillions(s.moneyAvailable), 
				formatMillions(s.moneyMax), 
				s.minDifficulty, 
				s.hackDifficulty, 
				ns.hackAnalyzeChance(s.hostname)*100.0,
				s.moneyAvailable>0?Math.ceil(ns.growthAnalyze(s.hostname,(s.moneyMax??1)/(s.moneyAvailable??1))):0,
				s.numOpenPortsRequired
			)		
	}
}

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }) + 'm';
}