# SirioWebKit

Viene messa a disposizione una guida html per poter approfondire l'uso dei componenti del webkit.

## Indice
- [Installazione](#installatione)
- [Changelog](#changelog)
- [Licenze software dei componenti di terze parti](#licenze-software-dei-componenti-di-terze-parti)

## Installazione

Copiare le risorse presenti nella cartella ASSETS nel vostro server e aggiungere nelle pagine HTML i puntamenti corretti per caricarle in base alla struttura directories che scegliete di utilizzare.

Da inserire nella HEAD della pagina HTML

```html
<!-- CSS Plugin -->
<link rel="stylesheet" href="css/bootstrap-grid.min.css">
<link rel="stylesheet" href="css/datepicker.min.css">

<!-- CSS Fonts -->
<link rel="stylesheet" href="css/font-awesome.min.css">
<link rel="stylesheet" href="css/font-titillium-web.css">
<link rel="stylesheet" href="css/font-lora.css">
<link rel="stylesheet" href="css/font-roboto-mono.css">

<!-- CSS UIKit -->
<link rel="stylesheet" href="css/webkit.min.css">
```

Da inserire in fondo alla pagina HTML

```html
<!-- JS WebKit -->
<script src="js/sirio-datepicker-full.js"></script>
<script src="js/sirio-webkit.js"></script>
```

## Changelog

### 0.6.0 (2022-09-29)

#### Aggiunto
* **struttura:** Footer
* **contenuto:** Step Progress Bar

### 0.5.0 (2022-09-16)

#### Aggiunto
* **struttura:** System Grid
* **struttura:** Struttura pagina di esempio
* **tipografia:** Font
* **tipografia:** Colori
* **tipografia:** Heading
* **tipografia:** Icone
* **contenuto:** Notifiche
* **contenuto:** Tabelle
* **form:** Date & Time picker

#### Modificato

* **form:** Dropdown Select
* **form:** Autocomplete

### 0.4.0 (2022-07-29)

#### Aggiunto
- **contenuto** Collapse
- **contenuto** Dropdown
- **contenuto** Tag
- **contenuto** Tooltip
- **form** Input group
- **form** Dropdown Select
- **form** Autocomplete
- **form** Searchbar
- **form** Chip
- **form** Slider
- **form** Progress bar

### 0.3.0 (2022-07-01)

#### Aggiunto
- **form** Input
- **form** Selezione
- **form** File Upload
- **form** Validazione

### 0.2.0 (2022-07-01)

#### Aggiunto
- **contenuto** Accordion
- **contenuto** Dialog
- **contenuto** Tab

### 0.1.0 (2022-06-20)

#### Aggiunto
- **contenuto** Breadcrumb
- **contenuto** Card
- **contenuto** Paginazione
- **form** Bottoni


## Licenze software dei componenti di terze parti

### Componenti distribuiti con Bootstrap Italia

Vengono di seguito elencati i componenti distribuiti con Sirio WebKit.

- [Vanilla JS Datepicker](https://mymth.github.io/vanillajs-datepicker), licenza MIT

## Licenza
[MIT](https://choosealicense.com/licenses/mit/)
