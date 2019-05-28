var ws = new WebSocket("wss://ws.kite.trade?api_key=s2w2pfqf0n01cefk&access_token=FSiFwkssmqSvaEWKaos20h1e7Sy10hUy");

var message = { "a": "mode", "v": ["full", [500111]] };
ws.onopen = function() {
    console.log("opened");
    ws.send(JSON.stringify(message));

}


ws.onmessage = function(event) {
    console.log(event);
}