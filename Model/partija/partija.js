import { Entitet } from '../entitet.js'
import { Rezultat } from '../rezultat.js'

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
        let treci = 0

        this.getMjesanja().forEach(mjesanje => {
            const rezultatMjesanja = mjesanje.getRezultat()

            prvi += rezultatMjesanja.getPrvi()
            drugi += rezultatMjesanja.getDrugi()
            treci += rezultatMjesanja.getTreci()
        })

        return new Rezultat(prvi, drugi, treci)
    }

        isIgraGotova() {
        const rezultat = this.getRezultat()

        const igraNijePocela =
            rezultat.getPrvi() === 0 &&
            rezultat.getDrugi() === 0 &&
            rezultat.getTreci() === 0

        if (igraNijePocela) {
            return false
        }

        if (rezultat.getTreci() === 0) {
            if (rezultat.getPrvi() === rezultat.getDrugi()) {
                return false
            }

            return rezultat.getPrvi() > this.getDoKolikoSeIgra() ||
                rezultat.getDrugi() > this.getDoKolikoSeIgra()
        }

        const postojiIzjednacenje =
            rezultat.getPrvi() === rezultat.getDrugi() ||
            rezultat.getPrvi() === rezultat.getTreci() ||
            rezultat.getDrugi() === rezultat.getTreci()

        if (postojiIzjednacenje) {
            return false
        }

        return rezultat.getPrvi() > this.getDoKolikoSeIgra() ||
            rezultat.getDrugi() > this.getDoKolikoSeIgra() ||
            rezultat.getTreci() > this.getDoKolikoSeIgra()
    }
}