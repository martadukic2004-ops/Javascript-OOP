import { Entitet } from '../entitet.js'

export class Mjesanje extends Entitet {
    #stiglja
    #belot
    #datumUnosa

    constructor(id, stiglja, belot, datumUnosa) {
        super(id)
        this.#stiglja = stiglja
        this.#belot = belot
        this.#datumUnosa = datumUnosa
    }

    getStiglja() {
        return this.#stiglja
    }
    setStiglja(stiglja) {
        this.#stiglja = stiglja
    }

    getBelot() {
        return this.#belot
    }
    setBelot(belot) {
        this.#belot = belot
    }

    getDatumUnosa() {
        return this.#datumUnosa
    }
    setDatumUnosa(datumUnosa) {
        this.#datumUnosa = datumUnosa

    }
}