//TESTIRANJE mjesanje.js
import { Entitet } from "./Model/entitet.js"
import { Mjesanje } from "./Model/mjesanje/mjesanje.js"



const m = new Mjesanje(0, false, false, "2020-02-23T18:11:30.983Z")
console.log(m.getId())
console.log(m.getStiglja())
console.log(m.getBelot())
console.log(m.getDatumUnosa())

console.log(m instanceof Mjesanje)
console.log(m instanceof Entitet)


//TESTIRANJE mjesanjeDvaUnosa.js
import { MjesanjeDvaUnosa } from './Model/mjesanje/mjesanjeDvaUnosa.js'

const m2 = new MjesanjeDvaUnosa(0, false, true, "2020-02-23T18:11:30.983Z", 152, 10, 0, 20)

console.log(m2.getBodovaPrviUnos())   
console.log(m2.getZvanjeDrugiUnos())  
console.log(m2 instanceof Mjesanje)


//TESTIRANJE mjesanjeTriUnosa.js
import { MjesanjeTriUnosa } from './Model/mjesanje/mjesanjeTriUnosa.js';

const m3 = new MjesanjeTriUnosa(0, false, false, "2020-02-23T18:11:30.984Z", 10, 76, 0, 20, 76, 0);

console.log(m3.getBodovaTreciUnos())
console.log(m3.getZvanjeTreciUnos())
console.log(m3.getBodovaPrviUnos())
console.log(m3 instanceof MjesanjeDvaUnosa)


//TESTIRANJE lokacija.js
import { Lokacija } from './Model/lokacija.js'

const l = new Lokacija(1, 18.6098766, 45.5605825, "Caffe Bar Peppermint")

console.log(l.getId())
console.log(l.getNaziv())
console.log(l.getLongitude())
console.log(l.getLatitude())
console.log(l instanceof Entitet)