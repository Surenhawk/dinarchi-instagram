# Run from the Borsa+ folder:  powershell -ExecutionPolicy Bypass -File .\deploy_137.ps1
# Rollback:  gcloud compute ssh dinarchi-c --zone us-central1-c --command "bash /home/LEGION/rollback_137.sh"
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$Z = "us-central1-c"; $VM = "dinarchi-c"
foreach ($f in "_deploy_137\index.html","_deploy_137\webapp.py") { "{0}  {1}" -f (Get-FileHash $f -Algorithm MD5).Hash.ToLower(), $f }
foreach ($s in "deploy_137.sh","rollback_137.sh") { $t = [IO.File]::ReadAllText("$PWD\$s") -replace "`r`n","`n"; [IO.File]::WriteAllText("$PWD\$s", $t) }
gcloud compute scp --zone $Z _deploy_137/index.html _deploy_137/webapp.py deploy_137.sh rollback_137.sh "${VM}:/home/LEGION/"
if ($LASTEXITCODE -ne 0) { throw "upload failed" }
gcloud compute ssh $VM --zone $Z --command "bash /home/LEGION/deploy_137.sh"
if ($LASTEXITCODE -ne 0) { throw "deploy script failed - see output above" }
Write-Host "== public check"
(Invoke-WebRequest -UseBasicParsing "https://app.dinarchi.com/api/build").Content
