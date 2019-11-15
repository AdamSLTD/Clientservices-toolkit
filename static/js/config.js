function locales() {
	// check whether the landing page set the lang in localStorage
	var langCookie = getCookieByMatch('_lang_')[0];
	var lang = langCookie ? langCookie.split('=')[1] : getStorage('_lang_');
	if (lang)
	    return lang;

	if (typeof navigator === 'undefined')
		return "de";

	if (navigator.languages && navigator.languages.length)
		return navigator.languages[0];

	if (navigator.language)
		return navigator.language;

	// IE
	if (navigator.userLanguage)
		return navigator.userLanguage;
};

function getStorage(key) {
  return localStorage.getItem(key);
};

function getCookieByMatch(regex) {
  var cs = document.cookie.split(/;\s*/), ret=[], i;

  for (i=0; i < cs.length; i++) {
    if (cs[i].match(regex)) {
      ret.push(cs[i]);
    }
  }
  return ret;
};

function getSnowPlowCookie() {
  var cookie = getCookieByMatch("sp_id")[0];
  var output = "";

  if (cookie == null) {
    output =  "00000000-0000-0000-0000-000000000000";
  }
  else {
    output = cookie.split(".")[6];
  }
  return output;
};

window.config = {
  assetsUrl: "https://public-assets.coya.com",
  backendUrl: "https://twoflower.coya.com",
  landingUrl: "https://coya.com",
  locales : locales(),
  stripeApiKey: "pk_live_h9UHaHnPrymg2taQV6cJofJT",
  authToken: getStorage("authToken"),
  refreshToken: getStorage("refreshToken"),
  correlationId: getSnowPlowCookie(),
  debugger: false,
  cookieConsent: null,
  snowplowUrl:"snowplow-collector.coya.com",
  snowplowSessionTimeout: "3600",
  snowplowCookieDomain:"coya.com",
  snowplowTrackerNamespace: "cf-prod",
  snowplowLandingAppId: "coya-landing",
  snowplowApplicationAppId: "coya-application",
  googleTagManager: "GTM-MBQZN4G",
  sentryDsn: "https://2eef0185e9f44b2b85c621a679b4713e@sentry.coya.com/17",
  featureFlags: {
    bikeFunnel: true,
    liability: true,
    eBike: true,
    affiliationTracking: true,
    household: true,
    referral: true,
    paymentSCAEnabled: true,
    dronesEnabled: false,
    dogLiabilityEnabled: true,
    liabilityEndorsement: false,
    liabilityUpgrade: false,
    snowplowABTracking: true,
    offerStickyHeader: false
  }
}
