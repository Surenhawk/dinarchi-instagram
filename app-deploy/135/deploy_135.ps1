# Run from the Borsa+ folder:  powershell -ExecutionPolicy Bypass -File .\deploy_135.ps1
# Needs _deploy_135\ (app.js, index.html, webapp.py, art135\*.webp) next to it.
# Rollback:  gcloud compute ssh dinarchi-c --zone us-central1-c --command "bash /home/LEGION/rollback_135.sh"
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$Z = "us-central1-c"; $VM = "dinarchi-c"
Write-Host "== local md5"
foreach ($f in "_deploy_135\app.js","_deploy_135\index.html","_deploy_135\webapp.py") { "{0}  {1}" -f (Get-FileHash $f -Algorithm MD5).Hash.ToLower(), $f }
foreach ($s in "deploy_135.sh","rollback_135.sh") { $t = [IO.File]::ReadAllText("$PWD\$s") -replace "`r`n","`n"; [IO.File]::WriteAllText("$PWD\$s", $t) }
gcloud compute ssh $VM --zone $Z --command "rm -rf /home/LEGION/art135 && mkdir -p /home/LEGION/art135"
if ($LASTEXITCODE -ne 0) { throw "ssh failed" }
gcloud compute scp --recurse --zone $Z _deploy_135/art135 "${VM}:/home/LEGION/"
if ($LASTEXITCODE -ne 0) { throw "art upload failed" }
gcloud compute scp --zone $Z _deploy_135/app.js _deploy_135/index.html _deploy_135/webapp.py deploy_135.sh rollback_135.sh "${VM}:/home/LEGION/"
if ($LASTEXITCODE -ne 0) { throw "upload failed" }
gcloud compute ssh $VM --zone $Z --command "bash /home/LEGION/deploy_135.sh"
if ($LASTEXITCODE -ne 0) { throw "deploy script failed - see output above" }
Write-Host "== public check"
(Invoke-WebRequest -UseBasicParsing "https://app.dinarchi.com/api/build").Content
