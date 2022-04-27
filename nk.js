import {createBox, createSidebarItem} from "./box"
export async function main (ns){
  var box = createBox("World Greeter","<span style=color:red>Hello world</span>");
 // var side = createSidebarItem("World Greeter","<span style=color:red>Hello world</span>");

  box.log("hello",true)
  ns.tprintf("%s",JSON.stringify(box))
  await ns.sleep(1000)

  box.body="<span style=color:blue>changed to this</span>"
  ns.tprintf("%s",JSON.stringify(box))

  
}