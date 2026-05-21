# إكمال النشر (خطوة واحدة يدوية)

تم إنجاز معظم الإعداد. المتبقي: **نشر Web App** ونسخ الرابط.

## ما تم إنجازه

| الخطوة | الحالة |
|--------|--------|
| جدول **Khidmatcom** | تم — [افتح الجدول](https://docs.google.com/spreadsheets/d/1oxzbXW3BhJPI___8DUpCbFHF5cAg051VlZi7i_oEDbs/edit) |
| لصق `google-apps-script.gs` | تم في المشروع |
| `khidmatcom.config.js` → `SPREADSHEET_URL` | تم |

## ما تبقى (دقيقتان)

### 1) نشر التطبيق

1. افتح المحرر: https://script.google.com/home/projects/1I4RST5xfNFRJt20I-L6rphPhsLWPyTulIkvdYYsHKnSnbrAj9YL2Rf2c/edit
2. **Déployer** → **Nouveau déploiement**
3. نوع النشر: **Application Web**
4. **Exécuter en tant que:** vous (Moi) | **Accès:** Anyone (Tout le monde)
5. **Déployer** → انسخ الرابط الذي ينتهي بـ `/exec`

### 2) تحديث الموقع

في `khidmatcom.config.js` استبدل:

```javascript
GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/الصق_هنا/exec',
```

### 3) إنشاء الأوراق

من القائمة المنسدلة للدوال اختر **setupKhidmatcomDatabase** ثم **Exécuter** (تشغيل).

أو بعد النشر افتح في المتصفح:

```
https://script.google.com/macros/s/DEPLOYMENT_ID/exec?action=getStatistics
```

ستُنشأ أوراق: **الطلبات**، **الفنيون**، **التحليلات**.
