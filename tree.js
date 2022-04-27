//import {spider} from 'tools.js'
/** @param {import(".").NS} ns **/
export async function main(ns) {

    var s = spider(ns);

    for(var n of s){
        for(var x of s){
            if (x.children.indexOf(n.value)!=-1){
                n.parent = x.value
            }
        }    
    }
    var p = parentsOf(s,ns.args[0],ns)    

}

function parentsOf(s,value,ns)
{
    ns.tprint(`${value}`)
    var v = find(s,value)
    if (v.parent==null) return;
    return parentsOf(s,v.parent,ns);
}

function find(s,value)
{
    for(var n of s)
    {
        if (n.value==value) return n
    }
    return null;
}

function spider(ns) {
    var servers = [];
    // Return an array of all identifiable servers
    
    // Create a serversSeen array, containing only 'home' for now
    var serversSeen = ['home'];
    
    // For every server we've seen so far, do a scan
    for (var i = 0; i < serversSeen.length; i++) {
        var thisScan = ns.scan(serversSeen[i]);
        var s = new Server(serversSeen[i]);
        // Loop through results of the scan, and add any new servers
        for (var j = 0; j < thisScan.length; j++) {
            // If this server isn't in serversSeen, add it
            if (serversSeen.indexOf(thisScan[j]) === -1) {
                serversSeen.push(thisScan[j]);
                s.children.push(thisScan[j])
            }
        }
        servers.push(s);
    }
    return servers;
}

class Server {
    constructor(value,parent){
        this.value = value;
        this.parent = parent;
        this.children=[];
    }
}