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
    * [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
    * [Visual Studio Code](https://code.visualstudio.com/download)

# setup și rulare
1. se clonează repository-ului folosind `git clone `
2. se intră în `SwiftEvents/backend/SwiftEvents.API/SwiftEvents.API/appsettings` și se
setează următoarea secțiune conform datelor de pe sistemul gazdă:
```Javascript
"ConnectionStrings": {
    "Cstring": "Data Source={numele serverului};Initial Catalog=SwiftEvents;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
}
```
3. se deschide un terminal în `SwiftEvents/frontend` și se rulează comanda `npm install`
4. se deschide un terminal în  `SwiftEvents/backend/SwiftEvents.API/SwiftEvents.API` și se rulează comanda `dotnet run`
5. folosind terminalul deschis din `SwiftEvents/frontend`, se rulează comanda `npm start`
