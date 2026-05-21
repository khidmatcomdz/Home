// Google Apps Script backend for Khidmatcom.
// Paste this file into Extensions -> Apps Script inside the Khidmatcom spreadsheet,
// then deploy it as a Web app with access set to "Anyone".

// معرّف جدول Khidmatcom في Google Sheets
const SPREADSHEET_ID = '1oxzbXW3BhJPI___8DUpCbFHF5cAg051VlZi7i_oEDbs';

const SHEETS = {
  requests: 'الطلبات',
  technicians: 'الفنيون',
  analytics: 'التحليلات'
};

function getSpreadsheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

const REQUEST_STATUS = {
  pending: 'معلق',
  accepted: 'مقبول',
  completed: 'منجز'
};

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const spreadsheet = getSpreadsheet_();
    const sheets = ensureDatabase_(spreadsheet);

    switch (payload.action) {
      case 'addRequest': {
        const request = addRequest_(sheets.requests, payload.data || payload);
        return json_({ status: 'success', data: request });
      }
      case 'registerTechnician': {
        const technician = registerTechnician_(sheets.technicians, payload.data || payload);
        return json_({ status: 'success', data: technician });
      }
      case 'acceptRequest': {
        acceptRequest_(sheets.requests, payload.requestId, payload.technicianId || '');
        return json_({ status: 'success' });
      }
      case 'completeRequest': {
        completeRequest_(sheets.requests, payload.requestId);
        return json_({ status: 'success' });
      }
      default:
        return json_({ status: 'error', message: 'Invalid action' });
    }
  } catch (error) {
    return json_({ status: 'error', message: String(error) });
  }
}

function doGet(e) {
  try {
    const params = e.parameter || {};
    const spreadsheet = getSpreadsheet_();
    const sheets = ensureDatabase_(spreadsheet);
    let result;

    switch (params.action) {
      case 'getRequests':
        result = { status: 'success', data: getRequests_(sheets.requests, params.status, params.serviceType) };
        break;
      case 'getStatistics':
        result = { status: 'success', data: getStatistics_(sheets.requests, sheets.technicians) };
        break;
      case 'loginTechnician':
        result = loginTechnician_(sheets.technicians, params.username, params.password);
        break;
      case 'registerTechnician':
        result = (function () {
          try {
            const technician = registerTechnician_(sheets.technicians, params);
            return { status: 'success', data: technician };
          } catch (error) {
            return { status: 'error', message: String(error) };
          }
        })();
        break;
      default:
        result = { status: 'success', data: { ready: true } };
    }

    if (params.callback) {
      return ContentService
        .createTextOutput(`${params.callback}(${JSON.stringify(result)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return json_(result);
  } catch (error) {
    const result = { status: 'error', message: String(error) };
    if (e.parameter && e.parameter.callback) {
      return ContentService
        .createTextOutput(`${e.parameter.callback}(${JSON.stringify(result)})`)
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return json_(result);
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('خدماتكم')
    .addItem('إعداد قاعدة البيانات', 'setupKhidmatcomDatabase')
    .addToUi();
}

function setupKhidmatcomDatabase() {
  const spreadsheet = getSpreadsheet_();
  ensureDatabase_(spreadsheet);
  Logger.log('تم إعداد أوراق الطلبات والفنيين والتحليلات بنجاح.');
}

function ensureDatabase_(spreadsheet) {
  return {
    requests: spreadsheet.getSheetByName(SHEETS.requests) || createRequestsSheet_(spreadsheet),
    technicians: spreadsheet.getSheetByName(SHEETS.technicians) || createTechniciansSheet_(spreadsheet),
    analytics: spreadsheet.getSheetByName(SHEETS.analytics) || createAnalyticsSheet_(spreadsheet)
  };
}

function createRequestsSheet_(spreadsheet) {
  const sheet = spreadsheet.insertSheet(SHEETS.requests);
  const headers = [
    'رقم الطلب',
    'نوع الخدمة',
    'اسم العميل',
    'هاتف العميل',
    'بريد العميل',
    'المدينة',
    'العنوان',
    'وصف الخدمة',
    'التاريخ المفضل',
    'الوقت المفضل',
    'تاريخ الإنشاء',
    'الحالة',
    'الفني المسند',
    'ملاحظات'
  ];
  formatHeader_(sheet, headers);
  return sheet;
}

function createTechniciansSheet_(spreadsheet) {
  const sheet = spreadsheet.insertSheet(SHEETS.technicians);
  const headers = [
    'رقم الفني',
    'الاسم',
    'اسم المستخدم',
    'كلمة المرور المشفرة',
    'الهاتف',
    'البريد',
    'التخصص',
    'المدينة',
    'سنوات الخبرة',
    'الشهادات',
    'التقييم',
    'تاريخ التسجيل',
    'الحالة',
    'عدد الطلبات المنجزة'
  ];
  formatHeader_(sheet, headers);
  return sheet;
}

function findTechnicianByUsername_(sheet, username) {
  if (!username) return null;
  const values = sheet.getDataRange().getValues();
  for (let row = 1; row < values.length; row++) {
    if (String(values[row][2]).toLowerCase() === String(username).toLowerCase()) {
      return {
        id: values[row][0],
        name: values[row][1],
        username: values[row][2],
        passwordHash: String(values[row][3] || ''),
        phone: values[row][4],
        email: values[row][5],
        specialty: values[row][6],
        city: values[row][7],
        experience: values[row][8],
        certifications: values[row][9],
        rating: values[row][10],
        created_at: values[row][11],
        status: values[row][12],
        completed_count: values[row][13]
      };
    }
  }
  return null;
}

function hashPassword_(password) {
  if (!password) return '';
  const raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  return raw.map(function (byte) {
    const value = (byte < 0 ? byte + 256 : byte).toString(16);
    return value.length === 1 ? '0' + value : value;
  }).join('');
}

function loginTechnician_(sheet, username, password) {
  const technician = findTechnicianByUsername_(sheet, username);
  if (!technician) {
    return { status: 'error', message: 'اسم المستخدم أو كلمة المرور غير صحيحة.' };
  }
  const providedHash = hashPassword_(password);
  if (providedHash !== technician.passwordHash) {
    return { status: 'error', message: 'اسم المستخدم أو كلمة المرور غير صحيحة.' };
  }

  delete technician.passwordHash;
  return { status: 'success', data: technician };
}

function createAnalyticsSheet_(spreadsheet) {
  const sheet = spreadsheet.insertSheet(SHEETS.analytics);
  formatHeader_(sheet, ['الإحصائية', 'القيمة']);
  sheet.appendRow(['عدد الطلبات الإجمالي', `=COUNTA('${SHEETS.requests}'!A:A)-1`]);
  sheet.appendRow(['الطلبات المعلقة', `=COUNTIF('${SHEETS.requests}'!L:L,"${REQUEST_STATUS.pending}")`]);
  sheet.appendRow(['الطلبات المقبولة', `=COUNTIF('${SHEETS.requests}'!L:L,"${REQUEST_STATUS.accepted}")`]);
  sheet.appendRow(['الطلبات المنجزة', `=COUNTIF('${SHEETS.requests}'!L:L,"${REQUEST_STATUS.completed}")`]);
  sheet.appendRow(['عدد الفنيين', `=COUNTA('${SHEETS.technicians}'!A:A)-1`]);
  sheet.autoResizeColumns(1, 2);
  return sheet;
}

function addRequest_(sheet, data) {
  const request = {
    id: data.request_id || `REQ-${Date.now()}`,
    service_type: data.service_type || '',
    client_name: data.client_name || '',
    client_phone: data.client_phone || '',
    client_email: data.client_email || '',
    client_city: data.client_city || '',
    client_address: data.client_address || '',
    service_description: data.service_description || '',
    preferred_date: data.preferred_date || '',
    preferred_time: data.preferred_time || '',
    created_at: data.submission_date || new Date().toLocaleString('ar-DZ'),
    status: REQUEST_STATUS.pending,
    technician_id: '',
    notes: data.notes || ''
  };

  sheet.appendRow([
    request.id,
    request.service_type,
    request.client_name,
    request.client_phone,
    request.client_email,
    request.client_city,
    request.client_address,
    request.service_description,
    request.preferred_date,
    request.preferred_time,
    request.created_at,
    request.status,
    request.technician_id,
    request.notes
  ]);

  sendEmailNotification_(request.client_email, 'تم استقبال طلبك', [
    'شكراً لك على التسجيل في خدماتكم.',
    `رقم طلبك: ${request.id}`,
    'سيتم توجيه طلبك للفني المناسب قريباً.'
  ].join('\n'));

  return request;
}

function registerTechnician_(sheet, data) {
  const username = data.tech_username || data.username || '';
  const password = data.tech_password || data.password || '';

  if (!username || !password) {
    throw new Error('يرجى توفير اسم مستخدم وكلمة مرور.');
  }

  if (findTechnicianByUsername_(sheet, username)) {
    throw new Error('اسم المستخدم هذا مستخدم بالفعل. اختر اسم مستخدم آخر.');
  }

  const technician = {
    id: data.tech_id || `TECH-${Date.now()}`,
    name: data.tech_name || '',
    username: username,
    passwordHash: hashPassword_(password),
    phone: data.tech_phone || '',
    email: data.tech_email || '',
    specialty: data.tech_specialty || '',
    city: data.tech_city || '',
    experience: data.tech_experience || '',
    certifications: data.tech_certifications || '',
    rating: 0,
    created_at: new Date().toLocaleString('ar-DZ'),
    status: 'قيد المراجعة',
    completed_count: 0
  };

  sheet.appendRow([
    technician.id,
    technician.name,
    technician.username,
    technician.passwordHash,
    technician.phone,
    technician.email,
    technician.specialty,
    technician.city,
    technician.experience,
    technician.certifications,
    technician.rating,
    technician.created_at,
    technician.status,
    technician.completed_count
  ]);

  sendEmailNotification_(technician.email, 'شكراً على التسجيل', [
    `مرحباً ${technician.name}`,
    'تم استقبال بيانات تسجيلك في خدماتكم.',
    'سيتم مراجعة بياناتك وتفعيل حسابك قريباً.'
  ].join('\n'));

  return technician;
}

function acceptRequest_(sheet, requestId, technicianId) {
  updateRequestStatus_(sheet, requestId, REQUEST_STATUS.accepted, technicianId);
}

function completeRequest_(sheet, requestId) {
  updateRequestStatus_(sheet, requestId, REQUEST_STATUS.completed, null);
}

function updateRequestStatus_(sheet, requestId, status, technicianId) {
  if (!requestId) throw new Error('requestId is required');
  const values = sheet.getDataRange().getValues();

  for (let row = 1; row < values.length; row++) {
    if (String(values[row][0]) === String(requestId)) {
      sheet.getRange(row + 1, 12).setValue(status);
      if (technicianId !== null && technicianId !== undefined) {
        sheet.getRange(row + 1, 13).setValue(technicianId);
      }
      return;
    }
  }

  throw new Error(`Request not found: ${requestId}`);
}

function getRequests_(sheet, status, serviceType) {
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1);

  return rows
    .filter(row => !status || row[11] === status)
    .filter(row => !serviceType || row[1] === serviceType)
    .map(row => ({
      id: row[0],
      service: row[1],
      service_type: row[1],
      client_name: row[2],
      client_phone: row[3],
      client_email: row[4],
      client_city: row[5],
      client_address: row[6],
      service_description: row[7],
      preferred_date: row[8],
      preferred_time: row[9],
      submission_date: row[10],
      status: row[11],
      technician_id: row[12],
      notes: row[13]
    }));
}

function getStatistics_(requestsSheet, techniciansSheet) {
  const requests = getRequests_(requestsSheet);
  return {
    pending: requests.filter(request => request.status === REQUEST_STATUS.pending).length,
    accepted: requests.filter(request => request.status === REQUEST_STATUS.accepted).length,
    completed: requests.filter(request => request.status === REQUEST_STATUS.completed).length,
    total_requests: requests.length,
    total_technicians: Math.max(techniciansSheet.getLastRow() - 1, 0)
  };
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  return JSON.parse(e.postData.contents);
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatHeader_(sheet, headers) {
  sheet.clear();
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#17a2b8')
    .setFontColor('white');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

function sendEmailNotification_(recipientEmail, subject, message) {
  if (!recipientEmail) return;
  try {
    GmailApp.sendEmail(recipientEmail, subject, message);
  } catch (error) {
    Logger.log(`Email notification failed: ${error}`);
  }
}
