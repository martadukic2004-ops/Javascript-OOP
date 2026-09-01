import { Entitet } from "./Model/entitet.js"
import { Mjesanje } from "./Model/mjesanje/mjesanje.js"



const m = new Mjesanje(0, false, false, "2020-02-23T18:11:30.983Z")
console.log(m.getId())
console.log(m.getStiglja())
console.log(m.getBelot())
console.log(m.getDatumUnosa())

console.log(m instanceof Mjesanje)
console.log(m instanceof Entitet)

