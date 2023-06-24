# Disclaimer
Repo-ul principal este în Azure Devops Organizations, dar este privat din motive de securitate in ceea ce privește partajarea secretelor din appsetting.json.  
Repo-urile de pe Gitlab și GitHub de mai jos nu sunt altceva decât copii ale repo-ului din Azure Devops.

# Adresă repository-uri

GitHub: [https://github.com/Fili-sudo/SwiftEvents](https://github.com/Fili-sudo/SwiftEvents)  
GitLab: [https://gitlab.upt.ro/david.filimon/SwiftEvents](https://gitlab.upt.ro/david.filimon/SwiftEvents)  
Aplicația se mai poate accesa și la adresa: [https://swifteventsspa.azurewebsites.net](https://swifteventsspa.azurewebsites.net)

# Introducere
SwiftEvents este o aplicație de organizare de evenimente care pune la dispoziție utilizatorului posibilitatea organizării unui eveniment de dimensiuni variabile folosindu-se un mediu web. Doresc ca aplicația să se dezvolte în continuare cu trecerea timpului, iar aici se află versiunea curentă a acesteia.

# Instalare
Pentru a rula cu succes aplicația este nevoie de instalarea următoarelor programe:
1. [Git Bash](https://git-scm.com/downloads)
2. [.NET 6 SDK x64](https://dotnet.microsoft.com/en-us/download)
3. [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)
4. [SQL Server LocalDb](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)
5. [Node](https://nodejs.org/en/download)
6. Eventual și opțional:
   * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) (recomandat pentru rularea comenzilor EF Core)
   * [Visual Studio Code](https://code.visualstudio.com/download)

# setup și rulare
1. se clonează repository-ului folosind `git clone `
2. se intră în `SwiftEvents/backend/SwiftEvents.API/SwiftEvents.API/appsettings` și se
setează următoarea secțiune conform datelor de pe sistemul gazdă, resureselor create în
Azure Portal și serviciului de mail SendGrid:
```Javascript
"ConnectionStrings": {
    "Cstring": "Data Source={numele serverului};Initial Catalog=SwiftEvents;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
}
 "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "qualified.domain.name",
    "ClientId": "",
    "TenantId": "common"
  },
  "AzureBlobConfiguration": {
    "StorageAccountName": "swiftevents",
    "StorageAccountKey": "{storage account key pentru azure blob storage}",
    "ConnectionString": "{connection string pentru azure blob storage}",
    "ContainerName": "development"
  },
  "SendGridEmailSettings": {
    "ApiKey": "{api key pentru sendgrid}",
    "EmailFrom": "{mail-ul de pe care se trimite mail}"
  }
```
3. 
    * Dacă s-a instalat Visual Studio 2022, se deschide Project Manager Console (PMC), se setează ca Default Project `SwiftEvents.Data_Access` și se rulează comanda: `Update-Database`
    * Dacă nu, se deschide un terminal și se rulează comanda: `dotnet tool install --global dotnet-ef`, mai apoi se deschide un terminal în `SwiftEvents/backend/SwiftEvents.API/SwiftEvents.API` și se rulează comanda: `dotnet ef database update`
4. se deschide un terminal în `SwiftEvents/frontend` și se rulează comanda `npm install`
5. se deschide un terminal în  `SwiftEvents/backend/SwiftEvents.API/SwiftEvents.API` și se rulează comanda `dotnet run`
6. folosind terminalul deschis din `SwiftEvents/frontend`, se rulează comanda `npm start`
