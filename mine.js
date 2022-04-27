/** @param {import(".").NS} ns **/
export async function main(ns) {
    var fmtx = "%8s + %8s + %8s + %10s"
    var fmts = "%8s | %8s | %8s | %10s"
    var fmt =  "%-8s | %8d | %8d | %10d"
    var base = ns.getPurchasedServers();
    base.push('home');
    var purchased = base.map(z=>ns.getServer(z));

    var servers = purchased.map((s)=>(
        {
            host:s.hostname,
            used:s.ramUsed,
            max:s.maxRam,
            available:s.maxRam-s.ramUsed,
            id:  Number(s.hostname.split('-')[1]??-1)
        }))

    var ss = servers.sort((a,b)=>a.id - b.id)

    ns.tprintf(fmts,"Server","Used","Max","Available");
    ns.tprintf(fmtx,"--------","--------","---------","----------");

    var used = 0;
    var max = 0;

    for(var s of ss)
    {
        used += s.used
        max += s.max
        ns.tprintf(fmt,s.host, s.used, s.max, s.available);
    }

    ns.tprintf(fmtx,"--------","--------","--------","----------");
    ns.tprintf(fmt,"Total",used,max,max - used);
}

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}


function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}