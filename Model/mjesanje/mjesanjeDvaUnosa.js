import { Mjesanje } from "./mjesanje.js"
import { Rezultat } from '../rezultat.js'

export class MjesanjeDvaUnosa extends Mjesanje {
    #bodovaPrviUnos
    #bodovaDrugiUnos
    #zvanjePrviUnos
    #zvanjeDrugiUnos

    constructor(id, stiglja, belot, datumUnosa, zvaoAdut, bodovaPrviUnos, bodovaDrugiUnos, zvanjePrviUnos, zvanjeDrugiUnos) {
        super(id, stiglja, belot, datumUnosa, zvaoAdut)
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
        const b1 = this.getBodovaPrviUnos()
        const b2 = this.getBodovaDrugiUnos()
        const z1 = this.getZvanjePrviUnos()
        const z2 = this.getZvanjeDrugiUnos()
        const zvao = this.getZvaoAdut()
        const isStiglja = this.getStiglja()

        const ukupnoStihovi = b1 + b2
        const ukupnoZvanja = z1 + z2
        const ukupno = ukupnoStihovi + ukupnoZvanja

        if (isStiglja || b1 === 0 || b2 === 0) {
            if (b1 > 0 && b2 === 0) {
                return new Rezultat(ukupnoStihovi + 90 + ukupnoZvanja, 0)
            }
            if (b2 > 0 && b1 === 0) {
                return new Rezultat(0, ukupnoStihovi + 90 + ukupnoZvanja)
            }
        }
        if (zvao === 1) {
            const jeZvaoTotal = b1 + z1
            const nijeZvaoTotal = b2 + z2

            if (jeZvaoTotal > nijeZvaoTotal) {
                return new Rezultat(jeZvaoTotal, nijeZvaoTotal)
            } else {
                return new Rezultat(0, ukupno)
            }
        } else {
            const jeZvaoTotal = b2 + z2
            const nijeZvaoTotal = b1 + z1

            if (jeZvaoTotal > nijeZvaoTotal) {
                return new Rezultat(nijeZvaoTotal, jeZvaoTotal)
            } else {
                return new Rezultat(ukupno, 0)
            }
        }
    }

}