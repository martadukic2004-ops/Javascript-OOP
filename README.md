# JavaScript-OOP

Implementacija principa objektno orijentiranog programiranja (OOP) u JavaScriptu kroz primjer aplikacije za praćenje rezultata kartaške igre Bela.

Projekt je napravljen prema primjeru iz repozitorija [OOP_JAVA_PHP_PYTHON_SWIFT](https://github.com/tjakopec/OOP_JAVA_PHP_PYTHON_SWIFT), u kojem je isti model implementiran u više programskih jezika.

## O projektu

Program učitava podatke o partijama Bele iz datoteke `podaci.json`, pretvara ih u objekte odgovarajućih klasa, izračunava ukupne rezultate i provjerava je li pojedina partija završena.

Podržane su tri vrste partije:

* partija s dva igrača
* partija s tri igrača
* partija s dva para, odnosno četiri igrača

## Primijenjeni OOP principi

### Klase i objekti

Klase predstavljaju dijelove sustava za praćenje rezultata Bele, poput igrača, lokacije, miješanja i partije.

Na temelju klasa stvaraju se konkretni objekti s podacima iz datoteke `podaci.json`.

### Učahurivanje

Svojstva klasa definirana su kao privatna pomoću znaka `#`.

Pristup privatnim svojstvima omogućen je pomoću javnih getter i setter metoda.

Primjer:

```js
getIme() {
    return this.#ime
}

setIme(ime) {
    this.#ime = ime
}
```

### Nasljeđivanje

Zajednička svojstva i metode definirani su u roditeljskim klasama, a podklase ih nasljeđuju i proširuju.

Primjeri nasljeđivanja:

* `Igrac`, `Lokacija`, `Mjesanje` i `Partija` nasljeđuju klasu `Entitet`
* `MjesanjeDvaUnosa` nasljeđuje klasu `Mjesanje`
* `MjesanjeTriUnosa` nasljeđuje klasu `MjesanjeDvaUnosa`
* `PartijaDvaIgraca` i `PartijaDvaPara` nasljeđuju klasu `Partija`
* `PartijaTriIgraca` nasljeđuje klasu `PartijaDvaIgraca`

### Polimorfizam

Podklase imaju vlastite implementacije metoda `getRezultat()` i `toString()`.

`MjesanjeDvaUnosa` računa rezultate za dva unosa, dok `MjesanjeTriUnosa` proširuje to ponašanje dodavanjem trećeg rezultata.

Svaka vrsta partije pomoću metode `toString()` prikazuje rezultat na način koji odgovara broju igrača.

## Struktura projekta

```text
JavaScript-OOP/
├── Model/
│   ├── entitet.js
│   ├── igrac.js
│   ├── lokacija.js
│   │
│   ├── mjesanje/
│   │   ├── mjesanje.js
│   │   ├── mjesanjeDvaUnosa.js
│   │   └── mjesanjeTriUnosa.js
│   │
│   └── partija/
│       ├── partija.js
│       ├── partijaDvaIgraca.js
│       ├── partijaTriIgraca.js
│       └── partijaDvaPara.js
│
├── main.js
├── podaci.json
├── package.json
└── README.md
```

## Klase

### `Entitet`

Osnovna klasa koja sadrži identifikacijski broj objekta.

### `Igrac`

Sadrži podatke o igraču:

* ime
* prezime
* URL slike
* spol

Metoda `toString()` vraća ime i prezime igrača.

### `Lokacija`

Sadrži naziv lokacije te geografsku dužinu i širinu.

### `Mjesanje`

Osnovna klasa za zajedničke podatke o jednom miješanju:

* štiglja
* belot
* datum unosa

### `MjesanjeDvaUnosa`

Sadrži bodove i zvanja za dva unosa te računa njihov rezultat.

### `MjesanjeTriUnosa`

Nasljeđuje računanje prva dva rezultata i dodaje bodove, zvanje i rezultat trećeg unosa.

### `Partija`

Sadrži zajedničke podatke o partiji, zbraja rezultate svih miješanja i provjerava je li igra završena.

### `PartijaDvaIgraca`

Prikazuje rezultate dvaju pojedinačnih igrača.

### `PartijaTriIgraca`

Zbraja i prikazuje rezultate triju pojedinačnih igrača.

### `PartijaDvaPara`

Grupira četiri igrača u dva para i prikazuje rezultat svakog para.

## Pokretanje programa

Za pokretanje programa potrebno je imati instaliran Node.js.

U glavnoj mapi projekta pokreće se naredba:

```bash
node main.js
```

## Rezultat izvođenja

Program ispisuje rezultate svih partija iz datoteke `podaci.json`.

```text
Partija DVA IGRAČA, igra gotova: false, Tomislav Jakopec: 162 | Marijan Zidar: 202
Partija TRI IGRAČA, igra gotova: true, Tomislav Jakopec: 60 | Marijan Zidar: 576 | Marija Zimska: 456
Partija DVA PARA, igra gotova: false, Tomislav Jakopec i Marijan Zidar: 162 | Marija Zimska i Anita Račman: 202
```
