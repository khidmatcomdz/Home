# يلصق google-apps-script.gs في محرر Apps Script (يجب أن تكون نافذة المحرر نشطة)
Add-Type -AssemblyName System.Windows.Forms
$scriptPath = Join-Path $PSScriptRoot '..\google-apps-script.gs'
Get-Content -Path $scriptPath -Raw -Encoding UTF8 | Set-Clipboard
Start-Sleep -Seconds 1
[System.Windows.Forms.SendKeys]::SendWait('^a')
Start-Sleep -Milliseconds 400
[System.Windows.Forms.SendKeys]::SendWait('^v')
Start-Sleep -Milliseconds 400
[System.Windows.Forms.SendKeys]::SendWait('^s')
Write-Host 'Done: paste + save sent to active window.'
