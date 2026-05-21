/**
 * عميل API لـ Khidmatcom — يتصل بـ Google Apps Script المرتبط بـ Google Sheets.
 */
const KhidmatcomAPI = (function () {
  const PLACEHOLDER = 'YOUR_DEPLOYMENT_ID';

  function getScriptUrl() {
    return (typeof KhidmatcomConfig !== 'undefined' && KhidmatcomConfig.GOOGLE_SCRIPT_URL) || '';
  }

  function isConfigured() {
    const url = getScriptUrl();
    return Boolean(url && !url.includes(PLACEHOLDER));
  }

  function post(action, payload) {
    if (!isConfigured()) {
      return Promise.reject(new Error('لم يتم ضبط رابط Google Apps Script في khidmatcom.config.js'));
    }

    return fetch(getScriptUrl(), {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...payload })
    });
  }

  function get(action, params) {
    if (!isConfigured()) {
      return Promise.reject(new Error('لم يتم ضبط رابط Google Apps Script في khidmatcom.config.js'));
    }

    return new Promise((resolve, reject) => {
      const callbackName = `khidmatcomCb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const url = new URL(getScriptUrl());

      url.searchParams.set('action', action);
      if (params) {
        Object.keys(params).forEach(key => {
          if (params[key] != null && params[key] !== '') {
            url.searchParams.set(key, params[key]);
          }
        });
      }
      url.searchParams.set('callback', callbackName);

      const script = document.createElement('script');
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error('انتهت مهلة الاتصال بـ Google Sheets'));
      }, 20000);

      function cleanup() {
        clearTimeout(timeout);
        delete window[callbackName];
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      }

      window[callbackName] = function (result) {
        cleanup();
        resolve(result);
      };

      script.onerror = () => {
        cleanup();
        reject(new Error('فشل تحميل البيانات من Google Sheets'));
      };

      script.src = url.toString();
      document.head.appendChild(script);
    });
  }

  return {
    isConfigured,
    addRequest(data) {
      return post('addRequest', { data });
    },
    registerTechnician(data) {
      return get('registerTechnician', data);
    },
    loginTechnician(username, password) {
      return get('loginTechnician', { username, password });
    },
    acceptRequest(requestId, technicianId) {
      return post('acceptRequest', { requestId, technicianId });
    },
    completeRequest(requestId) {
      return post('completeRequest', { requestId });
    },
    getRequests(params) {
      return get('getRequests', params || {});
    },
    getStatistics() {
      return get('getStatistics');
    },
    checkConnection() {
      return get('getStatistics').then(result => result && result.status === 'success');
    }
  };
})();
