/** @param {import(".").NS} ns **/
export async function main(ns) {

    var myArray = [
        {
            userid: "100", 
            projectid: "10",
            rowid: "0"
        },
        {
            userid: "101", 
            projectid: "11",
            rowid: "1"},
        {    
            userid: "102", 
            projectid: "12",
            rowid: "2"},
        {    
            userid: "103", 
            projectid: "13",
            rowid: "3"
        },
        {    
            userid: "101", 
            projectid: "10",
            rowid: "4"
        }]

        var myFilter = [
            {
                userid: "101", 
                projectid: "11"
            },
            {
                userid: "102", 
                projectid: "12"
            },
            {
                userid: "103", 
                projectid: "11"
            }]

           // ns.tprint(Object.getOwnPropertyNames(myFilter[0]))

            const cartesian =
  (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

            var something = cartesian(myArray,myFilter);

           // ns.tprint(JSON.stringify(something,null,2));

            var filtered = something.filter(z=>{
                var match = true;
                var keys = Object.getOwnPropertyNames(z[1]);
                for(var k of keys)
                {
                    if (z[0][k]!=z[1][k]) match=false;
                }
                return match;
            })

            ns.tprint(filtered.map(m=>m[0]));





}

