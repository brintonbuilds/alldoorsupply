/* All Door Supply — Google Analytics 4
   Loads only on the live domain, so UAT and local testing don't count
   as visits. forms.js reports each successful form send as generate_lead. */

(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-MCW67ZZF2V';
  var LIVE_HOSTS = ['alldoorsupply.com', 'www.alldoorsupply.com'];

  if (LIVE_HOSTS.indexOf(location.hostname) === -1) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(tag);
})();
