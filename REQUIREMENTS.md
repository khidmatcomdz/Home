# متطلبات المشروع - Khidmatcom

## 🖥️ المتطلبات التقنية

### المتصفحات المدعومة
```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Browsers (iOS/Android)
```

### الخوادم والمنصات
```
✅ أي خادم ويب (Apache, Nginx, IIS)
✅ GitHub Pages
✅ Netlify
✅ Vercel
✅ Firebase Hosting
✅ أي منصة استضافة ويب عادية
```

---

## 📦 المكتبات والأدوات المستخدمة

### Frontend
```
1. HTML5
   - Semantic HTML
   - Form validation
   - Responsive meta tags

2. CSS3
   - Flexbox
   - Grid
   - Media queries
   - Animations
   - Gradients

3. Vanilla JavaScript
   - No frameworks required
   - Modern ES6+
   - Promise API
   - Fetch API
```

### External Resources
```
✓ Google Fonts (Cairo)
✓ Font Awesome 6.4 (Icons)
✓ Google Sheets API (Data Storage)
✓ Google Apps Script (Backend Logic)
✓ Google Gmail API (Email Notifications)
```

---

## 🗄️ قاعدة البيانات

### Google Sheets
```
✅ الطلبات (Requests)
   - معرّف فريد
   - بيانات العميل
   - تفاصيل الخدمة
   - الحالة
   - تاريخ الإنشاء

✅ الفنيون (Technicians)
   - معرّف الفني
   - معلومات الاتصال
   - التخصص
   - سنوات الخبرة
   - التقييم

✅ التحليلات (Analytics)
   - إحصائيات يومية
   - معدلات الإكمال
   - رضا العملاء
```

---

## 🔧 التقنيات المستخدمة

### Frontend Framework
- **HTML5**: البنية الأساسية
- **CSS3**: التنسيق والتصميم المستجيب
- **Vanilla JS**: البرمجة والتفاعل

### Backend
- **Google Apps Script**: معالجة الطلبات
- **Google Sheets**: تخزين البيانات
- **Gmail API**: إرسال الإشعارات

### API Integration
```
✅ Google Sheets API v4
✅ Google Apps Script Web API
✅ Gmail API v1
✅ WhatsApp Business API (اختياري)
✅ SMS Gateway (اختياري)
```

---

## 📋 ملفات المشروع

### الملفات الأساسية
```
index.html                  - الصفحة الرئيسية
request.html               - نموذج الطلب
technician-dashboard.html  - لوحة الفنيين
styles.css                 - الأنماط المشتركة
google-apps-script.gs      - البرمجة الخلفية
```

### ملفات التوثيق
```
README.md                  - الدليل الشامل
GOOGLE-SHEETS-SETUP.md    - دليل الربط
test.html                 - صفحة الاختبار
requirements.txt          - هذا الملف
```

---

## 🚀 نصائح التطوير

### أثناء التطوير المحلي
```bash
# استخدام Live Server في VS Code
# أو أي خادم محلي آخر

python -m http.server 8000
# ثم افتح: http://localhost:8000
```

### اختبار على أجهزة مختلفة
```
✓ اختبر على سطح المكتب
✓ اختبر على الهاتف
✓ اختبر على الجهاز اللوحي
✓ اختبر على متصفحات مختلفة
```

### اختبار الأداء
```
✓ افتح DevTools (F12)
✓ اختبر سرعة التحميل
✓ تحقق من الأخطاء
✓ اختبر استهلاك الذاكرة
```

---

## 🔐 متطلبات الأمان

### التشفير
```
✅ HTTPS على الإنترنت (إلزامي)
✅ تشفير البيانات الحساسة
✅ التحقق من صحة البيانات
```

### المصادقة
```
✅ التحقق من رقم الهاتف (OTP)
✅ التحقق من البريد الإلكتروني
✅ كلمات مرور قوية للفنيين
```

### حماية البيانات
```
✅ عدم حفظ كلمات المرور
✅ استخدام tokens بدلاً من الجلسات
✅ تقييد معدل الطلبات (Rate limiting)
✅ CORS headers مناسبة
```

---

## 📱 التوافق المستجيب

### نقاط فاصلة (Breakpoints)
```css
/* الهواتف الصغيرة */
@media (max-width: 480px) { }

/* الهواتف */
@media (max-width: 768px) { }

/* الأجهزة اللوحية */
@media (max-width: 1024px) { }

/* سطح المكتب */
@media (min-width: 1025px) { }
```

### الاختبار
```
✓ iPhone (375px - 812px)
✓ iPad (768px - 1024px)
✓ Desktop (1920px+)
✓ Landscape/Portrait modes
```

---

## ⚡ تحسينات الأداء

### التخزين المؤقت (Caching)
```
✅ تخزين CSS محلياً
✅ تخزين صور عالية الجودة
✅ استخدام CDN للموارد الخارجية
```

### تحميل الصفحات
```
✅ تأخير تحميل الصور غير المرئية
✅ ضغط الملفات
✅ دمج الملفات عند الحاجة
```

### الصور
```
✅ استخدام تنسيقات محسّنة (WebP)
✅ تحديد أحجام الصور
✅ استخدام صور مناسبة للشاشة
```

---

## 🌍 المتطلبات الإقليمية

### اللغة والاتجاه
```
✅ العربية (RTL)
✅ دعم الأحرف العربية
✅ التواريخ والأوقات بالعربية
```

### المنطقة الزمنية
```
✅ توقيت الجزائر (UTC+1)
✅ صيغة التاريخ العربي
✅ عملة محلية (اختياري)
```

### الثقافة والتخصيص
```
✅ أسماء محلية
✅ أرقام هواتف محلية
✅ مدن وعناوين محلية
```

---

## 📊 متطلبات التحليلات

### البيانات المراد تتبعها
```
✓ عدد الطلبات اليومي
✓ معدل قبول الفنيين
✓ وقت الاستجابة المتوسط
✓ رضا العملاء
✓ أكثر الخدمات طلباً
✓ أفضل الفنيين
```

### التقارير
```
✓ تقرير يومي
✓ تقرير أسبوعي
✓ تقرير شهري
✓ تقارير مخصصة
```

---

## 🔄 متطلبات التكامل

### التطبيقات الخارجية
```
✅ Google Sheets
✅ Gmail
✅ WhatsApp (اختياري)
✅ SMS Gateway (اختياري)
✅ Payment Gateway (اختياري)
```

### APIs
```
✅ Maps API (لتحديد الموقع)
✅ Phone Number Validation
✅ Email Verification
```

---

## 📚 المكتبات المقترحة (للتطوير المستقبلي)

### Framework
```
- Vue.js (Progressive)
- React (Component-based)
- Next.js (Full-stack)
```

### UI Library
```
- Bootstrap 5
- Tailwind CSS
- Material UI
```

### Database
```
- Firebase
- MongoDB
- PostgreSQL
```

### Backend
```
- Node.js + Express
- Python + Flask/Django
- PHP + Laravel
```

---

## ✅ قائمة التحقق قبل النشر

```
□ جميع الروابط تعمل
□ جميع الصور تظهر
□ النموذج يرسل البيانات
□ لا توجد أخطاء في Console
□ التصميم متجاوب
□ الأداء مقبولة
□ بيانات الاتصال محدثة
□ Google Sheets جاهز
□ Apps Script منشور
□ رابط الويب محدث
□ شهادة SSL (HTTPS)
□ الأمان محقق
□ النسخة الاحتياطية موجودة
```

---

## 📞 دعم التقنية

### للأسئلة التقنية
```
1. اقرأ الدليل (README.md)
2. اقرأ دليل Google Sheets
3. افتح Developer Tools (F12)
4. ابحث عن رسائل الخطأ
5. جرب في متصفح آخر
```

### للبلاغات عن المشاكل
```
البريد: khidmatcom.dz@gmail.com
الهاتف: 213791784945
Facebook: facebook.com/khidmatcom.dz
```

---

## 📝 الملاحظات

### النسخة الحالية
```
الإصدار: 1.0.0
التاريخ: 21 مايو 2025
الحالة: جاهزة للنشر
```

### التحديثات المستقبلية
```
□ تطبيق موبايل
□ نظام الدفع الإلكتروني
□ نظام التقييمات
□ نظام الإشعارات المتقدم
□ تقارير متقدمة
□ دعم لغات أخرى
```

---

**آخر تحديث:** 21 مايو 2025
