import { Entitet } from '../entitet.js'

export class Partija extends Entitet {
    #doKolikoSeIgra
    #lokacija
    #unosi
    #mjesanja
    #igraci

    constructor(id, doKolikoSeIgra, lokacija, unosi, mjesanja, igraci) {
        super(id)
        this.#doKolikoSeIgra = doKolikoSeIgra
        this.#lokacija = lokacija
        this.#unosi = unosi
        this.#mjesanja = mjesanja
        this.#igraci = igraci
    }

    getDoKolikoSeIgra() {
        return this.#doKolikoSeIgra
    }
    setDoKolikoSeIgra(doKolikoSeIgra) {
        this.#doKolikoSeIgra = doKolikoSeIgra
    }

    getLokacija() {
        return this.#lokacija
    }
    setLokacija(lokacija) {
        this.#lokacija = lokacija
    }

    getUnosi() {
        return this.#unosi
    }
    setUnosi(unosi) {
        this.#unosi = unosi
    }

    getMjesanja() {
        return this.#mjesanja
    }
    setMjesanja(mjesanja) {
        this.#mjesanja = mjesanja
    }

    getIgraci() {
        return this.#igraci
    }
    setIgraci(igraci) {
        this.#igraci = igraci
    }

    getRezultat() {
        let prvi = 0
        let drugi = 0

        this.getMjesanja().forEach(mjesanje => {
            const rezultatMjesanja = mjesanje.getRezultat()

            prvi += rezultatMjesanja.prvi
            drugi += rezultatMjesanja.drugi
        })

        return {
            prvi: prvi,
            drugi: drugi,
            treci: 0
        }
    }

    isIgraGotova() {
        const rezultat = this.getRezultat()

        const igraNijePocela =
            rezultat.prvi === 0 &&
            rezultat.drugi === 0 &&
            rezultat.treci === 0

        if (igraNijePocela) {
            return false
        }

        if (rezultat.treci === 0) {
            if (rezultat.prvi === rezultat.drugi) {
                return false
            }

            return rezultat.prvi > this.getDoKolikoSeIgra() ||
                rezultat.drugi > this.getDoKolikoSeIgra()
        }

        const postojiIzjednacenje =
            rezultat.prvi === rezultat.drugi ||
            rezultat.prvi === rezultat.treci ||
            rezultat.drugi === rezultat.treci

        if (postojiIzjednacenje) {
            return false
        }

        return rezultat.prvi > this.getDoKolikoSeIgra() ||
            rezultat.drugi > this.getDoKolikoSeIgra() ||
            rezultat.treci > this.getDoKolikoSeIgra()
    }
}