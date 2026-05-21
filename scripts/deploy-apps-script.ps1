# يساعد على النشر في Chrome بعد لصق الكود وحفظه
# شغّل هذا السكربت بينما نافذة Apps Script (Chrome) في المقدمة
Add-Type -AssemblyName System.Windows.Forms
Write-Host "خلال 3 ثوانٍ: ركّز نافذة محرر Apps Script في Chrome..."
Start-Sleep -Seconds 3

# فتح قائمة Déployer ثم Nouveau déploiement (قد يختلف حسب اللغة)
# اضغط يدوياً على Déployer إذا لم ينجح التالي
[System.Windows.Forms.SendKeys]::SendWait("%")
Start-Sleep -Milliseconds 200

Write-Host @"
الخطوات اليدوية السريعة في Chrome:
1. Déployer → Nouveau déploiement
2. Type: Application Web | Execute as: Moi | Access: Anyone
3. Déployer → انسخ رابط /exec
4. الصق الرابط في khidmatcom.config.js
"@
