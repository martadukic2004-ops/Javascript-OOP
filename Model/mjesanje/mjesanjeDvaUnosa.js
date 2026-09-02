 import { Mjesanje } from "./mjesanje.js"
 import { Rezultat } from '../rezultat.js'

export class MjesanjeDvaUnosa extends Mjesanje {
    #bodovaPrviUnos
    #bodovaDrugiUnos
    #zvanjePrviUnos
    #zvanjeDrugiUnos

    constructor(id, stiglja, belot, datumUnosa, bodovaPrviUnos, bodovaDrugiUnos, zvanjePrviUnos, zvanjeDrugiUnos) {
        super(id, stiglja, belot, datumUnosa)
        this.#bodovaPrviUnos = bodovaPrviUnos
        this.#bodovaDrugiUnos = bodovaDrugiUnos
        this.#zvanjePrviUnos = zvanjePrviUnos
        this.#zvanjeDrugiUnos = zvanjeDrugiUnos
    }

    getBodovaPrviUnos() {
        return this.#bodovaPrviUnos
    }
    setBodovaPrviUnos(bodovaPrviUnos) {
        this.#bodovaPrviUnos = bodovaPrviUnos
    }

    getBodovaDrugiUnos() {
        return this.#bodovaDrugiUnos
    }
    setBodovaDrugiUnos(bodovaDrugiUnos) {
        this.#bodovaDrugiUnos = bodovaDrugiUnos
    }

    getZvanjePrviUnos() {
        return this.#zvanjePrviUnos
    }
    setZvanjePrviUnos(zvanjePrviUnos) {
        this.#zvanjePrviUnos = zvanjePrviUnos
    }

    getZvanjeDrugiUnos() {
        return this.#zvanjeDrugiUnos
    }
    setZvanjeDrugiUnos(zvanjeDrugiUnos) {
        this.#zvanjeDrugiUnos = zvanjeDrugiUnos
    }

    getRezultat() {
        return new Rezultat( 
        this.getBodovaPrviUnos() + this.getZvanjePrviUnos(),
        this.getBodovaDrugiUnos() + this.getZvanjeDrugiUnos(),
    )
    }
}