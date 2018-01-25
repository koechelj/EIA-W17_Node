
//Node: Response schreiben, die vom Server zurück gesendet wird, wenn eine Request eingegangen ist


// Http-Modul importieren  
import * as Http from "http";
// Url-Modul  (splittet Webadresse in Einzelbestandteile = Queryparameter)
import * as Url from "url";



namespace ServerTest {
    
    

    
    // Neuer Datentyp AssocStringString 
    interface AssocStringString {
        [key: string]: string;  //homogenes, assoziatives Array, das nur einen Datentyp speichern kann / komplettes Array ist vom Typ string
    }

    
    
    // Portvariable für Server, auf dem gearbeitet werden soll
    let port: number = process.env.PORT;
   
    
    // Server erstellen
    let server: Http.Server = Http.createServer();
    
    
    // Eventlistener installieren
    server.addListener("listening", handleListen);  //wenn Server am Port lauscht, dann führe function aus
    server.addListener("request", handleRequest);  //wenn Request beim Server eingeht....
    
    
    // Server lauscht am Port:
    server.listen(port);

    
    // wenn Server lauscht---> Konsolenausgabe 
    function handleListen(): void {
        console.log("Server listening on port " + port);  
    }

    
    //Event: Request verarbeiten und Response erstellen
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        
        console.log(_request);  //Requestmessage auf Konsole anzeigen
        
        //setze utf-8 in den Header der Response
        _response.setHeader("content-type", "text/html; charset=utf-8");
        
        // ?
        _response.setHeader("Access-Control-Allow-Origin", "*");

        // Response, die vom Server zurück geschickt wird:
        _response.write("Vielen Dank. Deine Bestelldaten:<br>");
        _response.write("Url: " + _request.url + "<br>");
       
        // Variable query vom Typ des Interfaces = ?         
        let query: AssocStringString = Url.parse(_request.url, true).query;
        
     
        // ?
        for (let key in query)
            _response.write(key + ": " + query[key] + "<br>");

        // Response schließen u. abschicken
        _response.end();
    }
}