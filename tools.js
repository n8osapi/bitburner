
/*
  ┌ ┬ ┐ ╔ ╦ ╗ ─ │═ ║                
  ├ ┼ ┤ ╠ ╬ ╣ ▀ ▄ █ ▌ ▐  
  └ ┴ ┘ ╚ ╩ ╝ ░ ▒ ▓
  ╒ ╤ ╕ ╓ ╥ ╖
  ╞ ╪ ╡ ╟ ╫ ╢
  ╘ ╧ ╛ ╙ ╨ ╜
*/

/** @param {import(".").NS} ns **/
function spider(ns) {
    var serversSeen = ['home'];
    for (var i = 0; i < serversSeen.length; i++) {
        var thisScan = ns.scan(serversSeen[i]); // 0.02 GB
        for (var j = 0; j < thisScan.length; j++) {
            if (serversSeen.indexOf(thisScan[j]) === -1) {
                serversSeen.push(thisScan[j]);
            }
        }
    }
    return serversSeen;
}

/** @param {import(".").NS} ns **/
function rootedServers(ns)
{
    var p = ns.getPlayer();  // 0.50 GB
    var servers = Servers(ns)
        //.filter(f=>!f.purchasedByPlayer)
        .filter(f=>f.hasAdminRights)
        .filter(f=>f.requiredHackingSkill <= p.hacking)
    return servers;
}

/** @param {import(".").NS} ns **/
function Servers(ns)
{
    var servers = spider(ns).map(z=>ns.getServer(z)) // 2.00 GB
    return servers;
}

function formatMillions(number) {
	return (number / 1000000.0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }) + 'm';
}

function post(ns, url, data)
{
    //if (ns)ns.print(url)
    var body = JSON.stringify(data);
    //if(ns) ns.print(body)
    var http = new XMLHttpRequest();
    http.open('POST', 'http://localhost:8080'+ url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send(body)
    //if(ns) ns.print("Done Sending")
}

function s(value,replacer=null,space=3)
{
    return JSON.stringify(value,replacer,space)
}

function fm(num,opt={ style: 'currency', currency: 'USD', minimumFractionDigits: 3 }){
    var x = num
    var abv = ""
    if (Math.abs(num)>=1000000000000000){
        x= num/1000000000000000
        abv="q"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000000000000){
        x= num/1000000000000
        abv="t"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000000000){
        x= num/1000000000
        abv="b"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000000){
        x=num/1000000
        abv = "m"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000){
        x=num/1000
        abv = "k"
        return x.toLocaleString('en-US', opt) + abv;
    }
    return x.toLocaleString('en-US', opt) + " ";
}

function fn(num,opt={minimumFractionDigits:3}){
    var x = num
    var abv = ""
    if (Math.abs(num)>=1000000000000000){
        x= num/1000000000000000
        abv="q"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000000000000){
        x= num/1000000000000
        abv="t"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000000000){
        x= num/1000000000
        abv="b"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000000){
        x=num/1000000
        abv = "m"
        return x.toLocaleString('en-US', opt) + abv;
    }
    if (Math.abs(num)>=1000){
        x=num/1000
        abv = "k"
        return x.toLocaleString('en-US', opt) + abv;
    }
    return x.toLocaleString('en-US', opt) +" ";
}
const zeroPad = (num, places) => String(num).padStart(places, '0')

function ft(time){
    if (time==0) return ""
    var d = new Date(time)
    if (d.getUTCHours()>0) return d.getUTCHours() + ":" + zeroPad(d.getUTCMinutes(),2) + ":" + zeroPad(d.getUTCSeconds(),2) 
    return d.getUTCMinutes() + ":" + zeroPad(d.getUTCSeconds(),2)
}




const Symbols=
{ 
    "ECP"  : "ECorp",
    "MGCP" : "MegaCorp",
    "BLD"  : "Blade Industries",
    "CLRK" : "Clarke Incorporated",
    "OMTK" : "OmniTek Incorporated",
    "FSIG" : "Four Sigma",
    "KGI"  : "KuaiGong International",
    "FLCM" : "Fulcrum Technologies",
    "STM"  : "Storm Technologies",
    "DCOMM": "DefComm",
    "HLS"  : "Helios Labs",
    "VITA" : "VitaLife",
    "ICRS" : "Icarus Microsystems",
    "UNV"  : "Universal Energy",
    "AERO" : "AeroCorp",
    "OMN"  : "Omnia Cybersystems",
    "SLRS" : "Solaris Space Systems",
    "GPH"  : "Global Pharmaceuticals",
    "NVMD" : "Nova Medical",
    "WDS"  : "Watchdog Security",
    "LXO"  : "LexoCorp",
    "RHOC" : "Rho Construction",
    "APHE" : "Alpha Enterprises",
    "SYSC" : "SysCore Securities",
    "CTK"  : "CompuTek",
    "NTLK" : "NetLink  Technologies",
    "OMGA" : "Omega Software",
    "FNS"  : "FoodNStuff",
    "JGN"  : "Joe's Guns",
    "SGC"  : "Sigma Cosmetics",
    "CTYS" : "Catalyst Ventures",
    "MDYN" : "Microdyne Technologies",
    "TITN" : "Titan Laboratories"
    }

export { post, spider, rootedServers, formatMillions, fn, fm, ft, Symbols, Servers, s}