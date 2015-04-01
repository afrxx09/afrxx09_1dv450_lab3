#1dv450 Klientapplikation
Detta är en karttjänst tänkt för tattueringsstudios. Användarna ska kunna logga sina besök hos tatuerare och se vad andra tycker om olika studios.

Applikationen har ett ganska unikt interface och det är något jag har experimenterat mycket med. Det är långt ifrån genomarbetat och finslipat så ha gärna överseende med detta, det är som sagt experimentellt för att utforska och prova något nytt.

##installation
Applikationen bör köras på en lokal webbserver, förslagsvis Apache. Installeras enklast med WAMP, XAMPP eller Easy PHP.
Det kan uppstå vissa rättighets-komplikationer om man bara öppnar index-filen lokalt i webläsaren.

Klienten arbetar mot mitt API som först måste installeras och startas. API-applikationen och installationsinstruktioner finns här:
[API-applikation](https://github.com/afrxx09/afrxx09_1dv450)

Ladda ner detta repositoriet och lägg det i en katalog på din lokala webserver och sen är det bara att besöka den lokala adressen, troligtvis http://localhost/afrxx09_1dv450_lab3/


##Förändringar I API-applikationen

*Fixat "allow origin"
*Lagt till timeout på JWT-token.
*Korrigerat "next" och "prev" länkar från API:et då de inte var 100% korrekta
*Bugg i "Places"-controller som gjorde att man inte fick rätt svar
*Saknades en view som gjorde att ett svar inte var formaterat som förväntat
*Lagt till Lat och Lng på Places-modellen
*Lagt till google_place_id i Places-modellen
*Lagt till funktionallitet för att söka events och places via google_place_id
*Generell refakturering och bug-fixar