// WEB verzija aplikacije Bela
// Povezuje HTML sučelje s postojećim OOP klasama iz Model foldera

// Uvoz klasa
import { Igrac } from '../../Model/igrac.js'
import { Lokacija } from '../../Model/lokacija.js'
import { PartijaDvaIgraca } from '../../Model/partija/partijaDvaIgraca.js'
import { PartijaTriIgraca } from '../../Model/partija/partijaTriIgraca.js'
import { PartijaDvaPara } from '../../Model/partija/partijaDvaPara.js'
import { MjesanjeDvaUnosa } from '../../Model/mjesanje/mjesanjeDvaUnosa.js'
import { MjesanjeTriUnosa } from '../../Model/mjesanje/mjesanjeTriUnosa.js'

const brojIgraca = document.getElementById('brojIgraca')
const igraci = document.getElementById('igraci')
const pokreni = document.getElementById('pokreni')
const rezultat = document.getElementById('rezultat')
const trenutniRezultatPrikaz = document.getElementById('trenutniRezultat')
const odabirIgraca = document.getElementById('odabirIgraca')
const podaciPartije = document.getElementById('podaciPartije')
const doKolikoSeIgra = document.getElementById('doKolikoSeIgra')
const nastavi = document.getElementById('nastavi')
const longitude = document.getElementById('longitude')
const latitude = document.getElementById('latitude')
const nazivLokacije = document.getElementById('nazivLokacije')
const unosMjesanja = document.getElementById('unosMjesanja')
const unosiBodova = document.getElementById('unosiBodova')
const spremiMjesanje = document.getElementById('spremiMjesanje')
const novaPartija = document.getElementById('novaPartija')
const stiglja = document.getElementById('stiglja')
const belot = document.getElementById('belot')
const zvaoAdut = document.getElementById('zvaoAdut')

let uneseniIgraci = []
let lokacija
let partija

// Kreiranje polja za unos igrača prema odabranom broju igrača
brojIgraca.addEventListener('change', () => {
    igraci.innerHTML = ''

    const broj = Number(brojIgraca.value)

    for (let i = 1; i <= broj; i++) {
        igraci.innerHTML += `
            <div>
                <h3>Igrač ${i}</h3>

                <label for="ime${i}">Ime</label>
                <input type="text" id="ime${i}">

                <label for="prezime${i}">Prezime</label>
                <input type="text" id="prezime${i}">

                <label for="urlSlika${i}">URL slike</label>
                <input type="text" id="urlSlika${i}">

                <label for="spol${i}">Spol</label>
                <select id="spol${i}">
                    <option value="">Odaberi spol</option>
                    <option value="M">Muško</option>
                    <option value="Ž">Žensko</option>
                </select>
            </div>
        `
    }
})

// Kreiranje Igrac objekata iz podataka unesenih u HTML formu
pokreni.addEventListener('click', () => {
    const broj = Number(brojIgraca.value)

    if (broj !== 2 && broj !== 3 && broj !== 4) {
        rezultat.innerHTML = `
            <p>Odaberi broj igrača.</p>
        `
        return
    }

    uneseniIgraci = []

    for (let i = 1; i <= broj; i++) {
        const ime = document.getElementById('ime' + i).value
        const prezime = document.getElementById('prezime' + i).value
        const urlSlika = document.getElementById('urlSlika' + i).value
        const spol = document.getElementById('spol' + i).value

        if (ime.trim() === '') {
            rezultat.innerHTML = `
                <p>Unesi ime igrača ${i}.</p>
            `
            return
        }

        if (prezime.trim() === '') {
            rezultat.innerHTML = `
                <p>Unesi prezime igrača ${i}.</p>
            `
            return
        }

        if (spol === '') {
            rezultat.innerHTML = `
                <p>Odaberi spol igrača ${i}.</p>
            `
            return
        }

        const igrac = new Igrac(
            i,
            ime,
            prezime,
            urlSlika,
            spol
        )

        uneseniIgraci.push(igrac)
    }

    // Ispis igrača na web stranici
    rezultat.innerHTML = '<h2>Uneseni igrači</h2>'

    uneseniIgraci.forEach(igrac => {
        rezultat.innerHTML += `
            <p>${igrac.toString()}</p>
        `
    })

    odabirIgraca.style.display = 'none'
    podaciPartije.style.display = 'block'
})

// Kreiranje partije
nastavi.addEventListener('click', () => {
    const naziv = nazivLokacije.value.trim()
    const cilj = Number(doKolikoSeIgra.value)
    const longitudeBroj = Number(longitude.value)
    const latitudeBroj = Number(latitude.value)

    if (
        doKolikoSeIgra.value === '' ||
        cilj <= 0
    ) {
        rezultat.innerHTML = `
            <p>Unesi ispravan broj bodova do kojeg se igra.</p>
        `
        return
    }

    if (naziv === '') {
        rezultat.innerHTML = `
            <p>Unesi naziv lokacije.</p>
        `
        return
    }

    lokacija = new Lokacija(
        1,
        longitudeBroj,
        latitudeBroj,
        naziv
    )

    const broj = uneseniIgraci.length

    zvaoAdut.innerHTML = ''

    if (broj === 2 || broj === 3) {
        uneseniIgraci.forEach((igrac, index) => {
            zvaoAdut.innerHTML += `
                <option value="${index + 1}">
                    ${igrac.toString()}
                </option>
            `
        })
    }

    if (broj === 4) {
        zvaoAdut.innerHTML = `
            <option value="1">
                ${uneseniIgraci[0].toString()} i
                ${uneseniIgraci[1].toString()}
            </option>

            <option value="2">
                ${uneseniIgraci[2].toString()} i
                ${uneseniIgraci[3].toString()}
            </option>
        `
    }

    const unosi = []
    const mjesanja = []

    // Partija za 2 igrača
    if (broj === 2) {
        partija = new PartijaDvaIgraca(
            1,
            cilj,
            lokacija,
            unosi,
            mjesanja,
            uneseniIgraci
        )
    }

    // Partija za 3 igrača
    if (broj === 3) {
        partija = new PartijaTriIgraca(
            1,
            cilj,
            lokacija,
            unosi,
            mjesanja,
            uneseniIgraci
        )
    }

    // Partija za 4 igrača
    if (broj === 4) {
        partija = new PartijaDvaPara(
            1,
            cilj,
            lokacija,
            unosi,
            mjesanja,
            uneseniIgraci
        )
    }

    podaciPartije.style.display = 'none'
    unosMjesanja.style.display = 'block'
    unosiBodova.innerHTML = ''

    // Unos bodova za 2 igrača
    if (uneseniIgraci.length === 2) {
        unosiBodova.innerHTML = `
            <h3>${uneseniIgraci[0].toString()}</h3>

            <label for="bodoviPrvi">Bodovi</label>
            <input type="number" id="bodoviPrvi">

            <label for="zvanjePrvi">Zvanje</label>
            <input type="number" id="zvanjePrvi">

            <h3>${uneseniIgraci[1].toString()}</h3>

            <label for="bodoviDrugi">Bodovi</label>
            <input type="number" id="bodoviDrugi">

            <label for="zvanjeDrugi">Zvanje</label>
            <input type="number" id="zvanjeDrugi">
        `
    }

    // Unos bodova za 3 igrača
    if (uneseniIgraci.length === 3) {
        unosiBodova.innerHTML = `
            <h3>${uneseniIgraci[0].toString()}</h3>

            <label for="bodoviPrvi">Bodovi</label>
            <input type="number" id="bodoviPrvi">

            <label for="zvanjePrvi">Zvanje</label>
            <input type="number" id="zvanjePrvi">

            <h3>${uneseniIgraci[1].toString()}</h3>

            <label for="bodoviDrugi">Bodovi</label>
            <input type="number" id="bodoviDrugi">

            <label for="zvanjeDrugi">Zvanje</label>
            <input type="number" id="zvanjeDrugi">

            <h3>${uneseniIgraci[2].toString()}</h3>

            <label for="bodoviTreci">Bodovi</label>
            <input type="number" id="bodoviTreci">

            <label for="zvanjeTreci">Zvanje</label>
            <input type="number" id="zvanjeTreci">
        `
    }

    // Unos bodova za 4 igrača - dva para
    if (uneseniIgraci.length === 4) {
        unosiBodova.innerHTML = `
            <h3>
                ${uneseniIgraci[0].toString()} i
                ${uneseniIgraci[1].toString()}
            </h3>

            <label for="bodoviPrvi">Bodovi</label>
            <input type="number" id="bodoviPrvi">

            <label for="zvanjePrvi">Zvanje</label>
            <input type="number" id="zvanjePrvi">

            <h3>
                ${uneseniIgraci[2].toString()} i
                ${uneseniIgraci[3].toString()}
            </h3>

            <label for="bodoviDrugi">Bodovi</label>
            <input type="number" id="bodoviDrugi">

            <label for="zvanjeDrugi">Zvanje</label>
            <input type="number" id="zvanjeDrugi">
        `
    }

    rezultat.innerHTML += `
        <h2>Podaci partije</h2>

        <p>Do koliko se igra: ${doKolikoSeIgra.value}</p>

        <p>Lokacija: ${lokacija.getNaziv()}</p>
    `
})

// Miješanje igrača
spremiMjesanje.addEventListener('click', () => {
    const bodoviPrviInput = document.getElementById('bodoviPrvi')
    const zvanjePrviInput = document.getElementById('zvanjePrvi')
    const bodoviDrugiInput = document.getElementById('bodoviDrugi')
    const zvanjeDrugiInput = document.getElementById('zvanjeDrugi')

    if (
        bodoviPrviInput.value === '' ||
        zvanjePrviInput.value === '' ||
        bodoviDrugiInput.value === '' ||
        zvanjeDrugiInput.value === ''
    ) {
        trenutniRezultatPrikaz.innerHTML = `
            <p>Unesi sve bodove i zvanja.</p>
        `
        return
    }

    const bodoviPrvi = Number(bodoviPrviInput.value)
    const zvanjePrvi = Number(zvanjePrviInput.value)
    const bodoviDrugi = Number(bodoviDrugiInput.value)
    const zvanjeDrugi = Number(zvanjeDrugiInput.value)

    if (
        bodoviPrvi < 0 ||
        zvanjePrvi < 0 ||
        bodoviDrugi < 0 ||
        zvanjeDrugi < 0
    ) {
        trenutniRezultatPrikaz.innerHTML = `
            <p>Bodovi i zvanja ne mogu biti negativni.</p>
        `
        return
    }

    let bodoviTreci = 0
    let zvanjeTreci = 0

    if (uneseniIgraci.length === 3) {
        const bodoviTreciInput =
            document.getElementById('bodoviTreci')

        const zvanjeTreciInput =
            document.getElementById('zvanjeTreci')

        if (
            bodoviTreciInput.value === '' ||
            zvanjeTreciInput.value === ''
        ) {
            trenutniRezultatPrikaz.innerHTML = `
                <p>Unesi sve bodove i zvanja.</p>
            `
            return
        }

        bodoviTreci = Number(bodoviTreciInput.value)
        zvanjeTreci = Number(zvanjeTreciInput.value)

        if (
            bodoviTreci < 0 ||
            zvanjeTreci < 0
        ) {
            trenutniRezultatPrikaz.innerHTML = `
                <p>Bodovi i zvanja ne mogu biti negativni.</p>
            `
            return
        }
    }

    const imaStiglju = stiglja.value === 'true'
    const imaBelot = belot.value === 'true'
    const zvaoJe = Number(zvaoAdut.value)
    const idMjesanja = partija.getMjesanja().length + 1

    let mjesanje

    // Miješanje za 2 ili 4 igrača
    if (
        uneseniIgraci.length === 2 ||
        uneseniIgraci.length === 4
    ) {
        mjesanje = new MjesanjeDvaUnosa(
            idMjesanja,
            imaStiglju,
            imaBelot,
            new Date(),
            zvaoJe,
            bodoviPrvi,
            bodoviDrugi,
            zvanjePrvi,
            zvanjeDrugi
        )
    }

    // Miješanje za 3 igrača
    if (uneseniIgraci.length === 3) {
        mjesanje = new MjesanjeTriUnosa(
            idMjesanja,
            imaStiglju,
            imaBelot,
            new Date(),
            zvaoJe,
            bodoviPrvi,
            bodoviDrugi,
            zvanjePrvi,
            zvanjeDrugi,
            bodoviTreci,
            zvanjeTreci
        )
    }

    // Dodavanje miješanja u partiju
    partija.getMjesanja().push(mjesanje)

    // Dohvaćanje ukupnog rezultata
    const trenutniRezultat = partija.getRezultat()

    // Provjera je li partija gotova
    if (partija.isIgraGotova()) {
        const pobjednikIndex = partija.getPobjednikIndex()

        // Kraj partije za 2 igrača
        if (uneseniIgraci.length === 2) {
            const pobjednik = uneseniIgraci[pobjednikIndex]

            trenutniRezultatPrikaz.innerHTML = `
                <h2>Finalni rezultat</h2>

                <p>
                    ${uneseniIgraci[0].toString()}:
                    ${trenutniRezultat.getPrvi()}
                </p>

                <p>
                    ${uneseniIgraci[1].toString()}:
                    ${trenutniRezultat.getDrugi()}
                </p>

                <h2>Partija je gotova!</h2>

                <p>
                    Pobjednik je ${pobjednik.toString()}
                </p>

                <img src="img/pobjednik.gif" class="pobjednikGif" alt="Pobjednik">
            `

            unosMjesanja.style.display = 'none'
            novaPartija.style.display = 'block'

            return
        }

        // Kraj partije za 3 igrača
        if (uneseniIgraci.length === 3) {
            const pobjednik = uneseniIgraci[pobjednikIndex]

            trenutniRezultatPrikaz.innerHTML = `
                <h2>Finalni rezultat</h2>

                <p>
                    ${uneseniIgraci[0].toString()}:
                    ${trenutniRezultat.getPrvi()}
                </p>

                <p>
                    ${uneseniIgraci[1].toString()}:
                    ${trenutniRezultat.getDrugi()}
                </p>

                <p>
                    ${uneseniIgraci[2].toString()}:
                    ${trenutniRezultat.getTreci()}
                </p>

                <h2>Partija je gotova!</h2>

                <p>
                    Pobjednik je ${pobjednik.toString()}
                </p>

                <img src="img/pobjednik.gif" class="pobjednikGif" alt="Pobjednik">
            `

            unosMjesanja.style.display = 'none'
            novaPartija.style.display = 'block'

            return
        }

        // Kraj partije za 4 igrača
        if (uneseniIgraci.length === 4) {
            const prviIgracPara = pobjednikIndex === 0 ? 0 : 2
            const drugiIgracPara = prviIgracPara + 1

            const pobjednici = `
                ${uneseniIgraci[prviIgracPara].toString()} i
                ${uneseniIgraci[drugiIgracPara].toString()}
            `

            trenutniRezultatPrikaz.innerHTML = `
                <h2>Finalni rezultat</h2>

                <p>
                    ${uneseniIgraci[0].toString()} i
                    ${uneseniIgraci[1].toString()}:
                    ${trenutniRezultat.getPrvi()}
                </p>

                <p>
                    ${uneseniIgraci[2].toString()} i
                    ${uneseniIgraci[3].toString()}:
                    ${trenutniRezultat.getDrugi()}
                </p>

                <h2>Partija je gotova!</h2>

                <p>
                    Pobjednici su ${pobjednici}
                </p>

                <img src="img/pobjednik.gif" class="pobjednikGif" alt="Pobjednik">
            `

            unosMjesanja.style.display = 'none'
            novaPartija.style.display = 'block'

            return
        }
    }

    // Trenutni rezultat za 2 igrača
    if (uneseniIgraci.length === 2) {
        trenutniRezultatPrikaz.innerHTML = `
            <h2>Trenutni rezultat</h2>

            <p>
                ${uneseniIgraci[0].toString()}:
                ${trenutniRezultat.getPrvi()}
            </p>

            <p>
                ${uneseniIgraci[1].toString()}:
                ${trenutniRezultat.getDrugi()}
            </p>
        `
    }

    // Trenutni rezultat za 3 igrača
    if (uneseniIgraci.length === 3) {
        trenutniRezultatPrikaz.innerHTML = `
            <h2>Trenutni rezultat</h2>

            <p>
                ${uneseniIgraci[0].toString()}:
                ${trenutniRezultat.getPrvi()}
            </p>

            <p>
                ${uneseniIgraci[1].toString()}:
                ${trenutniRezultat.getDrugi()}
            </p>

            <p>
                ${uneseniIgraci[2].toString()}:
                ${trenutniRezultat.getTreci()}
            </p>
        `
    }

    // Trenutni rezultat za 4 igrača
    if (uneseniIgraci.length === 4) {
        trenutniRezultatPrikaz.innerHTML = `
            <h2>Trenutni rezultat</h2>

            <p>
                ${uneseniIgraci[0].toString()} i
                ${uneseniIgraci[1].toString()}:
                ${trenutniRezultat.getPrvi()}
            </p>

            <p>
                ${uneseniIgraci[2].toString()} i
                ${uneseniIgraci[3].toString()}:
                ${trenutniRezultat.getDrugi()}
            </p>
        `
    }

    // Čišćenje polja nakon miješanja
    document.getElementById('bodoviPrvi').value = ''
    document.getElementById('zvanjePrvi').value = ''
    document.getElementById('bodoviDrugi').value = ''
    document.getElementById('zvanjeDrugi').value = ''

    if (uneseniIgraci.length === 3) {
        document.getElementById('bodoviTreci').value = ''
        document.getElementById('zvanjeTreci').value = ''
    }

    // Vraćanje stiglje i belota na Ne
    stiglja.value = 'false'
    belot.value = 'false'
})

document.addEventListener('wheel', () => {
    if (document.activeElement.type === 'number') {
        document.activeElement.blur()
    }
})

novaPartija.addEventListener('click', () => {
    window.location.reload()
})