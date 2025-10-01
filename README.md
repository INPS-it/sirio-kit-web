# SirioWebKit

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
<script src="js/sirio-webkit-min.js"></script>
<script src="js/splide.min.js"></script>
```

## Changelog

### 9.0.2
- **utilities**\Stile - supporto per template 3.0
- **contenuto**\Header - supporto per label di produzione, miglior comportamento responsive, aggiunto blocco utente su header sticky se autenticato, semplificazione dom semantico
- **contenuto**\Sidenav - rimozione `role menu`

### 9.0.1
- **contenuto**\Alert – Aggiunto role `status` sul metodo `isAlert` di istanza della classe.

### 9.0.0
-  <strong>contenuto</strong>\Bottoni (Aggiunta variante **small**, **medium - BG White** e **medium - BG Black**)
-  <strong>contenuto</strong>\Title Bar (Sostituiti i bottoni con la variante **medium**)
-  <strong>contenuto</strong>\Dropdown menù (Supporto per le tag `button` per una migliore integrazione nella Title Bar)
-  <strong>contenuto</strong>\Pagination (Rimossa la variante "Items per page + Number of page + Cursor" e migliorato comportamento responsive da _mobile_)
-  <strong>contenuto</strong>\Card (Sostituita icona a "cuore" `fa-heart` con quella a "segnalibro" `fa-bookmark`)
-  <strong>contenuto</strong>\Avviso (Aggiunti avvisi semantici: `warning`, `success` e `alert`)
-  <strong>contenuto</strong>\Step Progress Bar – Aggiornato componente nello stile e nell'HTML)
-  <strong>contenuto</strong>\Tag (Aggiunta nuova tag con icona `sirio-tag-hero`)
-  <strong>contenuto</strong>\Hero (Inserita nuova tag con icona `sirio-tag-hero`)
-  <strong>contenuto</strong>\Footer (Aggiunte due nuove icone social, invertito da mobile ordine "sede legale" e "social")

### 8.2.1 (2025-03-28)
- <strong>js</strong>\SirioDialog, SirioDropdownAutocomplete, SirioDropdownMenu, SirioDropdownSelect, SirioFileUpload and SirioTimePicker (fix bug on manual inizialization of component)
- <strong>form</strong>\TimePicker (type: button on increment/decrement arrow-button)
- <strong>tipografia</strong>\`font-size` (Aggiornata l'unità di misura da px a rem)
- <strong>contenuto</strong>\Implementato su di `focus-visible` (In sostituzione del _workaround_ del `dataSirioKeyboardHandler`)
- <strong>contenuto</strong>\Paginazione (Migliorata accessibilità a screen-reader)
- <strong>contenuto</strong>\Bottoni (Rimosso `role="menu"` dove errato)
- <strong>struttura</strong>\Search input (Assegnato `type="search"`)
- <strong>contenuto</strong>\Tab (Risolto problema di accessibilità, ammesso anche uso di `div` al posto di `ul`)
- <strong>contenuto</strong>\Tabella (Aggiunta funzionalità tabella espandibile)
- <strong>contenuto</strong>\DropdownMenu (Migliorata accessibilità)
- <strong>contenuto</strong>\DropdownSelect (Migliorata accessibilità)

### 8.2.0 (2024-01-16)

- <strong>contenuto</strong>\Tabella Sorting (modified html)
- <strong>contenuto</strong>\Tabella allineamento caselle con checkbox (modified css)
- <strong>contenuto</strong>\Paginazione (modified html)
- <strong>contenuto</strong>\Filtri selezionati (modified html)
- <strong>contenuto</strong>\Dialog (deleted role attribute)
- <strong>form</strong>\Checkbox (add padding inline)

### 8.1.0 (2024-09-02)

- <strong>contenuto</strong>\Dialog (nuova gestione tab)
- <strong>contenuto</strong>\Utils (gestione centralizzata chiusura con escape)
- <strong>form</strong>\Searchbar (gestione bottone X per cancellazione valore)
- <strong>form</strong>\DropdownMenu (aggiunta funzionalità dropdown-detached)
- <strong>tipografia</strong>\Colori (warning modified)
- <strong>contenuto</strong>\Step Progress Bar (esempi modificati)
- <strong>contenuto</strong>\Tabelle (esempi modificati + table responsive card + table action fixed + table drawer aggiornata)
- <strong>contenuto</strong>\Paginazione (esempi modificati)
- <strong>contenuto</strong>\Notifiche (css modificati)
- <strong>form</strong>\Chip (esempi e css modificati)
- <strong>form</strong>\Searchbar (add placeholder)
- <strong>form</strong>\Validazione (label modificati)
- <strong>form</strong>\Filtri (aggiunti filtri orizzontali + titoli con popover + correzione esempi)

### 8.0.0 (2024-03-29)

- <strong>struttura</strong>\Header (added megamenu)
- <strong>contenuto</strong>\Hero
- <strong>contenuto</strong>\Carousel
- <strong>assets</strong>\img\new images for hero and megamenu
- <strong>bugfix</strong>\handle event.key with no data

### 7.0.2 (2024-02-22)

- <strong>tipografia</strong>\Logo (modified)
- <strong>tipografia</strong>\Icone (fontawesome v6.4.2)
- <strong>tipografia</strong>\Colori (warning modified)
- <strong>contenuto</strong>\Tag (warning modified)
- <strong>struttura</strong>\Footer (twitter icon modified)
- <strong>contenuto</strong>\Tab (getter and setter for buttons added)
- <strong>form</strong>\Dropdown Select (selected value aria-label management added)
- <strong>form</strong>\Dropdown Select (handle duplication of select issue)
- <strong>form</strong>\Dropdown Select (initialization using value attribute)
- <strong>form</strong>\Upload (addNewFile method added)
- <strong>form</strong>\TimePicker (label handling in aria label)
- <strong>form</strong>\SirioSlider modify component (compliant W3C specs for null value)
- Management of the data-sirio-keyboard attribute (loss of focus on accordion, collapse, dropdown)
- Propagation of custom events for components initialization
- Possibility to disable automatic initialization added
- Components classes for manual components initialization exported

### 7.0.1 (2023-10-16)

- <strong>scss</strong>\Variables changed
- <strong>js</strong>\DropdownSelect, FileUpload, TimePicker and Datepicker (propagation of custom events)
- <strong>js</strong>\SirioTimePicker (new keydown event management)

### 7.0.0 (2023-09-15)

- <strong>contenuto</strong>\Card (header moved)
- <strong>contenuto</strong>\Tab (added nav)
- <strong>contenuto</strong>\Title Bar
- <strong>contenuto</strong>\Tabelle (added drawer)
- <strong>form</strong>\Filtri

### 6.0.0 (2023-05-19)

- <strong>struttura</strong>\Header (added submenu mobile)
- <strong>contenuto</strong>\Menu Spalla
- <strong>contenuto</strong>\Avvisi
- <strong>contenuto</strong>\Step Progress Bar (fixed bug hover)
- <strong>form</strong>\Upload (added maximum number of files)
- <strong>form</strong>\Dropdown Select (added reset method)

### 5.0.1 (2023-04-06)

- <strong>form</strong>\Dropdown Select (fixed bug onchange)

### 5.0.0 (2023-03-28)

- <strong>tipografia</strong>\Colori (rebranding)
- <strong>tipografia</strong>\Icone (fontawesome v6.3.0)
- <strong>form</strong>\Dropdown Select (added methods)

### 4.0.4 (2023-01-13)

- <strong>struttura</strong>\Header
- <strong>contenuto</strong>\Step Progress Bar (fixed dropdown menu)
- <strong>form</strong>\Selezione (fixed toggle)
- <strong>form</strong>\Chip (fixed radio/checkbox)

### 4.0.0 (2022-10-26)

- <strong>struttura</strong>\System Grid
- <strong>struttura</strong>\Struttura pagina di esempio
- <strong>struttura</strong>\Footer
- <strong>tipografia</strong>\Font
- <strong>tipografia</strong>\Colori
- <strong>tipografia</strong>\Heading
- <strong>tipografia</strong>\Icone
- <strong>contenuto</strong>\Accordion
- <strong>contenuto</strong>\Dialog
- <strong>contenuto</strong>\Tab
- <strong>contenuto</strong>\Breadcrumb
- <strong>contenuto</strong>\Card
- <strong>contenuto</strong>\Paginazione
- <strong>contenuto</strong>\Notifiche
- <strong>contenuto</strong>\Tabelle
- <strong>contenuto</strong>\Collapse
- <strong>contenuto</strong>\Dropdown
- <strong>contenuto</strong>\Tag
- <strong>contenuto</strong>\Tooltip
- <strong>contenuto</strong>\Step Progress Bar
- <strong>form</strong>\Bottoni
- <strong>form</strong>\Input
- <strong>form</strong>\Input group
- <strong>form</strong>\Dropdown Select
- <strong>form</strong>\Autocomplete
- <strong>form</strong>\Searchbar
- <strong>form</strong>\Date & Time picker
- <strong>form</strong>\Selezione
- <strong>form</strong>\File Upload
- <strong>form</strong>\Validazione
- <strong>form</strong>\Chip
- <strong>form</strong>\Slider
- <strong>form</strong>\Progress bar

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
