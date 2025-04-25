try {

    Write-Host "Subindo a lista..."
    Invoke-PnPSiteTemplate -Path "Admin.xml" -ErrorAction Stop
    Write-Host "Fim" -ForegroundColor Green

}
catch {
    PromptError $Error[0].toString()
}