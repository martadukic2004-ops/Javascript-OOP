import { Entitet } from "./Model/entitet.js"
import { Mjesanje } from "./Model/mjesanje/mjesanje.js"



const m = new Mjesanje(0, false, false, "2020-02-23T18:11:30.983Z")
console.log(m.getId())
console.log(m.getStiglja())
console.log(m.getBelot())
console.log(m.getDatumUnosa())

console.log(m instanceof Mjesanje)
console.log(m instanceof Entitet)

import { MjesanjeDvaUnosa } from './Model/mjesanje/mjesanjeDvaUnosa.js'

const m2 = new MjesanjeDvaUnosa(0, false, true, "2020-02-23T18:11:30.983Z", 152, 10, 0, 20)

console.log(m2.getBodovaPrviUnos())   
console.log(m2.getZvanjeDrugiUnos())  
console.log(m2 instanceof Mjesanje)