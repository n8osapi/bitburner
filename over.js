import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
    var p = ns.getPlayer();
	var servers = spider(ns).map(z=>ns.getServer(z)).sort((a,b)=>a.requiredHackingSkill-b.requiredHackingSkill)
	for (var s of servers) {
		if (!s.purchasedByPlayer && s.moneyMax>0 && s.requiredHackingSkill>p.hacking)
			ns.tprintf("%-25s | %14s of %15s | %5.2f / %5.2f | %6.2f %% | %7d | %2d | %d", 
				s.hostname + ` (${s.maxRam})` + (s.hasAdminRights?" R":""), 
				formatMillions(s.moneyAvailable), 
				formatMillions(s.moneyMax), 
				s.minDifficulty, 
				s.hackDifficulty, 
				ns.hackAnalyzeChance(s.hostname)*100.0,
				s.moneyAvailable>0?Math.ceil(ns.growthAnalyze(s.hostname,(s.moneyMax??1)/(s.moneyAvailable??1))):0,
				s.numOpenPortsRequired,
                s.requiredHackingSkill
			)		
	}
}

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }) + 'm';
}