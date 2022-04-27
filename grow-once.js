/** @param {import(".").NS} ns **/
export async function main(ns) {
  var target=ns.args[0];

  var avl = ns.getServerMoneyAvailable(target);
  var max = ns.getServerMaxMoney(target);
  var result = await ns.grow(target);
  var after = avl * result;
  var diff = after - avl;
  ns.tprintf("Result: %f",result);
  ns.tprintf("Available: %f", avl)
  ns.tprintf("Max: %f", max)
  ns.tprintf("After: %f", after)
  ns.tprintf("Diff: %f", diff)

  var cap = Math.min(after,max);
  
  var afterx = formatMillions(cap);
  var maxx = formatMillions(max);
  var diffx = formatMillions(diff)
  
  var message = `${target} grew ${diffx} to ${afterx} of ${maxx} from ${ns.getHostname()}`
  //ns.nFormat(ram,"0,0")

  ns.toast(`${message}`)
  ns.tprint(`${message}`)
  ns.print(`${message}`)
  
}


function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) + 'm';
}