// global vars
var trackingKey = 'coya_tracking',
  referralKey = 'coya_referral_tracking',
  financeAddsParam = 'financeads',
  affiliateKey = 'affiliate',
  shouldWorkLocally = false,
  languageKey = '_lang_',
  // Uppercase values will be lowercase by the browser
  // so only add lowercase affiliates, this should came from the CRS later
  affiliateList = [
    financeAddsParam,
    'AZS',
    'driveeddy',
    'freshenergy',
    '813',
    'immomio',
    'powunity',
    'urbanground',
    'fahrradde',
    'dimorro',
    'bop1',
    'bop2',
    'bop3',
    'bop4',
    'bop5',
    'bop6',
    'bop7',
    'bop8',
    'bop9',
    'bop10',
    'hop1',
    'hop2',
    'hop3',
    'hop4',
    'hop5',
    'mygermanexpert',
    'michali',
    'liveworkgermany',
    'itsapark',
    'coya',
    'urbandrivestyle',
    'howtogermany',
    'welcomecentergermany',
    'rydes',
    'toytowngermany'
  ];

window.spContexts = [];

// Set the language
function getLanguage() {
  const locales = (window && window.config && window.config.locales || 'de');
  const defaultLanguage = locales.indexOf('en') > -1 ? 'en' : 'de';
  return typeof webflowLanguage !== 'undefined' ? webflowLanguage :
    (getCookie(languageKey) || defaultLanguage);
}

const language = getLanguage();

// Store affiliate
(function (affiliate) {
  if (affiliate && typeof affiliate === 'string') {
    affiliateValue = affiliate.toLowerCase();
    setLocalStorageItem(affiliateKey, affiliateValue);
    setCookie(affiliateKey, affiliateValue);
  }
})(getAllUrlParams().affiliate);

// Store referral into the sessionStorage
(function (referral) {
  if (referral) {
    setCookie(referralKey, referral, 1);
  }
})(getAllUrlParams().ref);

// Helper to get localStorage item
function getLocalStorageItem(key, parse) {
  return parse ? JSON.parse(window.localStorage.getItem(key)) : window.localStorage.getItem(key);
}

// Helper to set localStorage item
function setLocalStorageItem(key, value) {
  window.localStorage.setItem(key, value);
}


// Helper to get cookie item
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v && v[2] ? v[2] : null;
}

// Helper to set cookie item
function setCookie(name, value, days) {
  var domain = window.location.origin === "http://coya:8080" ? "" : "; domain=." + window.config.snowplowCookieDomain;
  var date = new Date;
  var d = typeof days === 'number' ? days : 99999;
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * d);
  document.cookie = name + "=" + value + domain + "; expires=" + date.toGMTString() + '; path=/';
}

// Helper to erase a cookie
function deleteCookie(name) {
  setCookie(name, "", -1);
}

// Helpers to indicate whether the user already click on OK
function isTrackingAnswered() {
  return getCookie(trackingKey);
}

// Get stored affiliate
function getStoredAffiliate() {
  return getCookie(affiliateKey) || getLocalStorageItem(affiliateKey);
}

// Track affiliates in financeAds
function financeAddsTracking(args) {
  if (getStoredAffiliate() === financeAddsParam) {
    var coyaID = 2297;

    var faProgramID = coyaID;
    var faCategory = args.name;
    var faOrderID = args.orderId;

    var script = document.createElement('script');
    script.setAttribute('src', 'https://fat.financeads.net/fpc.js');
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}

// This function is a helper that parser the url parameters and create and js object with them.
// the url parameter is optional.
// usage:
//
// if we had an Url like www.example.com?utm=example
// val params = getAllUrlParams("www.example.com?utm=example");
// params.utm === 'example'
function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent for the parameters
      paramName = paramName.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}


// Check if is in our affiliates list
function isAffiliationTracking() {
  var currentAffiliate = (getStoredAffiliate() || 'coya');

  return affiliateList.indexOf(currentAffiliate) > -1;
}

// Add affiliate to an js object
// example:
// var withAffiliate = addAffiliate({ somethin: "not important" });
// withAffiliate.affiliation === 'coya'
function addAffiliate(args) {
  var isEnabled =
    window.config && window.config.featureFlags.affiliationTracking;

  if (isAffiliationTracking() && isEnabled) {
    args.affiliation = getStoredAffiliate();
  } else {
    args.affiliation = 'coya';
  }

  return args
}

// Remove affiliate from localStorage
function cleanAffiliate() {
  window.localStorage.removeItem(affiliateKey);
  deleteCookie(affiliateKey);
}

// Purchase tracking:
// Helper to push to dataLayer for GTM tracking
function gtmTracking(args) {
  // GTM push to data layer
  if (window.dataLayer && window.config.googleTagManager) {
    conditionalTracking(window.dataLayer.push, args);
  }
}

// We need to track sales consistently with affiliation, so they should be track

// Helper to enable tracking If the configuration is set correctly
function conditionalTracking(callback, args) {
  if (window.config && (shouldWorkLocally || window.config.snowplowUrl)) {
    applyOrError(callback, args);
  }
}

function applyOrError(callback, args) {
  try {
    callback.apply(this, args);
  } catch (e) {
    console.error(e);
    window.reportExceptionToSentry && window.reportExceptionToSentry(e);
  }
}

// Coya Cookie Module
function CoyaCookieConsent() {
  /* Members */
  // indicate whether cookie accepted or not
  this.accepted = isTrackingAnswered();

  /* Methods */
  // get referral id from the cookie and delete it
  this.getReferral = function () {
    var ref = getCookie(referralKey);
    deleteCookie(referralKey);
    return ref;
  };

  // set language cookie
  this.setLanguage = function (newLang) {
    setCookie(languageKey, newLang);
  };

  // hide popup on website if cookie consent answered
  this.hideConsent = function () {
    if (this.accepted) {
      var consentPopupElement = document.getElementById('consent-popup');
      consentPopupElement && consentPopupElement.remove();
    }
  };

  // answer cookie
  this.consentAnswer = function (answer) {
    this.accepted = true;
    setCookie(trackingKey, answer);
    this.hideConsent();
  };

  // on start
  this.hideConsent();
}


function CoyaSnowplow() {
  /* Members */
  // helper to indicate app id
  this.url = function () {
    return document.location.href;
  };
  this.isApp = function () {
    return this.url().indexOf('/application') > -1;
  };
  // If new tracker is inited
  this.isSnowplowInited = false;
  // Indicator for resetting
  this.shouldReset = false;
  // user id if set
  this.userId = null;
  // session timeout
  this.sessionTimeout = null;

  /* Methods */
  // init method to create new tracker
  this.init = function (initCallback) {
    setCookie(languageKey, language);

    if (!this.isSnowplowInited) {
      // set correct namespace
      this.sessionTimeout = isNaN(parseInt(window.config.snowplowSessionTimeout)) ? 600 : parseInt(window.config.snowplowSessionTimeout);

      window.snowplow(
        'newTracker',
        window.config.snowplowTrackerNamespace,
        window.config.snowplowUrl, {
          appId: this.isApp() ? window.config.snowplowApplicationAppId : window.config.snowplowLandingAppId,
          cookieDomain: window.config.snowplowCookieDomain,
          sessionCookieTimeout: this.sessionTimeout,
          discoverRootDomain: true,
          userFingerprint: true,
          stateStorageStrategy: "cookie",
          contexts: {
            webPage: true,
            performanceTiming: true,
          }
        }
      );

      this.bindTGMAndStartTracking();
      this.isSnowplowInited = true;
      if (typeof initCallback == "function") initCallback();
      this.startSnowplowResetTimer(1000 * this.sessionTimeout, initCallback);
    }
  };

  this.bindTGMAndStartTracking = function () {
    this.trackActivity();
    this.trackPageView();

    // GOOGLE TAG MANAGER START
    //
    // TODO: Move this into a general traking module, because inherited reasons and time restrictions
    // for now this is attach to snowplow but we need to redefine this as a general tracking module.
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', window.config.googleTagManager);

    window.dataLayer = window.dataLayer || [];

    // GOOGLE TAG MANAGER ENDS
  };

  /* Tracking methods */

  // Track the referral hash
  this.trackReferral = function (orderId, referralId) {
    window.snowplow('trackStructEvent', 'referralTracking', 'referralSale', orderId, referralId, '', spContexts);
  };

  // page view tracker
  this.trackPageView = function () {
    conditionalTracking(window.snowplow, ['trackPageView', null, spContexts]);
  };

  // user activity (page ping) tracker
  this.trackActivity = function () {
    conditionalTracking(window.snowplow, ['enableActivityTracking', 10, 10]);
  };

  // to be called onClick on CTA offer button
  this.goToAppTracker = function (e) {
    conditionalTracking(window.snowplow, ['trackStructEvent', 'websiteEvents', 'initiateSignup', 'householdApplication', $(e).text(), '', spContexts]);
  };

  // to be called onClick on CTA offer button
  this.newsletterTracker = function () {
    conditionalTracking(window.snowplow, ['trackStructEvent', 'websiteEvents', 'crmActivities', 'newsletterSignup', '', '', spContexts]);
  };

  // normalize trackStructEvent method
  this.trackStructEvent = function (data) {
    conditionalTracking(window.snowplow, ['trackStructEvent',
      data.category,
      data.action,
      data.label,
      data.property,
      data.value,
      spContexts
    ]);
  };

  // normalize trackStructEvent method
  this.trackTransaction = function (data) {
    // Add affiliation
    addAffiliate(data);

    // conditionalTracking adds the affiliate from the LocalStorage
    conditionalTracking(window.snowplow, ['addTrans',
      data.orderId,                   // order ID - required
      data.affiliation,               // affiliation or store name
      data.total,                     // total - required
      data.tax || '',                 // tax
      data.shipping || '',            // shipping
      data.city,                      // city
      data.state || '',               // state or province
      data.country,                   // country
      data.currency,                  // currency
      spContexts
    ]);

    // conditionalTracking adds the affiliate from the LocalStorage
    conditionalTracking(window.snowplow, ['addItem',
      data.orderId,                   // order ID - required
      data.sku,                       // SKU/code - required
      data.name,                      // product name
      data.category,                  // category or variation
      data.price,                     // unit price - required
      data.quantity || '1',           // quantity - required
      data.currency,                  // currency
      spContexts
    ]);

    conditionalTracking(financeAddsTracking, [data]);

    conditionalTracking(window.snowplow, ['trackTrans', spContexts]);

    // tracking for GTM
    gtmTracking([{
        'event': 'addTrans',
        'addTransData': [                // dataLayer extraction:
          data.orderId,                  // addTransData.0
          data.affiliation,              // addTransData.1
          data.total,                    // addTransData.2
          data.tax || '',                // addTransData.3
          data.shipping || '',           // addTransData.4
          data.city,                     // addTransData.5
          data.state || '',              // addTransData.6
          data.country,                  // addTransData.7
          data.currency                  // addTransData.8
        ]
      },
        {
          'event': 'addItem',
          'addItemData': [                  // dataLayer extraction:
            data.orderId,                   // addItemData.0
            data.sku,                       // addItemData.1
            data.name,                      // addItemData.2
            data.category,                  // addItemData.3
            data.price,                     // addItemData.4
            data.quantity || '1',           // addItemData.5
            data.currency                   // addItemData.6
          ]
        }
      ]
    );

    // Remove affiliate
    cleanAffiliate();

  };

  this.setUserId = function (userId) {
    if (userId !== this.userId) {
      conditionalTracking(window.snowplow, ['setUserId', userId]);
      this.userId = userId;
    }
  };

  // to reset snowplow session
  this.newSession = function () {
    conditionalTracking(window.snowplow, ['newSession']);
  };

  this.startSnowplowResetTimer = function (timeout, callback) {
    // Hack for hard resetting snowplow tracker If user stayed idle on signup process
    var timer = null;

    function resetHandler() {
      if (window.coya.snowplow.shouldReset) {
        window.coya.snowplow.newSession();
        if (typeof callback == "function") callback();
        window.coya.snowplow.shouldReset = false;
        document.removeEventListener('mouseenter', resetHandler);
        document.removeEventListener('touchenter', resetHandler);
      }
    }

    function setTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        document.addEventListener('mouseenter', resetHandler);
        document.addEventListener('touchenter', resetHandler);
        window.coya.snowplow.shouldReset = true;

      }, timeout);
    }

    setTimer();
  };

  // on load init
  if (window.config) this.init();
}

// Load snowplow and init the tracking script
(function (p, l, o, w, i, n, g) {
  if (!p[i]) {
    p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
    p.GlobalSnowplowNamespace.push(i);
    p[i] = function () {
      (p[i].q = p[i].q || []).push(arguments)
    };
    p[i].q = p[i].q || [];
    n = l.createElement(o);
    g = l.getElementsByTagName(o)[0];
    n.async = 1;
    n.src = w;
    g.parentNode.insertBefore(n, g)
  }

  window.coya = {};
  window.coya.cookie = new CoyaCookieConsent();
  window.coya.snowplow = new CoyaSnowplow();

}(window, document, 'script', 'https://app.coya.com/sp-2.9.0.js', 'snowplow'));


/** Add consent if not answered **/
const currentDomain = (window.config && window.config.landingUrl)
  || (location.hostname.indexOf('coya.com') > -1 ? 'https://coya.com' : 'https://coya.me');
const copy = {
  de: {
    cookieText: "Diese Website nutzt unter anderem Cookies, um Dir eine bessere Navigationserfahrung zu ermÃ¶glichen und damit wir unseren Traffic fÃ¼r Werbung analysieren kÃ¶nnen. HierfÃ¼r geben wir auch Daten an andere Unternehmen weiter, die diese Daten unter UmstÃ¤nden auch kombinieren. Weitere Informationen kannst Du in unserer DatenschutzerklÃ¤rung lesen.",
    cookieAcceptLabel: "Ok",
    links: {
      imprint: {
        url: currentDomain + "/impressum",
        label: "Impressum"
      },
      privacy: {
        url: currentDomain + "/datenschutz",
        label: "Datenschutz"
      },
    }
  },
  en: {
    cookieText: "Among other things, this website uses cookies to provide you with a better customer experience and to allow us\n" +
      "        to analyse our traffic for advertising. For this purpose, we also pass on data to other companies, which may\n" +
      "        also combine this data. You can read more information about this in our privacy policy.",
    cookieAcceptLabel: "Ok",
    links: {
      imprint: {
        url: currentDomain + "/impressum-en",
        label: "Legal notice"
      },
      privacy: {
        url: currentDomain + "/privacy-policy",
        label: "Privacy policy"
      },
    }
  }
};

const elemDiv = document.createElement('div');
elemDiv.id = "consent-popup";
elemDiv.className = "cookie-wrapper";
elemDiv.innerHTML = '<div class="cookie-content"><p>'
  + copy[language].cookieText + '</p><div class="cta-button bg-blue" onclick="window.coya.cookie.consentAnswer(true)">'
  + copy[language].cookieAcceptLabel + '</div></div><ul class="cookie-links"> <li class="cookie-link"><a href="' + copy[language].links.privacy.url + '">'
  + copy[language].links.privacy.label + '</a></li><li>Â |Â </li><li class="cookie-link"><a href="' + copy[language].links.imprint.url + '">'
  + copy[language].links.imprint.label + '</a></li></ul>';
if (!isTrackingAnswered()) {
  document.body.appendChild(elemDiv);
}

// Function object to encapsulate VWO functionality
function vwo() {

  // private member to carry all contexts created for A/B tests
  this.contexts = {};

  // Helper to find index of a context in global snowplow context var
  this.findContextIndex = function (context) {
    return spContexts.findIndex(function (x) {
      return x.data.experiment_id === context.data.experiment_id &&
        x.data.experiment_variation === context.data.experiment_variation
    });
  };

  // Helper flag for existing context
  this.contextExist = function (context) {
    return this.findContextIndex(context) > -1;
  };

  // Helper to create a context out of experiment id and variation number
  this.createContext = function (expId, expV) {
    return {
      schema: "iglu:com.coya/experiment/jsonschema/1-0-0",
      data: {
        experiment_id: expId,
        experiment_variation: expV
      }
    }
  };

  // Update snowplow global contexts
  this.addIfNotExist = function (context) {
    if (!this.contextExist(context)) {
      spContexts.push(context);
    }
  };

  // Delete a context from snowplow global contexts if exists
  this.removeContext = function (context) {
    window.spContexts = spContexts.slice(this.findContextIndex(context), 0);
  };

  // Handler on variation applied to create and append a new context
  this.variationApplied = function (data) {
    const experiment_id = data[1];
    const experiment_variation = data[2];
    if (data) {
      const context = window.coya.vwo.createContext(experiment_id, experiment_variation);
      window.coya.vwo.contexts[experiment_id] = context;
      window.coya.vwo.addIfNotExist(context);
    }
  };

  // Handler to determine whether the test is running and remove corresponded context once It is not running anymore
  this.matchWildcard = function (data) {
    const experiment_id = data[1];
    const isTestRunning = data[4];
    if (data) {
      if (!isTestRunning && window.coya.vwo.contexts[experiment_id]) {
        const context = window.coya.vwo.createContext(experiment_id, window.coya.vwo.contexts[experiment_id].data.experiment_variation);
        window.coya.vwo.removeContext(context);
      }
    }
  }
}

(function () {
  if (window.config && window.config.featureFlags.snowplowABTracking) {
    window.VWO = window.VWO || [];
    window.coya = window.coya || {};
    window.coya.vwo = new vwo();
    VWO.push(['onEventReceive', 'vA', window.coya.vwo.variationApplied]);
  }
})();
