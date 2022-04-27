import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {
var files = [];
	for (var target of spider(ns)) {
		var s = ns.getServer(target)
		if (!s.purchasedByPlayer)
        {
            var f = ns.ls(target,"cct");
            if (f.length>0)
            files.push({target:target,files:ns.ls(target)})         
        }
				
	}

    ns.tprint(JSON.stringify(files,null,2));
}
