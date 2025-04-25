function PromptError($err) {
  Write-Host "Erro:" $err -ForegroundColor Red

}

$listName = "Admin"

try {
    
    Export-PnPListToSiteTemplate  -List $listName -Out "$listName.xml" -Force  -ErrorAction Stop
    Write-Host "Lista salva em $listName.xml" -ForegroundColor Green

    Write-Host "Adicionando itens..."
    Add-PnPDataRowsToSiteTemplate -Path "$listName.xml" -List $listName  -ErrorAction Stop
    Write-Host "Itens adicionados" -ForegroundColor Green

    Write-Host "Fim" -ForegroundColor Green
        
}
catch {
    PromptError $Error[0].toString()
}