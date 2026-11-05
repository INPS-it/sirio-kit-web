var SirioConfig = (function () {
    var hostname = window.location.hostname;

    var environments = {
        DEV: {
            host: 'https://portale-sviluppo.inps.it/content/api',
            trackHost: 'https://inpssifapi.sviluppo.inps.it/api',
            environment: 'DEV',
            debug: 'true',
        },
        STAGING: {
            host: 'https://www.wmo.inps.it/content/api',
            trackHost: 'https://servizi2.wmo.inps.it/servizi/inpssifapi/api',
            environment: 'STAGING',
            debug: 'false',
        },
        PROD: {
            host: 'https://www.inps.it/content/api',
            trackHost: 'https://servizi2.inps.it/servizi/inpssifapi/api',
            environment: 'PROD',
            debug: 'false',
        },
    };

    function resolveEnvironment() {
        // Sviluppo: http://inpssifguide.sviluppo.inps.it/
        if (hostname === 'localhost' || hostname.indexOf('sviluppo') !== -1) {
            return environments.DEV;
        }
        // Collaudo: https://intranet.collaudo.inps.it/APP02/Servizi.Net/InpsSifGuide/
        if (hostname.indexOf('collaudo') !== -1) {
            return environments.STAGING;
        }
        // Produzione: https://intranet.inps.it/APP02/Servizi.Net/InpsSifGuide/
        return environments.PROD;
    }

    var selected = resolveEnvironment();

    return [
        {
            component: 'SirioBase',
            host: selected.host,
            trackHost: selected.trackHost,
            cacheExpiration: '30',
            webKitPath: '../assets',
            debug: selected.debug,
            caa: 'WA03860',
            environment: selected.environment,
        },
    ];
})();
