import { Rezultat } from '../rezultat.js'
import { MjesanjeDvaUnosa } from "./mjesanjeDvaUnosa.js"

export class MjesanjeTriUnosa extends MjesanjeDvaUnosa {
    #bodovaTreciUnos
    #zvanjeTreciUnos

    constructor(id, stiglja, belot, datumUnosa, zvaoAdut, bodovaPrviUnos, bodovaDrugiUnos, zvanjePrviUnos, zvanjeDrugiUnos, bodovaTreciUnos, zvanjeTreciUnos) {
        super(id, stiglja, belot, datumUnosa, zvaoAdut, bodovaPrviUnos, bodovaDrugiUnos, zvanjePrviUnos, zvanjeDrugiUnos)
        this.#bodovaTreciUnos = Number (bodovaTreciUnos)
        this.#zvanjeTreciUnos = Number (zvanjeTreciUnos)
    }

    getBodovaTreciUnos() {
        return this.#bodovaTreciUnos
    }
    setBodovaTreciUnos(bodovaTreciUnos) {
        this.#bodovaTreciUnos = Number (bodovaTreciUnos)
    }

    getZvanjeTreciUnos() {
        return this.#zvanjeTreciUnos
    }
    setZvanjeTreciUnos(zvanjeTreciUnos) {
        this.#zvanjeTreciUnos = Number (zvanjeTreciUnos)
    }

    getRezultat() {
        const b1 = this.getBodovaPrviUnos()
        const b2 = this.getBodovaDrugiUnos()
        const b3 = this.getBodovaTreciUnos()

        const z1 = this.getZvanjePrviUnos()
        const z2 = this.getZvanjeDrugiUnos()
        const z3 = this.getZvanjeTreciUnos()

        const zvao = this.getZvaoAdut() // 1, 2 ili 3
        const jeZvaoIdx = zvao - 1
        const nisuZvali = [0, 1, 2].filter(i => i !== jeZvaoIdx)
        const nisuZvali1Idx = nisuZvali[0]
        const nisuZvali2Idx = nisuZvali[1]

        const bodovi = [b1, b2, b3]
        const zvanja = [z1, z2, z3]

        const ukupnoStihovi = b1 + b2 + b3
        const ukupnoZvanja = z1 + z2 + z3
        const ukupno = ukupnoStihovi + ukupnoZvanja

        const rez = [0, 0, 0]
        const nulaBodova = [0, 1, 2].filter(i => bodovi[i] === 0)

        if (bodovi[nisuZvali1Idx] === 0 && bodovi[nisuZvali2Idx] === 0) {
            rez[jeZvaoIdx] = ukupnoStihovi + 90 + ukupnoZvanja
            return new Rezultat(rez[0], rez[1], rez[2])
        }
        if (bodovi[jeZvaoIdx] === 0 && nulaBodova.length >= 2) {
            const pobjednikObraneIdx = nisuZvali.find(i => bodovi[i] > 0)
            if (pobjednikObraneIdx !== undefined) {
                rez[pobjednikObraneIdx] = ukupnoStihovi + 90 + ukupnoZvanja
            } else {
                this.#podijeliObrana(rez, nisuZvali1Idx, nisuZvali2Idx, bodovi, ukupnoStihovi + 90 + ukupnoZvanja)
            }
            return new Rezultat(rez[0], rez[1], rez[2])
        }
        if (nulaBodova.length === 1 && bodovi[jeZvaoIdx] > 0) {
            const nulaIdx = nulaBodova[0]
            const dobarObranaIdx = nisuZvali.find(i => i !== nulaIdx)

            rez[jeZvaoIdx] = ukupnoStihovi + 90 + zvanja[jeZvaoIdx] + zvanja[nulaIdx]
            rez[dobarObranaIdx] = bodovi[dobarObranaIdx] + zvanja[dobarObranaIdx]
            rez[nulaIdx] = 0

            return new Rezultat(rez[0], rez[1], rez[2])
        }
        const jeZvaoTotal = bodovi[jeZvaoIdx] + zvanja[jeZvaoIdx]
        const nisuZvali1Total = bodovi[nisuZvali1Idx] + zvanja[nisuZvali1Idx]
        const nisuZvali2Total = bodovi[nisuZvali2Idx] + zvanja[nisuZvali2Idx]
        const obranaTotal = nisuZvali1Total + nisuZvali2Total

        if (jeZvaoTotal > obranaTotal) {
            rez[jeZvaoIdx] = jeZvaoTotal
            rez[nisuZvali1Idx] = nisuZvali1Total
            rez[nisuZvali2Idx] = nisuZvali2Total
        } else {
            rez[jeZvaoIdx] = 0
            this.#podijeliObrana(rez, nisuZvali1Idx, nisuZvali2Idx, bodovi, ukupno)
        }

        return new Rezultat(rez[0], rez[1], rez[2])
    }

    #podijeliObrana(rez, idx1, idx2, bodovi, iznos) {
        const pola = Math.floor(iznos / 2)
        const ostatak = iznos % 2

        if (ostatak === 0) {
            rez[idx1] = pola
            rez[idx2] = pola
        } else {
            if (bodovi[idx1] >= bodovi[idx2]) {
                rez[idx1] = pola + 1
                rez[idx2] = pola
            } else {
                rez[idx1] = pola
                rez[idx2] = pola + 1
            }
        }
    }
}
