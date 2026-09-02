import { Rezultat } from '../rezultat.js'
import { MjesanjeDvaUnosa } from "./mjesanjeDvaUnosa.js"

export class MjesanjeTriUnosa extends MjesanjeDvaUnosa {
    #bodovaTreciUnos
    #zvanjeTreciUnos

    constructor(id, stiglja, belot, datumUnosa, bodovaPrviUnos, bodovaDrugiUnos, zvanjePrviUnos, zvanjeDrugiUnos, bodovaTreciUnos, zvanjeTreciUnos) {
        super(id, stiglja, belot, datumUnosa, bodovaPrviUnos, bodovaDrugiUnos, zvanjePrviUnos, zvanjeDrugiUnos)
        this.#bodovaTreciUnos = bodovaTreciUnos
        this.#zvanjeTreciUnos = zvanjeTreciUnos
    }

    getBodovaTreciUnos() {
        return this.#bodovaTreciUnos
    }
    setBodovaTreciUnos(bodovaTreciUnos) {
        this.#bodovaTreciUnos = bodovaTreciUnos
    }

    getZvanjeTreciUnos() {
        return this.#zvanjeTreciUnos
    }
    setZvanjeTreciUnos(zvanjeTreciUnos) {
        this.#zvanjeTreciUnos = zvanjeTreciUnos
    }

   getRezultat() {
    return new Rezultat(
        this.getBodovaPrviUnos() + this.getZvanjePrviUnos(),
        this.getBodovaDrugiUnos() + this.getZvanjeDrugiUnos(),
        this.getBodovaTreciUnos() + this.getZvanjeTreciUnos()
    )
}
}