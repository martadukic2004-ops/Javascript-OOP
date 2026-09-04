# JavaScript-OOP

Implementacija principa objektno orijentiranog programiranja (OOP) u JavaScriptu kroz primjer aplikacije za praćenje rezultata kartaške igre Bela.

Projekt je napravljen prema primjeru iz repozitorija [OOP_JAVA_PHP_PYTHON_SWIFT](https://github.com/tjakopec/OOP_JAVA_PHP_PYTHON_SWIFT), u kojem je isti model implementiran u više programskih jezika.

## O projektu

Projekt prikazuje primjenu objektno orijentiranog programiranja u JavaScriptu kroz aplikaciju za praćenje partija Bele.

Aplikacija ima dva načina korištenja:

* konzolnu Node.js verziju koja učitava podatke iz datoteke `podaci.json`
* web aplikaciju koja omogućuje unos podataka i praćenje rezultata kroz korisničko sučelje

Obje verzije koriste iste OOP klase iz direktorija `Model`.

Podržane su tri vrste partije:

* partija s dva igrača
* partija s tri igrača
* partija s dva para, odnosno četiri igrača

## Primijenjeni OOP principi

### Klase i objekti

Klase predstavljaju dijelove sustava za praćenje rezultata Bele, poput igrača, lokacije, rezultata, miješanja i partije.

Na temelju klasa stvaraju se konkretni objekti koji sadrže podatke potrebne za praćenje partije.

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

Klasa `Rezultat` također koristi privatna svojstva za rezultate igrača te metode `getPrvi()`, `getDrugi()` i `getTreci()` za njihov dohvat.

### Nasljeđivanje

Zajednička svojstva i metode definirani su u roditeljskim klasama, a podklase ih nasljeđuju i proširuju.

Primjeri nasljeđivanja:

* `Igrac`, `Lokacija`, `Mjesanje` i `Partija` nasljeđuju klasu `Entitet`
* `MjesanjeDvaUnosa` nasljeđuje klasu `Mjesanje`
* `MjesanjeTriUnosa` nasljeđuje klasu `MjesanjeDvaUnosa`
* `PartijaDvaIgraca` i `PartijaDvaPara` nasljeđuju klasu `Partija`
* `PartijaTriIgraca` nasljeđuje klasu `PartijaDvaIgraca`

### Polimorfizam

Podklase mogu imati vlastite implementacije metoda i prilagoditi ponašanje naslijeđeno iz roditeljskih klasa.

`MjesanjeDvaUnosa` računa rezultat za dva unosa, dok `MjesanjeTriUnosa` proširuje to ponašanje dodavanjem trećeg rezultata.

Različite vrste partije pomoću metode `toString()` prikazuju rezultat na način koji odgovara broju igrača.

## Struktura projekta

```text
JavaScript-OOP/
├── Model/
│   ├── entitet.js
│   ├── igrac.js
│   ├── lokacija.js
│   ├── rezultat.js
│   ├── spol.js
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
├── web/
│   ├── css/
│   │   └── style.css
│   │
│   ├── img/
│   │   └── pobjednik.gif
│   │
│   ├── js/
│   │   └── web.js
│   │
│   └── index.html
│
├── main.js
├── podaci.json
├── package.json
└── README.md
```

## Klase

### `Entitet`

Osnovna klasa koja sadrži identifikacijski broj objekta.

Ostale glavne klase modela nasljeđuju ovu klasu.

### `Igrac`

Sadrži podatke o igraču:

* ime
* prezime
* URL slike
* spol

Metoda `toString()` vraća ime i prezime igrača.

### `Spol`

Sadrži vrijednosti koje predstavljaju spol igrača.

### `Lokacija`

Sadrži naziv lokacije te geografsku dužinu i širinu.

### `Rezultat`

Predstavlja rezultat partije.

Sadrži rezultat prvog, drugog i po potrebi trećeg unosa.

Rezultatima se pristupa pomoću metoda:

* `getPrvi()`
* `getDrugi()`
* `getTreci()`

### `Mjesanje`

Osnovna klasa za zajedničke podatke o jednom miješanju:

* štiglja
* Belot
* datum unosa
* igrač ili par koji je zvao adut

Podatak o zovaču dostupan je pomoću metoda `getZvaoAdut()` i `setZvaoAdut()`.

### `MjesanjeDvaUnosa`

Sadrži bodove i zvanja za dva igrača ili dva para.

Metoda `getRezultat()` određuje je li zovač prošao ili pao te obrađuje štiglju. Rezultat vraća kao objekt klase `Rezultat`.

### `MjesanjeTriUnosa`

Nasljeđuje klasu `MjesanjeDvaUnosa` i dodaje bodove i zvanje za treći unos.

Metoda `getRezultat()` obrađuje rezultate sva tri igrača, uključujući kaput, kaput obrane te prolaz ili pad zovača.

### `Partija`

Sadrži zajedničke podatke o partiji:

* broj bodova do kojeg se igra
* lokaciju
* unose
* miješanja
* igrače

Metoda `getRezultat()` prolazi kroz sva miješanja i izračunava ukupni rezultat partije.

Metoda `isIgraGotova()` provjerava je li partija završena. Belot završava partiju odmah, dok se u ostalim slučajevima provjerava je li vodeći rezultat prešao zadanu granicu.

Metoda `getPobjednikIndex()` određuje pobjednika završene partije. Ako je prijavljen Belot, pobjednik je igrač ili par koji je zvao adut.

### `PartijaDvaIgraca`

Predstavlja partiju s dva pojedinačna igrača.

Metoda `toString()` prikazuje rezultate oba igrača.

### `PartijaTriIgraca`

Predstavlja partiju s tri pojedinačna igrača.

Koristi računanje rezultata naslijeđeno iz roditeljskih klasa i prikazuje rezultat sva tri igrača.

### `PartijaDvaPara`

Predstavlja partiju s četiri igrača podijeljena u dva para.

Prvi i drugi igrač čine prvi par, a treći i četvrti igrač drugi par.

## Podržana pravila bodovanja

Aplikacija ne dijeli karte i ne određuje adut ili osvojene štihove. Korisnik unosi već izračunate bodove i zvanja, a aplikacija obrađuje rezultat miješanja i ukupni rezultat partije.

Podržano je:

* određivanje igrača ili para koji je zvao adut
* prolaz i pad zovača
* štiglja i dodatnih 90 bodova
* kaput i kaput obrane kod tri igrača
* dijeljenje bodova obrane kod pada zovača
* zvanja, uključujući Belu kao dio običnog unosa zvanja
* Belot kao automatska pobjeda cijele partije
* nastavak igre kod izjednačenog vodećeg rezultata

Broj bodova u jednom miješanju nije fiksno postavljen jer se koristi stvarni zbroj unesenih bodova. Time je podržana i igra s manjim brojem karata.

## Konzolna verzija

Konzolna verzija aplikacije koristi datoteku `podaci.json`.

Program učitava spremljene podatke o partijama, pretvara ih u objekte odgovarajućih klasa, izračunava rezultate i provjerava je li pojedina partija završena.

Svako miješanje u datoteci `podaci.json` sadrži svojstvo `zvaoAdutUnos`.

Za partiju s dva igrača ili dva para dopuštene su vrijednosti `1` i `2`, a za partiju s tri igrača vrijednosti `1`, `2` i `3`.

### Pokretanje

Za pokretanje konzolne verzije potrebno je imati instaliran Node.js.

U glavnoj mapi projekta pokreće se naredba:

```bash
node main.js
```

Program ispisuje rezultate svih partija. Ako je partija završena, ispisuje i pobjednika odnosno pobjednički par.

Primjer:

```text
Partija DVA IGRAČA, igra gotova: false, Tomislav Jakopec: 282 | Marijan Zidar: 172
Partija TRI IGRAČA, igra gotova: true, Tomislav Jakopec: 60 | Marijan Zidar: 576 | Marija Zimska: 456
Pobjednik je Marijan Zidar
Partija DVA PARA, igra gotova: false, Tomislav Jakopec i Marijan Zidar: 282 | Marija Zimska i Anita Račman: 172
```

## Web aplikacija

Uz konzolnu verziju projekt sadrži i web sučelje za unos i praćenje partije Bele.

Web aplikacija omogućuje:

* odabir 2, 3 ili 4 igrača
* unos imena i prezimena igrača
* unos URL-a slike igrača
* odabir spola igrača
* unos broja bodova do kojeg se igra
* unos naziva i koordinata lokacije
* unos bodova i zvanja za svako miješanje
* označavanje štiglje i Belota
* odabir igrača ili para koji je zvao adut
* automatsko zbrajanje rezultata svih miješanja
* prikaz trenutnog rezultata
* provjeru završetka partije
* prikaz pobjednika ili pobjedničkog para
* pokretanje nove partije nakon završetka prethodne

Web-forma provjerava:

* je li odabran podržani broj igrača
* jesu li uneseni ime i prezime svakog igrača
* je li odabran spol svakog igrača
* je li unesena ispravna granica partije
* je li unesen naziv lokacije
* jesu li uneseni svi bodovi i zvanja
* jesu li bodovi i zvanja nenegativni

Kada partija završi, prikazuje se finalni rezultat i pobjednik odnosno pobjednički par. Obrazac za unos miješanja tada se skriva, a gumb **Nova partija** ponovno pokreće aplikaciju.

### Pokretanje web aplikacije

Ulazna datoteka web aplikacije nalazi se u:

```text
web/index.html
```

Web aplikacija koristi JavaScript module i klase iz direktorija `Model`, zbog čega se treba pokrenuti preko lokalnog web servera.

Može se koristiti Live Server u Visual Studio Codeu ili naredba iz glavne mape projekta:

```bash
npx serve .
```

Na Windowsu, ako PowerShell blokira `npx.ps1`, može se koristiti:

```powershell
npx.cmd serve .
```

Nakon pokretanja aplikacija je dostupna na adresi:

```text
http://localhost:3000/web/
```

Web-verzija ne koristi `main.js` ni `podaci.json` za unos nove partije. Podaci se unose kroz HTML sučelje, dok se za obradu koriste iste klase iz direktorija `Model`.

## Povezanost konzolne i web-verzije

Obje verzije aplikacije koriste isti objektno orijentirani model.

```text
Konzolna verzija:

podaci.json
     ↓
   main.js
     ↓
   Model

Web-verzija:

index.html
     ↓
   web.js
     ↓
   Model
```

Na taj način logika aplikacije definirana u klasama može se koristiti u različitim okruženjima bez potrebe za stvaranjem zasebnog modela za web-aplikaciju.