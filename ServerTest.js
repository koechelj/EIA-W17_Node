//Node: Response schreiben, die vom Server zur�ck gesendet wird, wenn eine Request eingegangen ist
"use strict";
// Http-Modul importieren  
const Http = require("http");
// Url-Modul  (splittet Webadresse in Einzelbestandteile = Queryparameter)
const Url = require("url");
var ServerTest;
(function (ServerTest) {
    // Portvariable f�r Server, auf dem gearbeitet werden soll
    let port = process.env.PORT;
    // Server erstellen
    let server = Http.createServer();
    // Eventlistener installieren
    server.addListener("listening", handleListen); //wenn Server am Port lauscht, dann f�hre function aus
    server.addListener("request", handleRequest); //wenn Request beim Server eingeht....
    // Server lauscht am Port:
    server.listen(port);
    // wenn Server lauscht---> Konsolenausgabe 
    function handleListen() {
        console.log("Server listening on port " + port);
    }
    //Event: Request verarbeiten und Response erstellen
    function handleRequest(_request, _response) {
        console.log(_request); //Requestmessage auf Konsole anzeigen
        //setze utf-8 in den Header der Response
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // ?
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // Response, die vom Server zur�ck geschickt wird:
        _response.write("Vielen Dank. Deine Bestelldaten:<br>");
        _response.write("Url: " + _request.url + "<br>");
        // Variable query vom Typ des Interfaces = ?         
        let query = Url.parse(_request.url, true).query;
        // ?
        for (let key in query)
            _response.write(key + ": " + query[key] + "<br>");
        // Response schlie�en u. abschicken
        _response.end();
    }
})(ServerTest || (ServerTest = {}));
//# sourceMappingURL=ServerTest.js.map