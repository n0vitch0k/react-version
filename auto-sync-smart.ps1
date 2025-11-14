$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repo

while ($true) {
    if (& git status --porcelain) {          # true si des fichiers ont changé
        git add .
        git commit -m "auto-sync $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git push origin main
    }
    Start-Sleep -Seconds 30
}