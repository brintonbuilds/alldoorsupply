/* All Door Supply — Contact and quote forms
   The site is static, so submissions go to a hosted form service, which emails
   them to the address set in that service's dashboard. That keeps the receiving
   address out of the page source. */

(function () {
  'use strict';

  /* Formspree form URL, e.g. https://formspree.io/f/abcdwxyz
     While this is empty, forms show the "call us" message rather than
     pretending to send. */
  var ENDPOINT = 'https://formspree.io/f/myeeagvo';

  var TIMEOUT_MS = 15000;
  var SUCCESS_TEXT = 'Thanks, your request has been sent. A member of our team will be in touch within two business days.';
  var ERROR_TEXT = 'Sorry, your request didn’t go through. Please try again, or call us at ';
  var PHONE_TEXT = '1.905.335.1638';
  var PHONE_HREF = 'tel:19053351638';

  function pageName() {
    return document.title.split('—')[0].trim();
  }

  function addHoneypot(form) {
    /* Hidden from people; bots that fill it in get filtered by the service. */
    var trap = document.createElement('input');
    trap.type = 'text';
    trap.name = '_gotcha';
    trap.tabIndex = -1;
    trap.autocomplete = 'off';
    trap.setAttribute('aria-hidden', 'true');
    trap.className = 'form-trap';
    form.appendChild(trap);
  }

  function showStatus(status, type) {
    status.className = 'form-status form-status--' + type;
    status.textContent = '';

    if (type === 'success') {
      status.textContent = SUCCESS_TEXT;
    } else {
      var phone = document.createElement('a');
      phone.href = PHONE_HREF;
      phone.textContent = PHONE_TEXT;
      status.appendChild(document.createTextNode(ERROR_TEXT));
      status.appendChild(phone);
      status.appendChild(document.createTextNode('.'));
    }
  }

  function send(form) {
    var data = new FormData(form);
    data.append('_subject', 'Website quote request: ' + pageName());
    data.append('page', pageName());

    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);

    return fetch(ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: controller.signal
    }).then(function (response) {
      clearTimeout(timer);
      if (!response.ok) throw new Error('Form service responded ' + response.status);
    }, function (error) {
      clearTimeout(timer);
      throw error;
    });
  }

  document.querySelectorAll('main form[method="post"]').forEach(function (form) {
    var button = form.querySelector('button[type="submit"]');
    var buttonText = button.textContent;

    var status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    button.insertAdjacentElement('afterend', status);

    addHoneypot(form);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      status.className = 'form-status';
      status.textContent = '';

      if (!ENDPOINT) {
        showStatus(status, 'error');
        return;
      }

      button.disabled = true;
      button.textContent = 'Sending…';

      send(form).then(function () {
        form.reset();
        showStatus(status, 'success');
        /* Counted as a lead in Google Analytics (live domain only). */
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { form_page: pageName() });
        }
      }).catch(function () {
        /* Keep what they typed so they can retry. */
        showStatus(status, 'error');
      }).finally(function () {
        button.disabled = false;
        button.textContent = buttonText;
      });
    });
  });

})();
