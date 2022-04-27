/** @param {import(".").NS} ns **/
export async function main(ns) {
  var target=ns.args[0];
  var stock=ns.args[1] || false
  while (true) {
    await ns.grow(target,{stock:stock});
  }
}

