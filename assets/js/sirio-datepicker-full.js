/*
 * Vanilla JS Datepicker v.1.2.0
 * Sirio WebKit v.4.0.0
 * Copyright 2022 INPS
 */
(function () {
  'use strict';

  let newListeners = [];
  let prevBtnClicked = false;
  let nextBtnClicked = false;

  function hasProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function lastItemOf(arr) {
    return arr[arr.length - 1];
  }

  // push only the items not included in the array
  function pushUnique(arr, ...items) {
    items.forEach((item) => {
      if (arr.includes(item)) {
        return;
      }
      arr.push(item);
    });
    return arr;
  }

  function stringToArray(str, separator) {
    // convert empty string to an empty array
    return str ? str.split(separator) : [];
  }

  function isInRange(testVal, min, max) {
    const minOK = min === undefined || testVal >= min;
    const maxOK = max === undefined || testVal <= max;
    return minOK && maxOK;
  }

  function limitToRange(val, min, max) {
    if (val < min) {
      return min;
    }
    if (val > max) {
      return max;
    }
    return val;
  }

  function createTagRepeat(tagName, repeat, attributes = {}, index = 0, html = '') {
    const openTagSrc = Object.keys(attributes).reduce((src, attr) => {
      let val = attributes[attr];
      if (typeof val === 'function') {
        val = val(index);
      }
      return `${src} ${attr}="${val}"`;
    }, tagName);
    html += `<${openTagSrc}></${tagName}>`;

    const next = index + 1;
    return next < repeat
      ? createTagRepeat(tagName, repeat, attributes, next, html)
      : html;
  }

  // Remove the spacing surrounding tags for HTML parser not to create text nodes
  // before/after elements
  function optimizeTemplateHTML(html) {
    return html.replace(/>\s+/g, '>').replace(/\s+</, '<');
  }

  function stripTime(timeValue) {
    return new Date(timeValue).setHours(0, 0, 0, 0);
  }

  function today() {
    return new Date().setHours(0, 0, 0, 0);
  }

  // Get the time value of the start of given date or year, month and day
  function dateValue(...args) {
    switch (args.length) {
      case 0:
        return today();
      case 1:
        return stripTime(args[0]);
    }

    // use setFullYear() to keep 2-digit year from being mapped to 1900-1999
    const newDate = new Date(0);
    newDate.setFullYear(...args);
    return newDate.setHours(0, 0, 0, 0);
  }

  function addDays(date, amount) {
    const newDate = new Date(date);
    return newDate.setDate(newDate.getDate() + amount);
  }

  function addWeeks(date, amount) {
    return addDays(date, amount * 7);
  }

  function addMonths(date, amount) {
    // If the day of the date is not in the new month, the last day of the new
    // month will be returned. e.g. Jan 31 + 1 month → Feb 28 (not Mar 03)
    const newDate = new Date(date);
    const monthsToSet = newDate.getMonth() + amount;
    let expectedMonth = monthsToSet % 12;
    if (expectedMonth < 0) {
      expectedMonth += 12;
    }

    const time = newDate.setMonth(monthsToSet);
    return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time;
  }

  function addYears(date, amount) {
    // If the date is Feb 29 and the new year is not a leap year, Feb 28 of the
    // new year will be returned.
    const newDate = new Date(date);
    const expectedMonth = newDate.getMonth();
    const time = newDate.setFullYear(newDate.getFullYear() + amount);
    return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time;
  }

  // Calculate the distance bettwen 2 days of the week
  function dayDiff(day, from) {
    return (day - from + 7) % 7;
  }

  // Get the date of the specified day of the week of given base date
  function dayOfTheWeekOf(baseDate, dayOfWeek, weekStart = 0) {
    const baseDay = new Date(baseDate).getDay();
    return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart));
  }

  // Get the ISO week of a date
  function getWeek(date) {
    // start of ISO week is Monday
    const thuOfTheWeek = dayOfTheWeekOf(date, 4, 1);
    // 1st week == the week where the 4th of January is in
    const firstThu = dayOfTheWeekOf(new Date(thuOfTheWeek).setMonth(0, 4), 4, 1);
    return Math.round((thuOfTheWeek - firstThu) / 604800000) + 1;
  }

  // Get the start year of the period of years that includes given date
  // years: length of the year period
  function startOfYearPeriod(date, years) {
    /* @see https://en.wikipedia.org/wiki/Year_zero#ISO_8601 */
    const year = new Date(date).getFullYear();
    return Math.floor(year / years) * years;
  }

  // Convert date to the first/last date of the month/year of the date
  function regularizeDate(date, timeSpan, useLastDate) {
    if (timeSpan !== 1 && timeSpan !== 2) {
      return date;
    }
    const newDate = new Date(date);
    if (timeSpan === 1) {
      useLastDate
        ? newDate.setMonth(newDate.getMonth() + 1, 0)
        : newDate.setDate(1);
    } else {
      useLastDate
        ? newDate.setFullYear(newDate.getFullYear() + 1, 0, 0)
        : newDate.setMonth(0, 1);
    }
    return newDate.setHours(0, 0, 0, 0);
  }

  // pattern for format parts
  const reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
  // pattern for non date parts
  const reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;
  // cache for persed formats
  let knownFormats = {};
  // parse funtions for date parts
  const parseFns = {
    y(date, year) {
      return new Date(date).setFullYear(parseInt(year, 10));
    },
    m(date, month, locale) {
      const newDate = new Date(date);
      let monthIndex = parseInt(month, 10) - 1;

      if (isNaN(monthIndex)) {
        if (!month) {
          return NaN;
        }

        const monthName = month.toLowerCase();
        const compareNames = name => name.toLowerCase().startsWith(monthName);
        // compare with both short and full names because some locales have periods
        // in the short names (not equal to the first X letters of the full names)
        monthIndex = locale.monthsShort.findIndex(compareNames);
        if (monthIndex < 0) {
          monthIndex = locale.months.findIndex(compareNames);
        }
        if (monthIndex < 0) {
          return NaN;
        }
      }

      newDate.setMonth(monthIndex);
      return newDate.getMonth() !== normalizeMonth(monthIndex)
        ? newDate.setDate(0)
        : newDate.getTime();
    },
    d(date, day) {
      return new Date(date).setDate(parseInt(day, 10));
    },
  };
  // format functions for date parts
  const formatFns = {
    d(date) {
      return date.getDate();
    },
    dd(date) {
      return padZero(date.getDate(), 2);
    },
    D(date, locale) {
      return locale.daysShort[date.getDay()];
    },
    DD(date, locale) {
      return locale.days[date.getDay()];
    },
    m(date) {
      return date.getMonth() + 1;
    },
    mm(date) {
      return padZero(date.getMonth() + 1, 2);
    },
    M(date, locale) {
      return locale.monthsShort[date.getMonth()];
    },
    MM(date, locale) {
      return locale.months[date.getMonth()];
    },
    y(date) {
      return date.getFullYear();
    },
    yy(date) {
      return padZero(date.getFullYear(), 2).slice(-2);
    },
    yyyy(date) {
      return padZero(date.getFullYear(), 4);
    },
  };

  // get month index in normal range (0 - 11) from any number
  function normalizeMonth(monthIndex) {
    return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
  }

  function padZero(num, length) {
    return num.toString().padStart(length, '0');
  }

  function parseFormatString(format) {
    if (typeof format !== 'string') {
      throw new Error("Invalid date format.");
    }
    if (format in knownFormats) {
      return knownFormats[format];
    }

    // sprit the format string into parts and seprators
    const separators = format.split(reFormatTokens);
    const parts = format.match(new RegExp(reFormatTokens, 'g'));
    if (separators.length === 0 || !parts) {
      throw new Error("Invalid date format.");
    }

    // collect format functions used in the format
    const partFormatters = parts.map(token => formatFns[token]);

    // collect parse function keys used in the format
    // iterate over parseFns' keys in order to keep the order of the keys.
    const partParserKeys = Object.keys(parseFns).reduce((keys, key) => {
      const token = parts.find(part => part[0] !== 'D' && part[0].toLowerCase() === key);
      if (token) {
        keys.push(key);
      }
      return keys;
    }, []);

    return knownFormats[format] = {
      parser(dateStr, locale) {
        const dateParts = dateStr.split(reNonDateParts).reduce((dtParts, part, index) => {
          if (part.length > 0 && parts[index]) {
            const token = parts[index][0];
            if (token === 'M') {
              dtParts.m = part;
            } else if (token !== 'D') {
              dtParts[token] = part;
            }
          }
          return dtParts;
        }, {});

        // iterate over partParserkeys so that the parsing is made in the oder
        // of year, month and day to prevent the day parser from correcting last
        // day of month wrongly
        return partParserKeys.reduce((origDate, key) => {
          const newDate = parseFns[key](origDate, dateParts[key], locale);
          // ingnore the part failed to parse
          return isNaN(newDate) ? origDate : newDate;
        }, today());
      },
      formatter(date, locale) {
        let dateStr = partFormatters.reduce((str, fn, index) => {
          return str += `${separators[index]}${fn(date, locale)}`;
        }, '');
        // separators' length is always parts' length + 1,
        return dateStr += lastItemOf(separators);
      },
    };
  }

  function parseDate(dateStr, format, locale) {
    if (dateStr instanceof Date || typeof dateStr === 'number') {
      const date = stripTime(dateStr);
      return isNaN(date) ? undefined : date;
    }
    if (!dateStr) {
      return undefined;
    }
    if (dateStr === 'today') {
      return today();
    }

    if (format && format.toValue) {
      const date = format.toValue(dateStr, format, locale);
      return isNaN(date) ? undefined : stripTime(date);
    }

    return parseFormatString(format).parser(dateStr, locale);
  }

  function formatDate(date, format, locale) {
    if (isNaN(date) || (!date && date !== 0)) {
      return '';
    }

    const dateObj = typeof date === 'number' ? new Date(date) : date;

    if (format.toDisplay) {
      return format.toDisplay(dateObj, format, locale);
    }

    return parseFormatString(format).formatter(dateObj, locale);
  }

  const range = document.createRange();

  function parseHTML(html) {
    return range.createContextualFragment(html);
  }

  function getParent(el) {
    return el.parentElement
      || (el.parentNode instanceof ShadowRoot ? el.parentNode.host : undefined);
  }

  function isActiveElement(el) {
    return el.getRootNode().activeElement === el;
  }

  function hideElement(el) {
    if (el.style.display === 'none') {
      return;
    }
    // back up the existing display setting in data-style-display
    if (el.style.display) {
      el.dataset.styleDisplay = el.style.display;
    }
    el.style.display = 'none';
  }

  function showElement(el) {
    if (el.style.display !== 'none') {
      return;
    }
    if (el.dataset.styleDisplay) {
      // restore backed-up dispay property
      el.style.display = el.dataset.styleDisplay;
      delete el.dataset.styleDisplay;
    } else {
      el.style.display = '';
    }
  }

  function emptyChildNodes(el) {
    if (el.firstChild) {
      el.removeChild(el.firstChild);
      emptyChildNodes(el);
    }
  }

  function replaceChildNodes(el, newChildNodes) {
    emptyChildNodes(el);
    if (newChildNodes instanceof DocumentFragment) {
      el.appendChild(newChildNodes);
    } else if (typeof newChildNodes === 'string') {
      el.appendChild(parseHTML(newChildNodes));
    } else if (typeof newChildNodes.forEach === 'function') {
      newChildNodes.forEach((node) => {
        el.appendChild(node);
      });
    }
  }

  const listenerRegistry = new WeakMap();
  const {addEventListener, removeEventListener} = EventTarget.prototype;

  // Register event listeners to a key object
  // listeners: array of listener definitions;
  //   - each definition must be a flat array of event target and the arguments
  //     used to call addEventListener() on the target
  function registerListeners(keyObj, listeners) {
    let registered = listenerRegistry.get(keyObj);
    if (!registered) {
      registered = [];
      listenerRegistry.set(keyObj, registered);
    }
    listeners.forEach((listener) => {
      addEventListener.call(...listener);
      registered.push(listener);
    });
  }

  function unregisterListeners(keyObj) {
    let listeners = listenerRegistry.get(keyObj);
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) => {
      removeEventListener.call(...listener);
    });
    listenerRegistry.delete(keyObj);
  }

  // Event.composedPath() polyfill for Edge
  // based on https://gist.github.com/kleinfreund/e9787d73776c0e3750dcfcdc89f100ec
  if (!Event.prototype.composedPath) {
    const getComposedPath = (node, path = []) => {
      path.push(node);

      let parent;
      if (node.parentNode) {
        parent = node.parentNode;
      } else if (node.host) { // ShadowRoot
        parent = node.host;
      } else if (node.defaultView) {  // Document
        parent = node.defaultView;
      }
      return parent ? getComposedPath(parent, path) : path;
    };

    Event.prototype.composedPath = function () {
      return getComposedPath(this.target);
    };
  }

  function findFromPath(path, criteria, currentTarget) {
    const [node, ...rest] = path;
    if (criteria(node)) {
      return node;
    }
    if (node === currentTarget || node.tagName === 'HTML' || rest.length === 0) {
      // stop when reaching currentTarget or <html>
      return;
    }
    return findFromPath(rest, criteria, currentTarget);
  }

  // Search for the actual target of a delegated event
  function findElementInEventPath(ev, selector) {
    const criteria = typeof selector === 'function'
      ? selector
      : el => el instanceof Element && el.matches(selector);
    return findFromPath(ev.composedPath(), criteria, ev.currentTarget);
  }

  // default locales
  const locales = {
    en: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today",
      clear: "Clear",
      titleFormat: "MM y",
      monthsTitle: "Months",
      clear: "Clear",
      weekStart: 1,
      format: "dd/mm/yyyy",
      btnMonth: "Change the month",
      btnPrevMonth: "Previous month",
      btnNextMonth: "Next month",
      btnYear: "Change the year",
      btnPrevYear: "Previous year",
      btnNextYear: "Next year",
      btnDecade: "Change the decade",
      btnPrevDecade: "Previous decade",
      btnNextDecade: "Next decade",
      btnPrevCentury: "Previous century",
      btnNextCentury: "Next century"
    },
    it: {
      days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
      months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
      today: "Oggi",
      monthsTitle: "Mesi",
      clear: "Cancella",
      weekStart: 1,
      format: "dd/mm/yyyy",
      btnMonth: "Cambia il mese",
      btnPrevMonth: "Mese precedente",
      btnNextMonth: "Mese successivo",
      btnYear: "Cambia l\'anno",
      btnPrevYear: "Anno precedente",
      btnNextYear: "Anno successivo",
      btnDecade: "Cambia il decennio",
      btnPrevDecade: "Decennio precedente",
      btnNextDecade: "Decennio successivo",
      btnPrevCentury: "Secolo precedente",
      btnNextCentury: "Secolo successivo"
    }
  };

  // config options updatable by setOptions() and their default values
  const defaultOptions = {
    autohide: false,
    beforeShowDay: null,
    beforeShowDecade: null,
    beforeShowMonth: null,
    beforeShowYear: null,
    calendarWeeks: false,
    clearBtn: false,
    dateDelimiter: ',',
    datesDisabled: [],
    daysOfWeekDisabled: [],
    daysOfWeekHighlighted: [],
    defaultViewDate: undefined, // placeholder, defaults to today() by the program
    disableTouchKeyboard: false,
    format: 'mm/dd/yyyy',
    getCalendarWeek: null,
    language: 'en',
    maxDate: null,
    maxNumberOfDates: 1,
    maxView: 3,
    minDate: null,
    nextArrow: '»',
    orientation: 'auto',
    pickLevel: 0,
    prevArrow: '«',
    showDaysOfWeek: true,
    showOnClick: true,
    showOnFocus: true,
    startView: 0,
    title: '',
    todayBtn: false,
    todayBtnMode: 0,
    todayHighlight: false,
    updateOnBlur: true,
    weekStart: 0,
  };

  const {
    language: defaultLang,
    format: defaultFormat,
    weekStart: defaultWeekStart,
  } = defaultOptions;

  // Reducer function to filter out invalid day-of-week from the input
  function sanitizeDOW(dow, day) {
    return dow.length < 6 && day >= 0 && day < 7
      ? pushUnique(dow, day)
      : dow;
  }

  function calcEndOfWeek(startOfWeek) {
    return (startOfWeek + 6) % 7;
  }

  // validate input date. if invalid, fallback to the original value
  function validateDate(value, format, locale, origValue) {
    const date = parseDate(value, format, locale);
    return date !== undefined ? date : origValue;
  }

  // Validate viewId. if invalid, fallback to the original value
  function validateViewId(value, origValue, max = 3) {
    const viewId = parseInt(value, 10);
    return viewId >= 0 && viewId <= max ? viewId : origValue;
  }

  // Create Datepicker configuration to set
  function processOptions(options, datepicker) {
    const inOpts = Object.assign({}, options);
    const config = {};
    const locales = datepicker.constructor.locales;
    const rangeSideIndex = datepicker.rangeSideIndex;
    let {
      format,
      getCalendarWeek,
      language,
      locale,
      maxDate,
      maxView,
      minDate,
      pickLevel,
      startView,
      weekStart,
    } = datepicker.config || {};

    if (inOpts.language) {
      let lang;
      if (inOpts.language !== language) {
        if (locales[inOpts.language]) {
          lang = inOpts.language;
        } else {
          // Check if langauge + region tag can fallback to the one without
          // region (e.g. fr-CA → fr)
          lang = inOpts.language.split('-')[0];
          if (locales[lang] === undefined) {
            lang = false;
          }
        }
      }
      delete inOpts.language;
      if (lang) {


        language = config.language = lang;

        // update locale as well when updating language
        const origLocale = locale || locales[defaultLang];
        // use default language's properties for the fallback
        locale = Object.assign({
          format: defaultFormat,
          weekStart: defaultWeekStart
        }, locales[defaultLang]);
        if (language !== defaultLang) {
          Object.assign(locale, locales[language]);
        }
        config.locale = locale;
        // if format and/or weekStart are the same as old locale's defaults,
        // update them to new locale's defaults
        if (format === origLocale.format) {
          format = config.format = locale.format;
        }
        if (weekStart === origLocale.weekStart) {
          weekStart = config.weekStart = locale.weekStart;
          config.weekEnd = calcEndOfWeek(locale.weekStart);
        }
      }
    }

    if (inOpts.format) {
      const hasToDisplay = typeof inOpts.format.toDisplay === 'function';
      const hasToValue = typeof inOpts.format.toValue === 'function';
      const validFormatString = reFormatTokens.test(inOpts.format);
      if ((hasToDisplay && hasToValue) || validFormatString) {
        format = config.format = inOpts.format;
      }
      delete inOpts.format;
    }

    //*** pick level ***//
    let newPickLevel = pickLevel;
    if (inOpts.pickLevel !== undefined) {
      newPickLevel = validateViewId(inOpts.pickLevel, 2);
      delete inOpts.pickLevel;
    }
    if (newPickLevel !== pickLevel) {
      if (newPickLevel > pickLevel) {
        // complement current minDate/madDate so that the existing range will be
        // expanded to fit the new level later
        if (inOpts.minDate === undefined) {
          inOpts.minDate = minDate;
        }
        if (inOpts.maxDate === undefined) {
          inOpts.maxDate = maxDate;
        }
      }
      // complement datesDisabled so that it will be reset later
      if (!inOpts.datesDisabled) {
        inOpts.datesDisabled = [];
      }
      pickLevel = config.pickLevel = newPickLevel;
    }

    //*** dates ***//
    // while min and maxDate for "no limit" in the options are better to be null
    // (especially when updating), the ones in the config have to be undefined
    // because null is treated as 0 (= unix epoch) when comparing with time value
    let minDt = minDate;
    let maxDt = maxDate;
    if (inOpts.minDate !== undefined) {
      const defaultMinDt = dateValue(0, 0, 1);
      minDt = inOpts.minDate === null
        ? defaultMinDt  // set 0000-01-01 to prevent negative values for year
        : validateDate(inOpts.minDate, format, locale, minDt);
      if (minDt !== defaultMinDt) {
        minDt = regularizeDate(minDt, pickLevel, false);
      }
      delete inOpts.minDate;
    }
    if (inOpts.maxDate !== undefined) {
      maxDt = inOpts.maxDate === null
        ? undefined
        : validateDate(inOpts.maxDate, format, locale, maxDt);
      if (maxDt !== undefined) {
        maxDt = regularizeDate(maxDt, pickLevel, true);
      }
      delete inOpts.maxDate;
    }
    if (maxDt < minDt) {
      minDate = config.minDate = maxDt;
      maxDate = config.maxDate = minDt;
    } else {
      if (minDate !== minDt) {
        minDate = config.minDate = minDt;
      }
      if (maxDate !== maxDt) {
        maxDate = config.maxDate = maxDt;
      }
    }

    if (inOpts.datesDisabled) {
      config.datesDisabled = inOpts.datesDisabled.reduce((dates, dt) => {
        const date = parseDate(dt, format, locale);
        return date !== undefined
          ? pushUnique(dates, regularizeDate(date, pickLevel, rangeSideIndex))
          : dates;
      }, []);
      delete inOpts.datesDisabled;
    }
    if (inOpts.defaultViewDate !== undefined) {
      const viewDate = parseDate(inOpts.defaultViewDate, format, locale);
      if (viewDate !== undefined) {
        config.defaultViewDate = viewDate;
      }
      delete inOpts.defaultViewDate;
    }

    //*** days of week ***//
    if (inOpts.weekStart !== undefined) {
      const wkStart = Number(inOpts.weekStart) % 7;
      if (!isNaN(wkStart)) {
        weekStart = config.weekStart = wkStart;
        config.weekEnd = calcEndOfWeek(wkStart);
      }
      delete inOpts.weekStart;
    }
    if (inOpts.daysOfWeekDisabled) {
      config.daysOfWeekDisabled = inOpts.daysOfWeekDisabled.reduce(sanitizeDOW, []);
      delete inOpts.daysOfWeekDisabled;
    }
    if (inOpts.daysOfWeekHighlighted) {
      config.daysOfWeekHighlighted = inOpts.daysOfWeekHighlighted.reduce(sanitizeDOW, []);
      delete inOpts.daysOfWeekHighlighted;
    }

    //*** multi date ***//
    if (inOpts.maxNumberOfDates !== undefined) {
      const maxNumberOfDates = parseInt(inOpts.maxNumberOfDates, 10);
      if (maxNumberOfDates >= 0) {
        config.maxNumberOfDates = maxNumberOfDates;
        config.multidate = maxNumberOfDates !== 1;
      }
      delete inOpts.maxNumberOfDates;
    }
    if (inOpts.dateDelimiter) {
      config.dateDelimiter = String(inOpts.dateDelimiter);
      delete inOpts.dateDelimiter;
    }

    //*** view ***//
    let newMaxView = maxView;
    if (inOpts.maxView !== undefined) {
      newMaxView = validateViewId(inOpts.maxView, maxView);
      delete inOpts.maxView;
    }
    // ensure max view >= pick level
    newMaxView = pickLevel > newMaxView ? pickLevel : newMaxView;
    if (newMaxView !== maxView) {
      maxView = config.maxView = newMaxView;
    }

    let newStartView = startView;
    if (inOpts.startView !== undefined) {
      newStartView = validateViewId(inOpts.startView, newStartView);
      delete inOpts.startView;
    }
    // ensure pick level <= start view <= max view
    if (newStartView < pickLevel) {
      newStartView = pickLevel;
    } else if (newStartView > maxView) {
      newStartView = maxView;
    }
    if (newStartView !== startView) {
      config.startView = newStartView;
    }

    //*** template ***//
    if (inOpts.prevArrow) {
      const prevArrow = parseHTML(inOpts.prevArrow);
      if (prevArrow.childNodes.length > 0) {
        config.prevArrow = prevArrow.childNodes;
      }
      delete inOpts.prevArrow;
    }
    if (inOpts.nextArrow) {
      const nextArrow = parseHTML(inOpts.nextArrow);
      if (nextArrow.childNodes.length > 0) {
        config.nextArrow = nextArrow.childNodes;
      }
      delete inOpts.nextArrow;
    }

    //*** misc ***//
    if (inOpts.disableTouchKeyboard !== undefined) {
      config.disableTouchKeyboard = 'ontouchstart' in document && !!inOpts.disableTouchKeyboard;
      delete inOpts.disableTouchKeyboard;
    }
    if (inOpts.orientation) {
      const orientation = inOpts.orientation.toLowerCase().split(/\s+/g);
      config.orientation = {
        x: orientation.find(x => (x === 'left' || x === 'right')) || 'auto',
        y: orientation.find(y => (y === 'top' || y === 'bottom')) || 'auto',
      };
      delete inOpts.orientation;
    }
    if (inOpts.todayBtnMode !== undefined) {
      switch(inOpts.todayBtnMode) {
        case 0:
        case 1:
          config.todayBtnMode = inOpts.todayBtnMode;
      }
      delete inOpts.todayBtnMode;
    }

    config.getCalendarWeek =
      typeof inOpts.getCalendarWeek === 'function'
        ? inOpts.getCalendarWeek
        : getCalendarWeek || null;

    delete inOpts.getCalendarWeek;

    //*** copy the rest ***//
    Object.keys(inOpts).forEach((key) => {
      if (inOpts[key] !== undefined && hasProperty(defaultOptions, key)) {
        config[key] = inOpts[key];
      }
    });

    return config;
  }

  // ATTENZIONE: aggiunto aria-hidden="true" perchè plugin non accessibile
  const pickerTemplate = optimizeTemplateHTML(`<div class="datepicker" aria-hidden="true">
  <div class="datepicker-picker">
    <div class="datepicker-header">
      <div class="datepicker-title"></div>
      <div class="datepicker-controls">
        <button type="button" class="%buttonClass% prev-btn"></button>
        <button type="button" class="%buttonClass% view-switch"></button>
        <button type="button" class="%buttonClass% next-btn"></button>
      </div>
    </div>
    <div class="datepicker-main"></div>
    <div class="datepicker-footer">
      <div class="datepicker-controls">
        <button type="button" class="%buttonClass% today-btn"></button>
        <button type="button" class="%buttonClass% clear-btn"></button>
      </div>
    </div>
  </div>
</div>`);

  const daysTemplate = optimizeTemplateHTML(`<div class="days">
  <div class="days-of-week">${createTagRepeat('span', 7, {class: 'dow'})}</div>
  <div class="datepicker-grid">${createTagRepeat('span', 42)}</div>
</div>`);

  const calendarWeeksTemplate = optimizeTemplateHTML(`<div class="calendar-weeks">
  <div class="days-of-week"><span class="dow"></span></div>
  <div class="weeks">${createTagRepeat('span', 6, {class: 'week'})}</div>
</div>`);

  // Base class of the view classes
  class View {
    constructor(picker, config) {
      Object.assign(this, config, {
        picker,
        element: parseHTML(`<div class="datepicker-view"></div>`).firstChild,
        selected: [],
      });
      this.init(this.picker.datepicker.config);
    }

    init(options) {
      if (options.pickLevel !== undefined) {
        this.isMinView = this.id === options.pickLevel;
      }
      this.setOptions(options);
      this.updateFocus();
      this.updateSelection();
    }

    // Execute beforeShow() callback and apply the result to the element
    // args:
    // - current - current value on the iteration on view rendering
    // - timeValue - time value of the date to pass to beforeShow()
    performBeforeHook(el, current, timeValue) {
      let result = this.beforeShow(new Date(timeValue));
      switch (typeof result) {
        case 'boolean':
          result = {enabled: result};
          break;
        case 'string':
          result = {classes: result};
      }

      if (result) {
        if (result.enabled === false) {
          el.classList.add('disabled');
          pushUnique(this.disabled, current);
        }
        if (result.classes) {
          const extraClasses = result.classes.split(/\s+/);
          el.classList.add(...extraClasses);
          if (extraClasses.includes('disabled')) {
            pushUnique(this.disabled, current);
          }
        }
        if (result.content) {
          replaceChildNodes(el, result.content);
        }
      }
    }
  }

  class DaysView extends View {
    constructor(picker) {
      super(picker, {
        id: 0,
        name: 'days',
        cellClass: 'day',
      });
      this.picker = picker;
      this.inputField =  this.picker.datepicker.element;

      this.picker.controls.prevBtn.setAttribute("tabindex", "0");
      this.picker.controls.nextBtn.setAttribute("tabindex", "0");
      this.picker.controls.viewSwitch.setAttribute("tabindex", "0");

      this.prevBtnListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey) {
            const index = Math.round((this.focused - this.start) / 86400000);
            this.grid.children[index].focus();
          }
          else {
            this.picker.controls.viewSwitch.focus();
          }
          
        } else if (event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight") {
          event.preventDefault();
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.viewSwitchListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey){
            this.picker.controls.prevBtn.focus();
          }
          else{
            this.picker.controls.nextBtn.focus();
          }
        }
        else if(event.key == "Enter"){
          for(let i=0; i<newListeners.length; i++) {
            newListeners[i][0].removeEventListener(newListeners[i][1], newListeners[i][2]);
          }
          newListeners = [];
        }
        else if (event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight") {
          event.preventDefault();
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.nextBtnListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey){
            this.picker.controls.viewSwitch.focus();
          }
          else{
            const index = Math.round((this.focused - this.start) / 86400000);
            this.grid.children[index].focus();
          }
        } else if (event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight") {
          event.preventDefault();
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.dateKeyListener = (event) => {
        event.preventDefault();
        switch(event.key) {
          case "ArrowLeft":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowLeft"}));
            break;
          case "ArrowRight":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowRight"}));
            break;
          case "ArrowUp":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowUp"}));
            break;
          case "ArrowDown":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowDown"}));
            break;
          case "Enter":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter"}));
            event.target.focus();
            break;
          case "Escape":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape"}));
            break;
          case "Tab":
            if (event.shiftKey) {
              this.picker.controls.nextBtn.focus();
              break;
            }
            this.picker.controls.prevBtn.focus();
            break;
        }
      };
    }

    init(options, onConstruction = true) {
      if (onConstruction) {
        const inner = parseHTML(daysTemplate).firstChild;
        this.dow = inner.firstChild;
        this.grid = inner.lastChild;
        this.element.appendChild(inner);
      }
      super.init(options);
    }

    setOptions(options) {
      let updateDOW;

      if (hasProperty(options, 'minDate')) {
        this.minDate = options.minDate;
      }
      if (hasProperty(options, 'maxDate')) {
        this.maxDate = options.maxDate;
      }
      if (options.datesDisabled) {
        this.datesDisabled = options.datesDisabled;
      }
      if (options.daysOfWeekDisabled) {
        this.daysOfWeekDisabled = options.daysOfWeekDisabled;
        updateDOW = true;
      }
      if (options.daysOfWeekHighlighted) {
        this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
      }
      if (options.todayHighlight !== undefined) {
        this.todayHighlight = options.todayHighlight;
      }
      if (options.weekStart !== undefined) {
        this.weekStart = options.weekStart;
        this.weekEnd = options.weekEnd;
        updateDOW = true;
      }
      if (options.locale) {
        const locale = this.locale = options.locale;
        this.dayNames = locale.daysMin;
        this.switchLabelFormat = locale.titleFormat;
        updateDOW = true;
      }
      if (options.beforeShowDay !== undefined) {
        this.beforeShow = typeof options.beforeShowDay === 'function'
          ? options.beforeShowDay
          : undefined;
      }

      if (options.calendarWeeks !== undefined) {
        if (options.calendarWeeks && !this.calendarWeeks) {
          const weeksElem = parseHTML(calendarWeeksTemplate).firstChild;
          this.calendarWeeks = {
            element: weeksElem,
            dow: weeksElem.firstChild,
            weeks: weeksElem.lastChild,
          };
          this.element.insertBefore(weeksElem, this.element.firstChild);
        } else if (this.calendarWeeks && !options.calendarWeeks) {
          this.element.removeChild(this.calendarWeeks.element);
          this.calendarWeeks = null;
        }
      }

      if (typeof options.getCalendarWeek === 'function') {
        this.getCalendarWeek = options.getCalendarWeek;
      }

      if (options.showDaysOfWeek !== undefined) {
        if (options.showDaysOfWeek) {
          showElement(this.dow);
          if (this.calendarWeeks) {
            showElement(this.calendarWeeks.dow);
          }
        } else {
          hideElement(this.dow);
          if (this.calendarWeeks) {
            hideElement(this.calendarWeeks.dow);
          }
        }
      }

      // update days-of-week when locale, daysOfweekDisabled or weekStart is changed
      if (updateDOW) {
        Array.from(this.dow.children).forEach((el, index) => {
          const dow = (this.weekStart + index) % 7;
          el.textContent = this.dayNames[dow];
          el.className = this.daysOfWeekDisabled.includes(dow) ? 'dow disabled' : 'dow';
        });
      }
    }

    // Apply update on the focused date to view's settings
    updateFocus() {
      const viewDate = new Date(this.picker.viewDate);
      const viewYear = viewDate.getFullYear();
      const viewMonth = viewDate.getMonth();
      const firstOfMonth = dateValue(viewYear, viewMonth, 1);
      const start = dayOfTheWeekOf(firstOfMonth, this.weekStart, this.weekStart);

      this.first = firstOfMonth;
      this.last = dateValue(viewYear, viewMonth + 1, 0);
      this.start = start;
      this.focused = this.picker.viewDate;
    }

    // Apply update on the selected dates to view's settings
    updateSelection() {
      const {dates, rangepicker} = this.picker.datepicker;
      this.selected = dates;
      if (rangepicker) {
        this.range = rangepicker.dates;
      }
    }

    updateControlsListeners() {
      this.picker.controls.prevBtn.addEventListener("keydown", this.prevBtnListener);
      newListeners.push([this.picker.controls.prevBtn, "keydown", this.prevBtnListener]);

      this.picker.controls.viewSwitch.addEventListener("keydown", this.viewSwitchListener);
      newListeners.push([this.picker.controls.viewSwitch, "keydown", this.viewSwitchListener]);

      this.picker.controls.nextBtn.addEventListener("keydown", this.nextBtnListener);
      newListeners.push([this.picker.controls.nextBtn, "keydown", this.nextBtnListener]);
    }

     // Update the entire view UI
    render() {
      // update today marker on ever render
      this.today = this.todayHighlight ? today() : undefined;
      // refresh disabled dates on every render in order to clear the ones added
      // by beforeShow hook at previous render
      this.disabled = [...this.datesDisabled];

      const switchLabel = formatDate(this.focused, this.switchLabelFormat, this.locale);
      this.picker.setViewSwitchLabel(switchLabel);
      this.picker.setPrevBtnDisabled(this.first <= this.minDate);
      this.picker.setNextBtnDisabled(this.last >= this.maxDate);

      this.picker.controls.prevBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnPrevMonth);
      this.picker.controls.nextBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnNextMonth);
      this.picker.controls.viewSwitch.setAttribute("aria-label", this.picker.datepicker.config.locale.btnMonth);

      if (this.calendarWeeks) {
        const startOfWeek = dayOfTheWeekOf(this.first, 1, this.weekStart);

        const calcWeek = (timestamp, weekStart) => {
          if (this.getCalendarWeek) {
            return this.getCalendarWeek(new Date(timestamp), weekStart);
          }

          return getWeek(timestamp);
        };

        Array.from(this.calendarWeeks.weeks.children).forEach((el, index) => {
          el.textContent = calcWeek(addWeeks(startOfWeek, index), this.weekStart);
        });
      }
      Array.from(this.grid.children).forEach((el, index) => {
        const classList = el.classList;
        const current = addDays(this.start, index);
        const date = new Date(current);
        const day = date.getDay();

        el.className = `datepicker-cell ${this.cellClass}`;
        
        // ATTENZIONE: AGGIUNGERE il aria-label con "nomeGiorno GIORNO MESE ANNO" per esteso e togliere il title momentaneo qui sotto
        el.title = `${this.picker.datepicker.config.locale.days[day]} ${date.getDate()} ${this.picker.datepicker.config.locale.months[date.getMonth()]} ${date.getFullYear()}`;
        el.setAttribute("aria-label",`${el.title}`)

        el.dataset.date = current;
        el.textContent = date.getDate();

        if (current < this.first) {
          classList.add('prev');
        } else if (current > this.last) {
          classList.add('next');
        }
        if (this.today === current) {
          classList.add('today');
        }
        if (current < this.minDate || current > this.maxDate || this.disabled.includes(current)) {
          classList.add('disabled');
        }
        if (this.daysOfWeekDisabled.includes(day)) {
          classList.add('disabled');
          pushUnique(this.disabled, current);
        }
        if (this.daysOfWeekHighlighted.includes(day)) {
          classList.add('highlighted');
        }
        if (this.range) {
          const [rangeStart, rangeEnd] = this.range;
          if (current > rangeStart && current < rangeEnd) {
            classList.add('range');
          }
          if (current === rangeStart) {
            classList.add('range-start');
          }
          if (current === rangeEnd) {
            classList.add('range-end');
          }
        }
        if (this.selected.includes(current)) {
          classList.add('selected');
        }
        if (current === this.focused) {
          classList.add('focused');
          el.setAttribute("tabindex", "0");
          el.focus();
          if(prevBtnClicked){
            this.picker.controls.prevBtn.focus();
            prevBtnClicked = false;
          }
          if(nextBtnClicked){
            this.picker.controls.nextBtn.focus();
            nextBtnClicked = false;
          }
          el.addEventListener("keydown", this.dateKeyListener);

          this.updateControlsListeners();
        }

        if (this.beforeShow) {
          this.performBeforeHook(el, current, current);
        }

      });
    }

    // Update the view UI by applying the changes of selected and focused items
    refresh() {
      const [rangeStart, rangeEnd] = this.range || [];
      this.grid
        .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
        .forEach((el) => {
          el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
        });
      Array.from(this.grid.children).forEach((el) => {
        const current = Number(el.dataset.date);
        const classList = el.classList;
        if (current > rangeStart && current < rangeEnd) {
          classList.add('range');
        }
        if (current === rangeStart) {
          classList.add('range-start');
        }
        if (current === rangeEnd) {
          classList.add('range-end');
        }
        if (this.selected.includes(current)) {
          classList.add('selected');
        }
        if (current === this.focused) {
          classList.add('focused');
        }
      });
    }

    // Update the view UI by applying the change of focused item
    refreshFocus() {

      const index = Math.round((this.focused - this.start) / 86400000);
      this.grid.querySelectorAll('.focused').forEach((el) => {
        el.classList.remove('focused');
        el.removeAttribute("tabindex");
        el.removeEventListener("keydown", this.dateKeyListener);
      });

      this.grid.children[index].classList.add('focused');
      this.grid.children[index].setAttribute("tabindex", "0");

      this.grid.children[index].focus();
      this.grid.children[index].addEventListener("keydown", this.dateKeyListener);

    }
  }

  function computeMonthRange(range, thisYear) {
    if (!range || !range[0] || !range[1]) {
      return;
    }

    const [[startY, startM], [endY, endM]] = range;
    if (startY > thisYear || endY < thisYear) {
      return;
    }
    return [
      startY === thisYear ? startM : -1,
      endY === thisYear ? endM : 12,
    ];
  }

  class MonthsView extends View {
    constructor(picker) {
      super(picker, {
        id: 1,
        name: 'months',
        cellClass: 'month',
      });

      this.inputField = this.picker.datepicker.element;

      this.prevBtnListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey) {
            this.grid.children[this.focused].focus();
          }
          else {
            this.picker.controls.viewSwitch.focus();
          }
        } else if (event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight") {
          event.preventDefault();
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.viewSwitchListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey){
            this.picker.controls.prevBtn.focus();
          }
          else{
            this.picker.controls.nextBtn.focus();
          }
        }
        else if(event.key == "Enter"){
          for(let i=0; i<newListeners.length; i++) {
            newListeners[i][0].removeEventListener(newListeners[i][1], newListeners[i][2]);
          }
          newListeners = [];
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
        
      };

      this.nextBtnListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey){
            this.picker.controls.viewSwitch.focus();
          }
          else{
            this.grid.children[this.focused].focus();
          }
        } else if (event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight") {
          event.preventDefault();
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.dateKeyListener = (event) => {
        event.preventDefault();
        switch(event.key) {
          case "ArrowLeft":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowLeft"}));
            break;
          case "ArrowRight":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowRight"}));
            break;
          case "ArrowUp":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowUp"}));
            break;
          case "ArrowDown":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowDown"}));
            break;
          case "Enter":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter"}));
            break;
          case "Escape":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape"}));
            break;
          case "Tab":
            if (event.shiftKey) {
              this.picker.controls.nextBtn.focus();
              break;
            }
            this.picker.controls.prevBtn.focus();
            break;
        }
      };
    }

    init(options, onConstruction = true) {
      if (onConstruction) {
        this.grid = this.element;
        this.element.classList.add('months', 'datepicker-grid');
        this.grid.appendChild(parseHTML(createTagRepeat('span', 12, {'data-month': ix => ix})));
      }
      super.init(options);
    }

    setOptions(options) {
      if (options.locale) {
        this.monthNames = options.locale.monthsShort;
      }
      if (hasProperty(options, 'minDate')) {
        if (options.minDate === undefined) {
          this.minYear = this.minMonth = this.minDate = undefined;
        } else {
          const minDateObj = new Date(options.minDate);
          this.minYear = minDateObj.getFullYear();
          this.minMonth = minDateObj.getMonth();
          this.minDate = minDateObj.setDate(1);
        }
      }
      if (hasProperty(options, 'maxDate')) {
        if (options.maxDate === undefined) {
          this.maxYear = this.maxMonth = this.maxDate = undefined;
        } else {
          const maxDateObj = new Date(options.maxDate);
          this.maxYear = maxDateObj.getFullYear();
          this.maxMonth = maxDateObj.getMonth();
          this.maxDate = dateValue(this.maxYear, this.maxMonth + 1, 0);
        }
      }
      if (this.isMinView) {
        if (options.datesDisabled) {
          this.datesDisabled = options.datesDisabled;
        }
      } else {
        this.datesDisabled = [];
      }
      if (options.beforeShowMonth !== undefined) {
        this.beforeShow = typeof options.beforeShowMonth === 'function'
          ? options.beforeShowMonth
          : undefined;
      }
    }

    // Update view's settings to reflect the viewDate set on the picker
    updateFocus() {
      const viewDate = new Date(this.picker.viewDate);
      this.year = viewDate.getFullYear();
      this.focused = viewDate.getMonth();
    }

    // Update view's settings to reflect the selected dates
    updateSelection() {
      const {dates, rangepicker} = this.picker.datepicker;
      this.selected = dates.reduce((selected, timeValue) => {
        const date = new Date(timeValue);
        const year = date.getFullYear();
        const month = date.getMonth();
        if (selected[year] === undefined) {
          selected[year] = [month];
        } else {
          pushUnique(selected[year], month);
        }
        return selected;
      }, {});
      if (rangepicker && rangepicker.dates) {
        this.range = rangepicker.dates.map(timeValue => {
          const date = new Date(timeValue);
          return isNaN(date) ? undefined : [date.getFullYear(), date.getMonth()];
        });
      }
    }

    // Update the entire view UI
    render() {
      // refresh disabled months on every render in order to clear the ones added
      // by beforeShow hook at previous render
      // this.disabled = [...this.datesDisabled];
      this.disabled = this.datesDisabled.reduce((arr, disabled) => {
        const dt = new Date(disabled);
        if (this.year === dt.getFullYear()) {
          arr.push(dt.getMonth());
        }
        return arr;
      }, []);

      this.picker.setViewSwitchLabel(this.year);
      this.picker.setPrevBtnDisabled(this.year <= this.minYear);
      this.picker.setNextBtnDisabled(this.year >= this.maxYear);
      this.picker.controls.prevBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnPrevYear);
      this.picker.controls.nextBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnNextYear);
      this.picker.controls.viewSwitch.setAttribute("aria-label", this.picker.datepicker.config.locale.btnYear);

      const selected = this.selected[this.year] || [];
      const yrOutOfRange = this.year < this.minYear || this.year > this.maxYear;
      const isMinYear = this.year === this.minYear;
      const isMaxYear = this.year === this.maxYear;
      const range = computeMonthRange(this.range, this.year);

      Array.from(this.grid.children).forEach((el, index) => {
        const classList = el.classList;
        const date = dateValue(this.year, index, 1);

        el.className = `datepicker-cell ${this.cellClass}`;
        if (this.isMinView) {
          el.dataset.date = date;
        }
        // reset text on every render to clear the custom content set
        // by beforeShow hook at previous render
        el.textContent = this.monthNames[index];

        if (
          yrOutOfRange
          || isMinYear && index < this.minMonth
          || isMaxYear && index > this.maxMonth
          || this.disabled.includes(index)
        ) {
          classList.add('disabled');
        }
        if (range) {
          const [rangeStart, rangeEnd] = range;
          if (index > rangeStart && index < rangeEnd) {
            classList.add('range');
          }
          if (index === rangeStart) {
            classList.add('range-start');
          }
          if (index === rangeEnd) {
            classList.add('range-end');
          }
        }
        if (selected.includes(index)) {
          classList.add('selected');
        }
        if (index === this.focused) {
          classList.add('focused');
          el.setAttribute('tabindex', '0');
          el.focus();
          if(prevBtnClicked){
            this.picker.controls.prevBtn.focus();
            prevBtnClicked = false;
          }
          if(nextBtnClicked){
            this.picker.controls.nextBtn.focus();
            nextBtnClicked = false;
          }
          el.addEventListener('keydown', this.dateKeyListener);
          this.picker.controls.prevBtn.addEventListener("keydown", this.prevBtnListener);
          newListeners.push([this.picker.controls.prevBtn, "keydown", this.prevBtnListener]);

          this.picker.controls.viewSwitch.addEventListener("keydown", this.viewSwitchListener);
          newListeners.push([this.picker.controls.viewSwitch, "keydown", this.viewSwitchListener]);

          this.picker.controls.nextBtn.addEventListener("keydown", this.nextBtnListener);
          newListeners.push([this.picker.controls.nextBtn, "keydown", this.nextBtnListener]);
        }

        if (this.beforeShow) {
          this.performBeforeHook(el, index, date);
        }
      });
    }

    // Update the view UI by applying the changes of selected and focused items
    refresh() {
      const selected = this.selected[this.year] || [];
      const [rangeStart, rangeEnd] = computeMonthRange(this.range, this.year) || [];
      this.grid
        .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
        .forEach((el) => {
          el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
        });
      Array.from(this.grid.children).forEach((el, index) => {
        const classList = el.classList;
        if (index > rangeStart && index < rangeEnd) {
          classList.add('range');
        }
        if (index === rangeStart) {
          classList.add('range-start');
        }
        if (index === rangeEnd) {
          classList.add('range-end');
        }
        if (selected.includes(index)) {
          classList.add('selected');
        }
        if (index === this.focused) {
          classList.add('focused');
        }
      });
    }

    // Update the view UI by applying the change of focused item
    refreshFocus() {
      this.grid.querySelectorAll('.focused').forEach((el) => {
        el.classList.remove('focused');
        el.removeAttribute("tabindex");
        el.removeEventListener("keydown", this.dateKeyListener);
      });
      this.grid.children[this.focused].classList.add('focused');
      this.grid.children[this.focused].setAttribute("tabindex", "0");
      this.grid.children[this.focused].focus();
      this.grid.children[this.focused].addEventListener("keydown", this.dateKeyListener);
    }
  }

  function toTitleCase(word) {
    return [...word].reduce((str, ch, ix) => str += ix ? ch : ch.toUpperCase(), '');
  }

  // Class representing the years and decades view elements
  class YearsView extends View {
    constructor(picker, config) {
      super(picker, config);

      this.inputField = this.picker.datepicker.element;

      this.prevBtnListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey) {
            const index = Math.round((this.focused - this.start) / this.step);
            this.grid.children[index].focus();
          }
          else {
            if(this.id == 2){
              this.picker.controls.viewSwitch.focus();
            }
            else{
              this.picker.controls.nextBtn.focus();
            }
          }
        } else if (event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight") {
          event.preventDefault();
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.viewSwitchListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey){
            this.picker.controls.prevBtn.focus();
          }
          else{
            this.picker.controls.nextBtn.focus();
          }
        }
        else if(event.key == "Enter" && this.picker.currentView.id != 3){
          for(let i=0; i<newListeners.length; i++) {
            newListeners[i][0].removeEventListener(newListeners[i][1], newListeners[i][2]);
          }
          newListeners = [];
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.nextBtnListener = (event) => {
        if (event.key == "Tab") {
          event.preventDefault();
          if(event.shiftKey){
            if(this.id == 2){
              this.picker.controls.viewSwitch.focus();
            }
            else{
              this.picker.controls.prevBtn.focus();
            }
          }
          else{
            const index = Math.round((this.focused - this.start) / this.step);
            this.grid.children[index].focus();
          }
        } else if (event.key == "ArrowLeft" || event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight") {
          event.preventDefault();
        } else if (event.key == "Escape") {
          event.preventDefault();
          this.picker.datepicker.inputField.focus();
          this.picker.hide();
          refreshUI(this.picker.datepicker, 2);
        }
      };

      this.dateKeyListener = (event) => {
        event.preventDefault();
        switch(event.key) {
          case "ArrowLeft":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowLeft"}));
            break;
          case "ArrowRight":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowRight"}));
            break;
          case "ArrowUp":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowUp"}));
            break;
          case "ArrowDown":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "ArrowDown"}));
            break;
          case "Enter":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter"}));
            break;
          case "Escape":
            this.inputField.focus();
            this.inputField.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape"}));
            break;
          case "Tab":
            if (event.shiftKey) {
              this.picker.controls.nextBtn.focus();
              break;
            }
            this.picker.controls.prevBtn.focus();
            break;
        }
      };
    }

    init(options, onConstruction = true) {
      if (onConstruction) {
        this.navStep = this.step * 10;
        this.beforeShowOption = `beforeShow${toTitleCase(this.cellClass)}`;
        this.grid = this.element;
        this.element.classList.add(this.name, 'datepicker-grid');
        this.grid.appendChild(parseHTML(createTagRepeat('span', 12)));
      }
      super.init(options);
    }

    setOptions(options) {
      if (hasProperty(options, 'minDate')) {
        if (options.minDate === undefined) {
          this.minYear = this.minDate = undefined;
        } else {
          this.minYear = startOfYearPeriod(options.minDate, this.step);
          this.minDate = dateValue(this.minYear, 0, 1);
        }
      }
      if (hasProperty(options, 'maxDate')) {
        if (options.maxDate === undefined) {
          this.maxYear = this.maxDate = undefined;
        } else {
          this.maxYear = startOfYearPeriod(options.maxDate, this.step);
          this.maxDate = dateValue(this.maxYear, 11, 31);
        }
      }
      if (this.isMinView) {
        if (options.datesDisabled) {
          this.datesDisabled = options.datesDisabled;
        }
      } else {
        this.datesDisabled = [];
      }
      if (options[this.beforeShowOption] !== undefined) {
        const beforeShow = options[this.beforeShowOption];
        this.beforeShow = typeof beforeShow === 'function' ? beforeShow : undefined;
      }
    }

    // Update view's settings to reflect the viewDate set on the picker
    updateFocus() {
      const viewDate = new Date(this.picker.viewDate);
      const first = startOfYearPeriod(viewDate, this.navStep);
      const last = first + 9 * this.step;

      this.first = first;
      this.last = last;
      this.start = first - this.step;
      this.focused = startOfYearPeriod(viewDate, this.step);
    }

    // Update view's settings to reflect the selected dates
    updateSelection() {
      const {dates, rangepicker} = this.picker.datepicker;
      this.selected = dates.reduce((years, timeValue) => {
        return pushUnique(years, startOfYearPeriod(timeValue, this.step));
      }, []);
      if (rangepicker && rangepicker.dates) {
        this.range = rangepicker.dates.map(timeValue => {
          if (timeValue !== undefined) {
            return startOfYearPeriod(timeValue, this.step);
          }
        });
      }
    }

    // Update the entire view UI
    render() {
      // refresh disabled years on every render in order to clear the ones added
      // by beforeShow hook at previous render
      // this.disabled = [...this.datesDisabled];
      this.disabled = this.datesDisabled.map(disabled => new Date(disabled).getFullYear());

      this.picker.setViewSwitchLabel(`${this.first}-${this.last}`);
      this.picker.setPrevBtnDisabled(this.first <= this.minYear);
      this.picker.setNextBtnDisabled(this.last >= this.maxYear);

      switch(this.id){
        case 2:
          this.picker.controls.prevBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnPrevDecade);
          this.picker.controls.nextBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnNextDecade);
          this.picker.controls.viewSwitch.setAttribute("aria-label", this.picker.datepicker.config.locale.btnDecade);
        break;
        case 3:
          this.picker.controls.prevBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnPrevCentury);
          this.picker.controls.nextBtn.setAttribute("aria-label", this.picker.datepicker.config.locale.btnNextCentury);
          this.picker.controls.viewSwitch.removeAttribute("aria-label");
          break;
        default:
          break;
      }

      Array.from(this.grid.children).forEach((el, index) => {
        const classList = el.classList;
        const current = this.start + (index * this.step);
        const date = dateValue(current, 0, 1);

        el.className = `datepicker-cell ${this.cellClass}`;
        if (this.isMinView) {
          el.dataset.date = date;
        }
        el.textContent = el.dataset.year = current;

        if (index === 0) {
          classList.add('prev');
        } else if (index === 11) {
          classList.add('next');
        }
        if (current < this.minYear || current > this.maxYear || this.disabled.includes(current)) {
          classList.add('disabled');
        }
        if (this.range) {
          const [rangeStart, rangeEnd] = this.range;
          if (current > rangeStart && current < rangeEnd) {
            classList.add('range');
          }
          if (current === rangeStart) {
            classList.add('range-start');
          }
          if (current === rangeEnd) {
            classList.add('range-end');
          }
        }
        if (this.selected.includes(current)) {
          classList.add('selected');
        }
        if (current === this.focused) {
          classList.add('focused');
          el.setAttribute('tabindex', '0');
          el.focus();
          if(prevBtnClicked){
            this.picker.controls.prevBtn.focus();
            prevBtnClicked = false;
          }
          if(nextBtnClicked){
            this.picker.controls.nextBtn.focus();
            nextBtnClicked = false;
          }
          el.addEventListener('keydown', this.dateKeyListener);
          this.picker.controls.prevBtn.addEventListener("keydown", this.prevBtnListener);
          newListeners.push([this.picker.controls.prevBtn, "keydown", this.prevBtnListener]);

          this.picker.controls.viewSwitch.addEventListener("keydown", this.viewSwitchListener);
          newListeners.push([this.picker.controls.viewSwitch, "keydown", this.viewSwitchListener]);

          this.picker.controls.nextBtn.addEventListener("keydown", this.nextBtnListener);
          newListeners.push([this.picker.controls.nextBtn, "keydown", this.nextBtnListener]);
        }

        if (this.beforeShow) {
          this.performBeforeHook(el, current, date);
        }
      });
    }

    // Update the view UI by applying the changes of selected and focused items
    refresh() {
      const [rangeStart, rangeEnd] = this.range || [];
      this.grid
        .querySelectorAll('.range, .range-start, .range-end, .selected, .focused')
        .forEach((el) => {
          el.classList.remove('range', 'range-start', 'range-end', 'selected', 'focused');
        });
      Array.from(this.grid.children).forEach((el) => {
        const current = Number(el.textContent);
        const classList = el.classList;
        if (current > rangeStart && current < rangeEnd) {
          classList.add('range');
        }
        if (current === rangeStart) {
          classList.add('range-start');
        }
        if (current === rangeEnd) {
          classList.add('range-end');
        }
        if (this.selected.includes(current)) {
          classList.add('selected');
        }
        if (current === this.focused) {
          classList.add('focused');
        }
      });
    }

    // Update the view UI by applying the change of focused item
    refreshFocus() {
      const index = Math.round((this.focused - this.start) / this.step);
      this.grid.querySelectorAll('.focused').forEach((el) => {
        el.classList.remove('focused');
        el.removeAttribute('tabindex');
        el.removeEventListener("keydown", this.dateKeyListener);
      });
      this.grid.children[index].classList.add('focused');
      this.grid.children[index].setAttribute('tabindex', '0');
      this.grid.children[index].focus();
      this.grid.children[index].addEventListener("keydown", this.dateKeyListener);
    }
  }

  function triggerDatepickerEvent(datepicker, type) {
    const detail = {
      date: datepicker.getDate(),
      viewDate: new Date(datepicker.picker.viewDate),
      viewId: datepicker.picker.currentView.id,
      datepicker,
    };
    datepicker.element.dispatchEvent(new CustomEvent(type, {detail}));
  }

  // direction: -1 (to previous), 1 (to next)
  function goToPrevOrNext(datepicker, direction) {
    const {minDate, maxDate} = datepicker.config;
    const {currentView, viewDate} = datepicker.picker;
    let newViewDate;
    switch (currentView.id) {
      case 0:
        newViewDate = addMonths(viewDate, direction);
        break;
      case 1:
        newViewDate = addYears(viewDate, direction);
        break;
      default:
        newViewDate = addYears(viewDate, direction * currentView.navStep);
    }
    newViewDate = limitToRange(newViewDate, minDate, maxDate);
    datepicker.picker.changeFocus(newViewDate).render();
  }

  function switchView(datepicker) {
    const viewId = datepicker.picker.currentView.id;
    if (viewId === datepicker.config.maxView) {
      return;
    }
    datepicker.picker.changeView(viewId + 1).render();
  }

  function unfocus(datepicker) {
    if (datepicker.config.updateOnBlur) {
      datepicker.update({revert: true});
    } else {
      datepicker.refresh('input');
    }
    datepicker.hide();
    for(let i=0; i< newListeners.length; i++) {
      newListeners[i][0].removeEventListener(newListeners[i][1], newListeners[i][2]);
    }
    newListeners = [];
  }

  function goToSelectedMonthOrYear(datepicker, selection) {
    const picker = datepicker.picker;
    const viewDate = new Date(picker.viewDate);
    const viewId = picker.currentView.id;
    const newDate = viewId === 1
      ? addMonths(viewDate, selection - viewDate.getMonth())
      : addYears(viewDate, selection - viewDate.getFullYear());

    picker.changeFocus(newDate).changeView(viewId - 1).render();
  }

  function onClickTodayBtn(datepicker) {
    const picker = datepicker.picker;
    const currentDate = today();
    if (datepicker.config.todayBtnMode === 1) {
      if (datepicker.config.autohide) {
        datepicker.setDate(currentDate);
        return;
      }
      datepicker.setDate(currentDate, {render: false});
      picker.update();
    }
    if (picker.viewDate !== currentDate) {
      picker.changeFocus(currentDate);
    }
    picker.changeView(0).render();
  }

  function onClickClearBtn(datepicker) {
    datepicker.setDate({clear: true});
  }

  function onClickViewSwitch(datepicker) {
    switchView(datepicker);
  }

  function onClickPrevBtn(datepicker) {
    prevBtnClicked = true;
    goToPrevOrNext(datepicker, -1);
  }

  function onClickNextBtn(datepicker) {
    nextBtnClicked = true;
    goToPrevOrNext(datepicker, 1);
  }

  // For the picker's main block to delegete the events from `datepicker-cell`s
  function onClickView(datepicker, ev) {
    const target = findElementInEventPath(ev, '.datepicker-cell');
    if (!target || target.classList.contains('disabled')) {
      return;
    }

    const {id, isMinView} = datepicker.picker.currentView;
    if (isMinView) {
      datepicker.setDate(Number(target.dataset.date));
    } else if (id === 1) {
      goToSelectedMonthOrYear(datepicker, Number(target.dataset.month));
    } else {
      goToSelectedMonthOrYear(datepicker, Number(target.dataset.year));
    }
  }

  function onMousedownPicker(ev) {
    ev.preventDefault();
  }

  const orientClasses = ['left', 'top', 'right', 'bottom'].reduce((obj, key) => {
    obj[key] = `datepicker-orient-${key}`;
    return obj;
  }, {});
  const toPx = num => num ? `${num}px` : num;

  function processPickerOptions(picker, options) {
    if (options.title !== undefined) {
      if (options.title) {
        picker.controls.title.textContent = options.title;
        showElement(picker.controls.title);
      } else {
        picker.controls.title.textContent = '';
        hideElement(picker.controls.title);
      }
    }
    if (options.prevArrow) {
      const prevBtn = picker.controls.prevBtn;
      emptyChildNodes(prevBtn);
      options.prevArrow.forEach((node) => {
        prevBtn.appendChild(node.cloneNode(true));
      });
    }
    if (options.nextArrow) {
      const nextBtn = picker.controls.nextBtn;
      emptyChildNodes(nextBtn);
      options.nextArrow.forEach((node) => {
        nextBtn.appendChild(node.cloneNode(true));
      });
    }
    if (options.locale) {
      picker.controls.todayBtn.textContent = options.locale.today;
      picker.controls.clearBtn.textContent = options.locale.clear;
    }
    if (options.todayBtn !== undefined) {
      if (options.todayBtn) {
        showElement(picker.controls.todayBtn);
      } else {
        hideElement(picker.controls.todayBtn);
      }
    }
    if (hasProperty(options, 'minDate') || hasProperty(options, 'maxDate')) {
      const {minDate, maxDate} = picker.datepicker.config;
      picker.controls.todayBtn.disabled = !isInRange(today(), minDate, maxDate);
    }
    if (options.clearBtn !== undefined) {
      if (options.clearBtn) {
        showElement(picker.controls.clearBtn);
      } else {
        hideElement(picker.controls.clearBtn);
      }
    }
  }

  // Compute view date to reset, which will be...
  // - the last item of the selected dates or defaultViewDate if no selection
  // - limitted to minDate or maxDate if it exceeds the range
  function computeResetViewDate(datepicker) {
    const {dates, config} = datepicker;
    const viewDate = dates.length > 0 ? lastItemOf(dates) : config.defaultViewDate;
    return limitToRange(viewDate, config.minDate, config.maxDate);
  }

  // Change current view's view date
  function setViewDate(picker, newDate) {
    const oldViewDate = new Date(picker.viewDate);
    const newViewDate = new Date(newDate);
    const {id, year, first, last} = picker.currentView;
    const viewYear = newViewDate.getFullYear();

    picker.viewDate = newDate;
    if (viewYear !== oldViewDate.getFullYear()) {
      triggerDatepickerEvent(picker.datepicker, 'changeYear');
    }
    if (newViewDate.getMonth() !== oldViewDate.getMonth()) {
      triggerDatepickerEvent(picker.datepicker, 'changeMonth');
    }

    // return whether the new date is in different period on time from the one
    // displayed in the current view
    // when true, the view needs to be re-rendered on the next UI refresh.
    switch (id) {
      case 0:
        return newDate < first || newDate > last;
      case 1:
        return viewYear !== year;
      default:
        return viewYear < first || viewYear > last;
    }
  }

  function getTextDirection(el) {
    return window.getComputedStyle(el).direction;
  }

  // find the closet scrollable ancestor elemnt under the body
  function findScrollParents(el) {
    const parent = getParent(el);
    if (parent === document.body || !parent) {
      return;
    }

    // checking overflow only is enough because computed overflow cannot be
    // visible or a combination of visible and other when either axis is set
    // to other than visible.
    // (Setting one axis to other than 'visible' while the other is 'visible'
    // results in the other axis turning to 'auto')
    return window.getComputedStyle(parent).overflow !== 'visible'
      ? parent
      : findScrollParents(parent);
  }

  // Class representing the picker UI
  class Picker {
    constructor(datepicker) {
      const {config} = this.datepicker = datepicker;

      const template = pickerTemplate.replace(/%buttonClass%/g, config.buttonClass);
      const element = this.element = parseHTML(template).firstChild;
      const [header, main, footer] = element.firstChild.children;
      const title = header.firstElementChild;
      const [prevBtn, viewSwitch, nextBtn] = header.lastElementChild.children;
      const [todayBtn, clearBtn] = footer.firstChild.children;
      const controls = {
        title,
        prevBtn,
        viewSwitch,
        nextBtn,
        todayBtn,
        clearBtn,
      };
      this.main = main;
      this.controls = controls;

      const elementClass = datepicker.inline ? 'inline' : 'dropdown';
      element.classList.add(`datepicker-${elementClass}`);

      processPickerOptions(this, config);
      this.viewDate = computeResetViewDate(datepicker);

      // set up event listeners
      registerListeners(datepicker, [
        [element, 'mousedown', onMousedownPicker],
        [main, 'click', onClickView.bind(null, datepicker)],
        [controls.viewSwitch, 'click', onClickViewSwitch.bind(null, datepicker)],
        [controls.prevBtn, 'click', onClickPrevBtn.bind(null, datepicker)],
        [controls.nextBtn, 'click', onClickNextBtn.bind(null, datepicker)],
        [controls.todayBtn, 'click', onClickTodayBtn.bind(null, datepicker)],
        [controls.clearBtn, 'click', onClickClearBtn.bind(null, datepicker)],
      ]);

      // set up views
      this.views = [
        new DaysView(this),
        new MonthsView(this),
        new YearsView(this, {id: 2, name: 'years', cellClass: 'year', step: 1}),
        new YearsView(this, {id: 3, name: 'decades', cellClass: 'decade', step: 10}),
      ];
      this.currentView = this.views[config.startView];

      this.currentView.render();
      this.main.appendChild(this.currentView.element);
      if (config.container) {
        config.container.appendChild(this.element);
      } else {
        datepicker.inputField.after(this.element);
      }
    }

    setOptions(options) {
      processPickerOptions(this, options);
      this.views.forEach((view) => {
        view.init(options, false);
      });
      this.currentView.render();
    }

    detach() {
      this.element.remove();
    }

    show() {
      
      if (this.active) {
        return;
      }
      const {datepicker, element} = this;
      for(let i = 0; i < datepicker.picker.views.length; i++) {
        if(datepicker.picker.views[i].id == 0) {
          datepicker.picker.views[i].updateControlsListeners();
        }
      }
      if (datepicker.inline) {
        element.classList.add('active');
      } else {
        // ensure picker's direction matches input's
        const inputDirection = getTextDirection(datepicker.inputField);
        if (inputDirection !== getTextDirection(getParent(element))) {
          element.dir = inputDirection;
        } else if (element.dir) {
          element.removeAttribute('dir');
        }

        element.style.visiblity = 'hidden';
        element.classList.add('active');
        this.place();
        element.style.visiblity = '';

        if (datepicker.config.disableTouchKeyboard) {
          datepicker.inputField.blur();
        }
      }
      this.active = true;
      triggerDatepickerEvent(datepicker, 'show');
    }

    hide() {
      if (!this.active) {
        return;
      }
      this.datepicker.exitEditMode();
      this.element.classList.remove('active');
      this.active = false;
      triggerDatepickerEvent(this.datepicker, 'hide');
    }

    place() {
      const {classList, offsetParent, style} = this.element;
      const {config, inputField} = this.datepicker;
      const {
        width: calendarWidth,
        height: calendarHeight,
      } = this.element.getBoundingClientRect();
      const {
        left: inputLeft,
        top: inputTop,
        right: inputRight,
        bottom: inputBottom,
        width: inputWidth,
        height: inputHeight
      } = inputField.getBoundingClientRect();
      let {x: orientX, y: orientY} = config.orientation;
      let left = inputLeft;
      let top = inputTop;

      // caliculate offsetLeft/Top of inputField
      if (offsetParent === document.body || !offsetParent) {
        left += window.scrollX;
        top += window.scrollY;
      } else {
        const offsetParentRect = offsetParent.getBoundingClientRect();
        left -= offsetParentRect.left - offsetParent.scrollLeft;
        top -= offsetParentRect.top - offsetParent.scrollTop;
      }

      // caliculate the boundaries of the visible area that contains inputField
      const scrollParent = findScrollParents(inputField);
      let scrollAreaLeft = 0;
      let scrollAreaTop = 0;
      let {
        clientWidth: scrollAreaRight,
        clientHeight: scrollAreaBottom,
      } = document.documentElement;

      if (scrollParent) {
        const scrollParentRect = scrollParent.getBoundingClientRect();
        if (scrollParentRect.top > 0) {
          scrollAreaTop = scrollParentRect.top;
        }
        if (scrollParentRect.left > 0) {
          scrollAreaLeft = scrollParentRect.left;
        }
        if (scrollParentRect.right < scrollAreaRight) {
          scrollAreaRight = scrollParentRect.right;
        }
        if (scrollParentRect.bottom < scrollAreaBottom) {
          scrollAreaBottom = scrollParentRect.bottom;
        }
      }

      // determine the horizontal orientation and left position
      let adjustment = 0;
      if (orientX === 'auto') {
        if (inputLeft < scrollAreaLeft) {
          orientX = 'left';
          adjustment = scrollAreaLeft - inputLeft;
        } else if (inputLeft + calendarWidth > scrollAreaRight) {
          orientX = 'right';
          if (scrollAreaRight < inputRight) {
            adjustment = scrollAreaRight - inputRight;
          }
        } else if (getTextDirection(inputField) === 'rtl') {
          orientX = inputRight - calendarWidth < scrollAreaLeft ? 'left' : 'right';
        } else {
          orientX = 'left';
        }
      }
      if (orientX === 'right') {
        left += inputWidth - calendarWidth;
      }
      left += adjustment;

      // determine the vertical orientation and top position
      if (orientY === 'auto') {
        if (inputTop - calendarHeight > scrollAreaTop) {
          orientY = inputBottom + calendarHeight > scrollAreaBottom ? 'top' : 'bottom';
        } else {
          orientY = 'bottom';
        }
      }
      if (orientY === 'top') {
        top -= calendarHeight;
      } else {
        top += inputHeight;
      }

      classList.remove(...Object.values(orientClasses));
      classList.add(orientClasses[orientX], orientClasses[orientY]);

      style.left = toPx(left);
      style.top = toPx(top);
    }

    setViewSwitchLabel(labelText) {
      this.controls.viewSwitch.textContent = labelText;
    }

    setPrevBtnDisabled(disabled) {
      this.controls.prevBtn.disabled = disabled;
    }

    setNextBtnDisabled(disabled) {
      this.controls.nextBtn.disabled = disabled;
    }

    changeView(viewId) {
      const oldView = this.currentView;
      const newView =  this.views[viewId];
      if (newView.id !== oldView.id) {
        this.currentView = newView;
        this._renderMethod = 'render';
        triggerDatepickerEvent(this.datepicker, 'changeView');
        this.main.replaceChild(newView.element, oldView.element);
      }
      return this;
    }

    // Change the focused date (view date)
    changeFocus(newViewDate) {
      this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refreshFocus';
      this.views.forEach((view) => {
        view.updateFocus();
      });
      return this;
    }

    // Apply the change of the selected dates
    update() {
      const newViewDate = computeResetViewDate(this.datepicker);
      this._renderMethod = setViewDate(this, newViewDate) ? 'render' : 'refresh';
      this.views.forEach((view) => {
        view.updateFocus();
        view.updateSelection();
      });
      return this;
    }

    // Refresh the picker UI
    render(quickRender = true) {
      const renderMethod = (quickRender && this._renderMethod) || 'render';
      delete this._renderMethod;

      this.currentView[renderMethod]();
    }
  }

  // Find the closest date that doesn't meet the condition for unavailable date
  // Returns undefined if no available date is found
  // addFn: function to calculate the next date
  //   - args: time value, amount
  // increase: amount to pass to addFn
  // testFn: function to test the unavailablity of the date
  //   - args: time value; retun: true if unavailable
  function findNextAvailableOne(date, addFn, increase, testFn, min, max) {
    if (!isInRange(date, min, max)) {
      return;
    }
    if (testFn(date)) {
      const newDate = addFn(date, increase);
      return findNextAvailableOne(newDate, addFn, increase, testFn, min, max);
    }
    return date;
  }

  // direction: -1 (left/up), 1 (right/down)
  // vertical: true for up/down, false for left/right
  function moveByArrowKey(datepicker, ev, direction, vertical) {
    const picker = datepicker.picker;
    const currentView = picker.currentView;
    const step = currentView.step || 1;
    let viewDate = picker.viewDate;
    let addFn;
    let testFn;
    switch (currentView.id) {
      case 0:
        if (vertical) {
          viewDate = addDays(viewDate, direction * 7);
        } else if (ev.ctrlKey || ev.metaKey) {
          viewDate = addYears(viewDate, direction);
        } else {
          viewDate = addDays(viewDate, direction);
        }
        addFn = addDays;
        testFn = (date) => currentView.disabled.includes(date);
        break;
      case 1:
       // viewDate = addMonths(viewDate, vertical ? direction * 4 : direction); THIS WAS AN ALREADY PRESENT BUG
       viewDate = addMonths(viewDate, vertical ? direction * 3 : direction);
        addFn = addMonths;
        testFn = (date) => {
          const dt = new Date(date);
          const {year, disabled} = currentView;
          return dt.getFullYear() === year && disabled.includes(dt.getMonth());
        };
        break;
      default:
        //viewDate = addYears(viewDate, direction * (vertical ? 4 : 1) * step); THIS WAS AN ALREADY PRESENT BUG
        viewDate = addYears(viewDate, direction * (vertical ? 3 : 1) * step);
        addFn = addYears;
        testFn = date => currentView.disabled.includes(startOfYearPeriod(date, step));
    }
    viewDate = findNextAvailableOne(
      viewDate,
      addFn,
      direction < 0 ? -step : step,
      testFn,
      currentView.minDate,
      currentView.maxDate
    );
    if (viewDate !== undefined) {
      picker.changeFocus(viewDate).render();
    }
  }

  function onKeydown(datepicker, ev) {
    const key = ev.key;
    if (key === 'Tab') {
      unfocus(datepicker);
      return;
    }

    const picker = datepicker.picker;
    const {id, isMinView} = picker.currentView;
    if (!picker.active) {
      if (key === 'ArrowDown') {
        picker.show();
      } else {
        if (key === 'Enter') {
          datepicker.update();
        } else if (key === 'Escape') {
          picker.show();
        }
        return;
      }
    } else if (datepicker.editMode) {
      if (key === 'Enter') {
        datepicker.exitEditMode({update: true, autohide: datepicker.config.autohide});
      } else if (key === 'Escape') {
        picker.hide();
      }
      return;
    } else {
      if (key === 'ArrowLeft') {
        if (ev.ctrlKey || ev.metaKey) {
          goToPrevOrNext(datepicker, -1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, false);
        }
      } else if (key === 'ArrowRight') {
        if (ev.ctrlKey || ev.metaKey) {
          goToPrevOrNext(datepicker, 1);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, 1, false);
        }
      } else if (key === 'ArrowUp') {
        if (ev.ctrlKey || ev.metaKey) {
          switchView(datepicker);
        } else if (ev.shiftKey) {
          datepicker.enterEditMode();
          return;
        } else {
          moveByArrowKey(datepicker, ev, -1, true);
        }
      } else if (key === 'ArrowDown') {
        if (ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
          datepicker.enterEditMode();
          return;
        }
        moveByArrowKey(datepicker, ev, 1, true);
      } else if (key === 'Enter') {
        if (isMinView) {
          datepicker.setDate(picker.viewDate);
          return;
        }
        picker.changeView(id - 1).render();
      } else {
        if (key === 'Escape') {
          picker.hide();
        } else if (
          key === 'Backspace'
          || key === 'Delete'
          || (key.length === 1 && !ev.ctrlKey && !ev.metaKey)
        ) {
          datepicker.enterEditMode();
        }
        return;
      }
    }
    ev.preventDefault();
  }

  function onFocus(datepicker) {
    if (datepicker.config.showOnFocus && !datepicker._showing) {
      datepicker.show();
    }
  }

  // for the prevention for entering edit mode while getting focus on click
  function onMousedown(datepicker, ev) {
    const el = ev.target;
    if (datepicker.picker.active || datepicker.config.showOnClick) {
      el._active = isActiveElement(el);
      el._clicking = setTimeout(() => {
        delete el._active;
        delete el._clicking;
      }, 2000);
    }
  }

  function onClickInput(datepicker, ev) {
    const el = ev.target;
    if (!el._clicking) {
      return;
    }
    clearTimeout(el._clicking);
    delete el._clicking;

    if (el._active) {
      datepicker.enterEditMode();
    }
    delete el._active;

    if (datepicker.config.showOnClick) {
      datepicker.show();
    }
  }

  function onPaste(datepicker, ev) {
    if (ev.clipboardData.types.includes('text/plain')) {
      datepicker.enterEditMode();
    }
  }

  // for the `document` to delegate the events from outside the picker/input field
  function onClickOutside(datepicker, ev) {
    const {element, picker} = datepicker;
    // check both picker's and input's activeness to make updateOnBlur work in
    // the cases where...
    // - picker is hidden by ESC key press → input stays focused
    // - input is unfocused by closing mobile keyboard → piker is kept shown
    if (!picker.active && !isActiveElement(element)) {
      return;
    }
    const pickerElem = picker.element;
    if (findElementInEventPath(ev, el => el === element || el === pickerElem)) {
      return;
    }
    unfocus(datepicker);
  }

  function stringifyDates(dates, config) {
    return dates
      .map(dt => formatDate(dt, config.format, config.locale))
      .join(config.dateDelimiter);
  }

  // parse input dates and create an array of time values for selection
  // returns undefined if there are no valid dates in inputDates
  // when origDates (current selection) is passed, the function works to mix
  // the input dates into the current selection
  function processInputDates(datepicker, inputDates, clear = false) {
    // const {config, dates: origDates, rangepicker} = datepicker;
    const {config, dates: origDates, rangeSideIndex} = datepicker;
    if (inputDates.length === 0) {
      // empty input is considered valid unless origiDates is passed
      return clear ? [] : undefined;
    }

    // const rangeEnd = rangepicker && datepicker === rangepicker.datepickers[1];
    let newDates = inputDates.reduce((dates, dt) => {
      let date = parseDate(dt, config.format, config.locale);
      if (date === undefined) {
        return dates;
      }
      // adjust to 1st of the month/Jan 1st of the year
      // or to the last day of the monh/Dec 31st of the year if the datepicker
      // is the range-end picker of a rangepicker
      date = regularizeDate(date, config.pickLevel, rangeSideIndex);
      if (
        isInRange(date, config.minDate, config.maxDate)
        && !dates.includes(date)
        && !config.datesDisabled.includes(date)
        && (config.pickLevel > 0 || !config.daysOfWeekDisabled.includes(new Date(date).getDay()))
      ) {
        dates.push(date);
      }
      return dates;
    }, []);
    if (newDates.length === 0) {
      return;
    }
    if (config.multidate && !clear) {
      // get the synmetric difference between origDates and newDates
      newDates = newDates.reduce((dates, date) => {
        if (!origDates.includes(date)) {
          dates.push(date);
        }
        return dates;
      }, origDates.filter(date => !newDates.includes(date)));
    }
    // do length check always because user can input multiple dates regardless of the mode
    return config.maxNumberOfDates && newDates.length > config.maxNumberOfDates
      ? newDates.slice(config.maxNumberOfDates * -1)
      : newDates;
  }

  // refresh the UI elements
  // modes: 1: input only, 2, picker only, 3 both
  function refreshUI(datepicker, mode = 3, quickRender = true) {
    const {config, picker, inputField} = datepicker;
    if (mode & 2) {
      const newView = picker.active ? config.pickLevel : config.startView;
      picker.update().changeView(newView).render(quickRender);
    }
    if (mode & 1 && inputField) {
      inputField.value = stringifyDates(datepicker.dates, config);
    }
  }

  function setDate(datepicker, inputDates, options) {
    let {clear, render, autohide, revert} = options;
    if (render === undefined) {
      render = true;
    }
    if (!render) {
      autohide = false;
    } else if (autohide === undefined) {
      autohide = datepicker.config.autohide;
    }

    const newDates = processInputDates(datepicker, inputDates, clear);
    if (!newDates && !revert) {
      return;
    }
    if (newDates && newDates.toString() !== datepicker.dates.toString()) {
      datepicker.dates = newDates;
      refreshUI(datepicker, render ? 3 : 1);
      triggerDatepickerEvent(datepicker, 'changeDate');
    } else {
      refreshUI(datepicker, 1);
    }

    if (autohide) {
      datepicker.hide();
    }
  }

  /**
   * Class representing a date picker
   */
  class Datepicker {
    /**
     * Create a date picker
     * @param  {Element} element - element to bind a date picker
     * @param  {Object} [options] - config options
     * @param  {DateRangePicker} [rangepicker] - DateRangePicker instance the
     * date picker belongs to. Use this only when creating date picker as a part
     * of date range picker
     */
    constructor(element, options = {}, rangepicker = undefined) {
      element.datepicker = this;
      this.element = element;

      const config = this.config = Object.assign({
        buttonClass: (options.buttonClass && String(options.buttonClass)) || 'button',
        container: null,
        defaultViewDate: today(),
        maxDate: undefined,
        minDate: undefined,
      }, processOptions(defaultOptions, this));
      // configure by type
      const inline = this.inline = element.tagName !== 'INPUT';
      let inputField;
      if (inline) {
        config.container = element;
      } else {
        if (options.container) {
          // omit string type check because it doesn't guarantee to avoid errors
          // (invalid selector string causes abend with sytax error)
          config.container = options.container instanceof HTMLElement
            ? options.container
            : document.querySelector(options.container);
        }
        inputField = this.inputField = element;
        inputField.classList.add('datepicker-input');
      }
      if (rangepicker) {
        // check validiry
        const index = rangepicker.inputs.indexOf(inputField);
        const datepickers = rangepicker.datepickers;
        if (index < 0 || index > 1 || !Array.isArray(datepickers)) {
          throw Error('Invalid rangepicker object.');
        }
        // attach itaelf to the rangepicker here so that processInputDates() can
        // determine if this is the range-end picker of the rangepicker while
        // setting inital values when pickLevel > 0
        datepickers[index] = this;
        // add getter for rangepicker
        Object.defineProperty(this, 'rangepicker', {
          get() {
            return rangepicker;
          },
        });
        Object.defineProperty(this, 'rangeSideIndex', {
          get() {
            return index;
          },
        });
      }

      // set up config
      this._options = options;
      Object.assign(config, processOptions(options, this));

      // set initial dates
      let initialDates;
      if (inline) {
        initialDates = stringToArray(element.dataset.date, config.dateDelimiter);
        delete element.dataset.date;
      } else {
        initialDates = stringToArray(inputField.value, config.dateDelimiter);
      }
      this.dates = [];
      // process initial value
      const inputDateValues = processInputDates(this, initialDates);
      if (inputDateValues && inputDateValues.length > 0) {
        this.dates = inputDateValues;
      }
      if (inputField) {
        inputField.value = stringifyDates(this.dates, config);
      }

      const picker = this.picker = new Picker(this);

      if (inline) {
        this.show();
      } else {
        // set up event listeners in other modes
        const onMousedownDocument = onClickOutside.bind(null, this);
        const listeners = [
          [inputField, 'keydown', onKeydown.bind(null, this)],
          [inputField, 'focus', onFocus.bind(null, this)],
          [inputField, 'mousedown', onMousedown.bind(null, this)],
          [inputField, 'click', onClickInput.bind(null, this)],
          [inputField, 'paste', onPaste.bind(null, this)],
          [document, 'mousedown', onMousedownDocument],
          [document, 'touchstart', onMousedownDocument],
          [window, 'resize', picker.place.bind(picker)]
        ];
        registerListeners(this, listeners);
      }
    }

    /**
     * Format Date object or time value in given format and language
     * @param  {Date|Number} date - date or time value to format
     * @param  {String|Object} format - format string or object that contains
     * toDisplay() custom formatter, whose signature is
     * - args:
     *   - date: {Date} - Date instance of the date passed to the method
     *   - format: {Object} - the format object passed to the method
     *   - locale: {Object} - locale for the language specified by `lang`
     * - return:
     *     {String} formatted date
     * @param  {String} [lang=en] - language code for the locale to use
     * @return {String} formatted date
     */
    static formatDate(date, format, lang) {
      return formatDate(date, format, lang && locales[lang] || locales.en);
    }

    /**
     * Parse date string
     * @param  {String|Date|Number} dateStr - date string, Date object or time
     * value to parse
     * @param  {String|Object} format - format string or object that contains
     * toValue() custom parser, whose signature is
     * - args:
     *   - dateStr: {String|Date|Number} - the dateStr passed to the method
     *   - format: {Object} - the format object passed to the method
     *   - locale: {Object} - locale for the language specified by `lang`
     * - return:
     *     {Date|Number} parsed date or its time value
     * @param  {String} [lang=en] - language code for the locale to use
     * @return {Number} time value of parsed date
     */
    static parseDate(dateStr, format, lang) {
      return parseDate(dateStr, format, lang && locales[lang] || locales.en);
    }

    /**
     * @type {Object} - Installed locales in `[languageCode]: localeObject` format
     * en`:_English (US)_ is pre-installed.
     */
    static get locales() {
      return locales;
    }

    /**
     * @type {Boolean} - Whether the picker element is shown. `true` whne shown
     */
    get active() {
      return !!(this.picker && this.picker.active);
    }

    /**
     * @type {HTMLDivElement} - DOM object of picker element
     */
    get pickerElement() {
      return this.picker ? this.picker.element : undefined;
    }

    /**
     * Set new values to the config options
     * @param {Object} options - config options to update
     */
    setOptions(options) {
      const picker = this.picker;
      const newOptions = processOptions(options, this);
      Object.assign(this._options, options);
      Object.assign(this.config, newOptions);
      picker.setOptions(newOptions);

      refreshUI(this, 3);
    }

    /**
     * Show the picker element
     */
    show() {
      if (this.inputField) {
        if (this.inputField.disabled) {
          return;
        }
        if (!isActiveElement(this.inputField) && !this.config.disableTouchKeyboard) {
          this._showing = true;
          this.inputField.focus();
          delete this._showing;
        }
      }
      this.picker.show();
    }

    /**
     * Hide the picker element
     * Not available on inline picker
     */
    hide() {
      if (this.inline) {
        return;
      }
      this.picker.hide();
      this.picker.update().changeView(this.config.startView).render();
    }

    /**
     * Destroy the Datepicker instance
     * @return {Detepicker} - the instance destroyed
     */
    destroy() {
      this.hide();
      unregisterListeners(this);
      this.picker.detach();
      if (!this.inline) {
        this.inputField.classList.remove('datepicker-input');
      }
      delete this.element.datepicker;
      return this;
    }

    /**
     * Get the selected date(s)
     *
     * The method returns a Date object of selected date by default, and returns
     * an array of selected dates in multidate mode. If format string is passed,
     * it returns date string(s) formatted in given format.
     *
     * @param  {String} [format] - Format string to stringify the date(s)
     * @return {Date|String|Date[]|String[]} - selected date(s), or if none is
     * selected, empty array in multidate mode and untitled in sigledate mode
     */
    getDate(format = undefined) {
      const callback = format
        ? date => formatDate(date, format, this.config.locale)
        : date => new Date(date);

      if (this.config.multidate) {
        return this.dates.map(callback);
      }
      if (this.dates.length > 0) {
        return callback(this.dates[0]);
      }
    }

    /**
     * Set selected date(s)
     *
     * In multidate mode, you can pass multiple dates as a series of arguments
     * or an array. (Since each date is parsed individually, the type of the
     * dates doesn't have to be the same.)
     * The given dates are used to toggle the select status of each date. The
     * number of selected dates is kept from exceeding the length set to
     * maxNumberOfDates.
     *
     * With clear: true option, the method can be used to clear the selection
     * and to replace the selection instead of toggling in multidate mode.
     * If the option is passed with no date arguments or an empty dates array,
     * it works as "clear" (clear the selection then set nothing), and if the
     * option is passed with new dates to select, it works as "replace" (clear
     * the selection then set the given dates)
     *
     * When render: false option is used, the method omits re-rendering the
     * picker element. In this case, you need to call refresh() method later in
     * order for the picker element to reflect the changes. The input field is
     * refreshed always regardless of this option.
     *
     * When invalid (unparsable, repeated, disabled or out-of-range) dates are
     * passed, the method ignores them and applies only valid ones. In the case
     * that all the given dates are invalid, which is distinguished from passing
     * no dates, the method considers it as an error and leaves the selection
     * untouched. (The input field also remains untouched unless revert: true
     * option is used.)
     *
     * @param {...(Date|Number|String)|Array} [dates] - Date strings, Date
     * objects, time values or mix of those for new selection
     * @param {Object} [options] - function options
     * - clear: {boolean} - Whether to clear the existing selection
     *     defualt: false
     * - render: {boolean} - Whether to re-render the picker element
     *     default: true
     * - autohide: {boolean} - Whether to hide the picker element after re-render
     *     Ignored when used with render: false
     *     default: config.autohide
     * - revert: {boolean} - Whether to refresh the input field when all the
     *     passed dates are invalid
     *     default: false
     */
    setDate(...args) {
      const dates = [...args];
      const opts = {};
      const lastArg = lastItemOf(args);
      if (
        typeof lastArg === 'object'
        && !Array.isArray(lastArg)
        && !(lastArg instanceof Date)
        && lastArg
      ) {
        Object.assign(opts, dates.pop());
      }

      const inputDates = Array.isArray(dates[0]) ? dates[0] : dates;
      setDate(this, inputDates, opts);
    }

    /**
     * Update the selected date(s) with input field's value
     * Not available on inline picker
     *
     * The input field will be refreshed with properly formatted date string.
     *
     * In the case that all the entered dates are invalid (unparsable, repeated,
     * disabled or out-of-range), whixh is distinguished from empty input field,
     * the method leaves the input field untouched as well as the selection by
     * default. If revert: true option is used in this case, the input field is
     * refreshed with the existing selection.
     *
     * @param  {Object} [options] - function options
     * - autohide: {boolean} - whether to hide the picker element after refresh
     *     default: false
     * - revert: {boolean} - Whether to refresh the input field when all the
     *     passed dates are invalid
     *     default: false
     */
    update(options = undefined) {
      if (this.inline) {
        return;
      }

      const opts = Object.assign(options || {}, {clear: true, render: true});
      const inputDates = stringToArray(this.inputField.value, this.config.dateDelimiter);
      setDate(this, inputDates, opts);
    }

    /**
     * Refresh the picker element and the associated input field
     * @param {String} [target] - target item when refreshing one item only
     * 'picker' or 'input'
     * @param {Boolean} [forceRender] - whether to re-render the picker element
     * regardless of its state instead of optimized refresh
     */
    refresh(target = undefined, forceRender = false) {
      if (target && typeof target !== 'string') {
        forceRender = target;
        target = undefined;
      }

      let mode;
      if (target === 'picker') {
        mode = 2;
      } else if (target === 'input') {
        mode = 1;
      } else {
        mode = 3;
      }
      refreshUI(this, mode, !forceRender);
    }

    /**
     * Enter edit mode
     * Not available on inline picker or when the picker element is hidden
     */
    enterEditMode() {
      if (this.inline || !this.picker.active || this.editMode) {
        return;
      }
      this.editMode = true;
      this.inputField.classList.add('in-edit');
    }

    /**
     * Exit from edit mode
     * Not available on inline picker
     * @param  {Object} [options] - function options
     * - update: {boolean} - whether to call update() after exiting
     *     If false, input field is revert to the existing selection
     *     default: false
     */
    exitEditMode(options = undefined) {
      if (this.inline || !this.editMode) {
        return;
      }
      const opts = Object.assign({update: false}, options);
      delete this.editMode;
      this.inputField.classList.remove('in-edit');
      if (opts.update) {
        this.update(opts);
      }
    }
  }

  // filter out the config options inapproprite to pass to Datepicker
  function filterOptions(options) {
    const newOpts = Object.assign({}, options);

    delete newOpts.inputs;
    delete newOpts.allowOneSidedRange;
    delete newOpts.maxNumberOfDates; // to ensure each datepicker handles a single date

    return newOpts;
  }

  function setupDatepicker(rangepicker, changeDateListener, el, options) {
    registerListeners(rangepicker, [
      [el, 'changeDate', changeDateListener],
    ]);
    new Datepicker(el, options, rangepicker);
  }

  function onChangeDate(rangepicker, ev) {
    // to prevent both datepickers trigger the other side's update each other
    if (rangepicker._updating) {
      return;
    }
    rangepicker._updating = true;

    const target = ev.target;
    if (target.datepicker === undefined) {
      return;
    }

    const datepickers = rangepicker.datepickers;
    const setDateOptions = {render: false};
    const changedSide = rangepicker.inputs.indexOf(target);
    const otherSide = changedSide === 0 ? 1 : 0;
    const changedDate = datepickers[changedSide].dates[0];
    const otherDate = datepickers[otherSide].dates[0];

    if (changedDate !== undefined && otherDate !== undefined) {
      // if the start of the range > the end, swap them
      if (changedSide === 0 && changedDate > otherDate) {
        datepickers[0].setDate(otherDate, setDateOptions);
        datepickers[1].setDate(changedDate, setDateOptions);
      } else if (changedSide === 1 && changedDate < otherDate) {
        datepickers[0].setDate(changedDate, setDateOptions);
        datepickers[1].setDate(otherDate, setDateOptions);
      }
    } else if (!rangepicker.allowOneSidedRange) {
      // to prevent the range from becoming one-sided, copy changed side's
      // selection (no matter if it's empty) to the other side
      if (changedDate !== undefined || otherDate !== undefined) {
        setDateOptions.clear = true;
        datepickers[otherSide].setDate(datepickers[changedSide].dates, setDateOptions);
      }
    }
    datepickers[0].picker.update().render();
    datepickers[1].picker.update().render();
    delete rangepicker._updating;
  }

  /**
   * Class representing a date range picker
   */
  class DateRangePicker  {
    /**
     * Create a date range picker
     * @param  {Element} element - element to bind a date range picker
     * @param  {Object} [options] - config options
     */
    constructor(element, options = {}) {
      const inputs = Array.isArray(options.inputs)
        ? options.inputs
        : Array.from(element.querySelectorAll('input'));
      if (inputs.length < 2) {
        return;
      }

      element.rangepicker = this;
      this.element = element;
      this.inputs = inputs.slice(0, 2);
      this.allowOneSidedRange = !!options.allowOneSidedRange;

      const changeDateListener = onChangeDate.bind(null, this);
      const cleanOptions = filterOptions(options);
      // in order for initial date setup to work right when pcicLvel > 0,
      // let Datepicker constructor add the instance to the rangepicker
      const datepickers = [];
      Object.defineProperty(this, 'datepickers', {
        get() {
          return datepickers;
        },
      });
      setupDatepicker(this, changeDateListener, this.inputs[0], cleanOptions);
      setupDatepicker(this, changeDateListener, this.inputs[1], cleanOptions);
      Object.freeze(datepickers);
      // normalize the range if inital dates are given
      if (datepickers[0].dates.length > 0) {
        onChangeDate(this, {target: this.inputs[0]});
      } else if (datepickers[1].dates.length > 0) {
        onChangeDate(this, {target: this.inputs[1]});
      }
    }

    /**
     * @type {Array} - selected date of the linked date pickers
     */
    get dates() {
      return this.datepickers.length === 2
        ? [
            this.datepickers[0].dates[0],
            this.datepickers[1].dates[0],
          ]
        : undefined;
    }

    /**
     * Set new values to the config options
     * @param {Object} options - config options to update
     */
    setOptions(options) {
      this.allowOneSidedRange = !!options.allowOneSidedRange;

      const cleanOptions = filterOptions(options);
      this.datepickers[0].setOptions(cleanOptions);
      this.datepickers[1].setOptions(cleanOptions);
    }

    /**
     * Destroy the DateRangePicker instance
     * @return {DateRangePicker} - the instance destroyed
     */
    destroy() {
      this.datepickers[0].destroy();
      this.datepickers[1].destroy();
      unregisterListeners(this);
      delete this.element.rangepicker;
    }

    /**
     * Get the start and end dates of the date range
     *
     * The method returns Date objects by default. If format string is passed,
     * it returns date strings formatted in given format.
     * The result array always contains 2 items (start date/end date) and
     * undefined is used for unselected side. (e.g. If none is selected,
     * the result will be [undefined, undefined]. If only the end date is set
     * when allowOneSidedRange config option is true, [undefined, endDate] will
     * be returned.)
     *
     * @param  {String} [format] - Format string to stringify the dates
     * @return {Array} - Start and end dates
     */
    getDates(format = undefined) {
      const callback = format
        ? date => formatDate(date, format, this.datepickers[0].config.locale)
        : date => new Date(date);

      return this.dates.map(date => date === undefined ? date : callback(date));
    }

    /**
     * Set the start and end dates of the date range
     *
     * The method calls datepicker.setDate() internally using each of the
     * arguments in start→end order.
     *
     * When a clear: true option object is passed instead of a date, the method
     * clears the date.
     *
     * If an invalid date, the same date as the current one or an option object
     * without clear: true is passed, the method considers that argument as an
     * "ineffective" argument because calling datepicker.setDate() with those
     * values makes no changes to the date selection.
     *
     * When the allowOneSidedRange config option is false, passing {clear: true}
     * to clear the range works only when it is done to the last effective
     * argument (in other words, passed to rangeEnd or to rangeStart along with
     * ineffective rangeEnd). This is because when the date range is changed,
     * it gets normalized based on the last change at the end of the changing
     * process.
     *
     * @param {Date|Number|String|Object} rangeStart - Start date of the range
     * or {clear: true} to clear the date
     * @param {Date|Number|String|Object} rangeEnd - End date of the range
     * or {clear: true} to clear the date
     */
    setDates(rangeStart, rangeEnd) {
      const [datepicker0, datepicker1] = this.datepickers;
      const origDates = this.dates;

      // If range normalization runs on every change, we can't set a new range
      // that starts after the end of the current range correctly because the
      // normalization process swaps start↔︎end right after setting the new start
      // date. To prevent this, the normalization process needs to run once after
      // both of the new dates are set.
      this._updating = true;
      datepicker0.setDate(rangeStart);
      datepicker1.setDate(rangeEnd);
      delete this._updating;

      if (datepicker1.dates[0] !== origDates[1]) {
        onChangeDate(this, {target: this.inputs[1]});
      } else if (datepicker0.dates[0] !== origDates[0]) {
        onChangeDate(this, {target: this.inputs[0]});
      }
    }
  }

  window.Datepicker = Datepicker;
  window.DateRangePicker = DateRangePicker;

})();
