# SirioWebKit v.8.0.0

Viene messa a disposizione una guida html per poter approfondire l'uso dei componenti del webkit.

Per personalizzare gli stili grafici si include tra i sorgenti il file **custom.scss** collegato a **variables.scss** con i Token Sirio di riferimento utilizzati.

## Indice
- [Installazione](#installazione)
- [Changelog](#changelog)
- [Licenze software dei componenti di terze parti](#licenze-software-dei-componenti-di-terze-parti)

## Installazione

Copiare le risorse presenti nella cartella ASSETS nel vostro server e aggiungere nelle pagine HTML i puntamenti corretti per caricarle in base alla struttura directories che avete scelto di utilizzare.

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

### 8.0.0 (2024-03-29)

- **struttura**\Header (added megamenu)
- **contenuto**\Hero
- **contenuto**\Carousel
- **assets**\img\new images for hero and megamenu
- Bugfixing handle event.key with no data

### 7.0.2 (2024-02-22)

- **tipografia**\Logo (modified)
- **tipografia**\Icone (fontawesome v6.4.2)
- **tipografia**\Colori (warning modified)
- **contenuto**\Tag (warning modified)
- **struttura**\Footer (twitter icon modified)

### 7.0.1 (2023-10-16)

- **scss**\Variables changed
- **js**\DropdownSelect, FileUpload, TimePicker and Datepicker (propagation of custom events)
- **js**\SirioTimePicker (new keydown event management)

### 7.0.0 (2023-09-15)

- **contenuto**\Card (header moved)
- **contenuto**\Tab (added nav)
- **contenuto**\Title Bar
- **contenuto**\Tabelle (added drawer)
- **form**\Filtri

### 6.0.0 (2023-05-19)

- **struttura**\Header (added submenu mobile)
- **contenuto**\Menu Spalla
- **contenuto**\Avvisi
- **contenuto**\Step Progress Bar (fixed bug hover)
- **form**\Upload (added maximum number of files)
- **form**\Dropdown Select (added reset method)

### 5.0.1 (2023-04-06)

- **form**\Dropdown Select (fixed bug onchange)

### 5.0.0 (2023-03-28)

- **tipografia**\Colori (rebranding)
- **tipografia**\Icone (fontawesome v6.3.0)
- **form**\Dropdown Select (added methods)

### 4.0.4 (2023-01-13)

- **struttura**\Header
- **contenuto**\Step Progress Bar (fixed dropdown menu)
- **form**\Selezione (fixed toggle)
- **form**\Chip (fixed radio/checkbox)

### 4.0.0 (2022-10-26)

- **struttura**\System Grid
- **struttura**\Struttura pagina di esempio
- **struttura**\Footer
- **tipografia**\Font
- **tipografia**\Colori
- **tipografia**\Heading
- **tipografia**\Icone
- **contenuto**\Accordion
- **contenuto**\Dialog
- **contenuto**\Tab
- **contenuto**\Breadcrumb
- **contenuto**\Card
- **contenuto**\Paginazione
- **contenuto**\Notifiche
- **contenuto**\Tabelle
- **contenuto**\Collapse
- **contenuto**\Dropdown
- **contenuto**\Tag
- **contenuto**\Tooltip
- **contenuto**\Step Progress Bar
- **form**\Bottoni
- **form**\Input
- **form**\Input group
- **form**\Dropdown Select
- **form**\Autocomplete
- **form**\Searchbar
- **form**\Date & Time picker
- **form**\Selezione
- **form**\File Upload
- **form**\Validazione
- **form**\Chip
- **form**\Slider
- **form**\Progress bar

## Licenze software dei componenti di terze parti

### Componenti distribuiti con SirioWebKit

Vengono di seguito elencati i componenti distribuiti con Sirio WebKit.

- [Bootstrap 5 Grid System](https://getbootstrap.com/), ©Twitter, Inc., licenza MIT

- [Vanilla JS Datepicker](https://mymth.github.io/vanillajs-datepicker), licenza MIT

- [Splide](https://splidejs.com/), licenza MIT

- [Font Awesome Free 6.3.0](https://fontawesome.com/) ©Fonticons, Inc., licenza SIL OFL 1.1

- [Font Titillium Web](http://nta.accademiadiurbino.it/titillium/) ©Accademia di Belle Arti di Urbino and students of MA course of Visual design, Inc., licenza SIL OFL 1.1

- [Font Lora](http://www.cyreal.org/fonts/lora/) ©Cyreal Fonts, licenza SIL OFL 1.1

- [Font Roboto Mono](https://github.com/googlefonts/robotomono) ©The Roboto Mono Project Authors, licenza SIL OFL 1.1

## Licenza
[MIT](https://choosealicense.com/licenses/mit/)