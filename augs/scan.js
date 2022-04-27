import { fn, fm } from 'tools.js'

/** @param {import("..").NS} ns **/
export async function main(ns) {
    const flags = ns.flags([
        ['all',false],
        ['rep',false],
        ['cash',false],
    ])
    if (!flags.all && !flags.rep && !flags.cash) flags.both=true;
    var player = ns.getPlayer();
    var factions = player.factions;
    var pa = ns.getOwnedAugmentations(true );
    var first=true
    for (var f of factions){

        var augs = ns.getAugmentationsFromFaction(f).filter(z=>!pa.includes(z));
        if (augs.length==0) continue;
        if (first) ns.tprintf("╔%s╗","═".repeat(108))
        else ns.tprintf("╠%s╣","═".repeat(108))
        first=false
        var fl = f.length
        var pl = Math.floor((96-fl) / 2)
        ns.tprintf("║%s  %s  %s║","░".repeat(pl),f,"░".repeat(104-(fl+pl)))
        ns.tprintf("╠%s╣","═".repeat(108))
        ns.tprintf("║%108s║"," ")
        for (var a of augs)
        {
            var facRep = ns.getFactionRep(f);
            var augPrice = ns.getAugmentationPrice(a);
            var augRep = ns.getAugmentationRepReq(a);
            var bonus = ns.getAugmentationStats(a);
            if (
                (player.money > augPrice && facRep>augRep) ||
                (flags.cash && player.money > augPrice) ||
                (flags.rep && facRep>augRep) ||
                (flags.all)
            )
            {
            ns.tprintf("║ ► %-78s %12s %12s ║",a,fm(augPrice),fn(Math.max(augRep-facRep,0)||""))
            if (!isEmpty(bonus)) ns.tprintf("║   %-105s║",fancify(bonus))
            ns.tprintf("║%108s║"," ")
            }
        }
    }
    ns.tprintf("╚%108s╝","═".repeat(108))
    ns.tprintf(" ")
} 


function fancify(it)
{
    var they = Object.keys(it);
    var data = they.map(z=>((AugMap[z]||z) + ":" + Math.round((it[z]-1) * 100)+'%')).join(", ")
    return data
}

const AugMap={
    hacknet_node_money_mult:"$",
    hacknet_node_purchase_cost_mult:"Purchase$",
    hacknet_node_level_cost_mult:"Level$",
    hacknet_node_ram_cost_mult:"RAM$",
    hacknet_node_core_cost_mult:"Core$",
    hacking_speed_mult:"HGW-Speed",
    hacking_chance_mult:"Hack%",
    hacking_money_mult:"Hack$",
    hacking_mult:"Hack-Skill",
    hacking_exp_mult:"Hack-XP",
    hacking_grow_mult:"Hack-Grow",
    charisma_exp_mult:"CHR-XP",
    agility_exp_mult:"AGI-XP",
    dexterity_exp_mult:"DEX-XP",
    defense_exp_mult:"DEF-XP",
    strength_exp_mult:"STR-XP",
    dexterity_mult:"DEX",
    agility_mult:"AGI",
    charisma_mult:"CHR",
    strength_mult:"STR",
    defense_mult:"DEF",
    crime_money_mult:"Crime$",
    work_money_mult: "Work$",
    faction_rep_mult: "Fac-Rep",
    company_rep_mult: "Comp-Rep",
    bladeburner_success_chance_mult: "Success",
    bladeburner_stamina_gain_mult:"Stamina Gain",
    bladeburner_analysis_mult:"Analysis",
    bladeburner_max_stamina_mult:"Max Stamina",
    crime_success_mult:"Crime Success"
}


function isEmpty(obj)
{
    for (var x in obj) return false;
    return true
}




/* Does this change on each playthrough?
╠══════════════════════════════════════════════════════════════════════════════════════╣
║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Aevum  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║ ► PCMatrix                                                     $13.718b      61.953k ║
║   CHR:8%, CHR-XP:8%, Comp-Rep:8%, Fac-Rep:8%, Crime$:8%, Crime Success:8%, Work$:78% ║       
╠══════════════════════════════════════════════════════════════════════════════════════╣

*/