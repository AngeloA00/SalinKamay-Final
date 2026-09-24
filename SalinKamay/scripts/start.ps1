# Startup script for SalinKamay FastAPI Application
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

if (Test-Path ".\.venv\Scripts\Activate.ps1") {
    . ".\.venv\Scripts\Activate.ps1"
}

Write-Host "Launching SalinKamay on http://127.0.0.1:8000 ..." -ForegroundColor Green
# Do not use --reload here: it watches .venv while dependencies are installed,
# repeatedly restarting the server before TensorFlow and the FSL models load.
python -m uvicorn app.main:app --port 8000 --host 127.0.0.1
