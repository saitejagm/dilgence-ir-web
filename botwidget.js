var elem;
//var accessToken = "8c480461f14348ec8c8819c5509b174c";
var baseUrl = "https://api.api.ai/v1/";
var accessToken = "f452880bf356427b88b9f7b67c765525";
//var baseUrl = "https://bot.dialogflow.com/";
var global_message = ""
var head;

var stylesMg = `
            margin-left: 1%;
            font-size: 0.79em;
            font-style: normal;
            font-family: Arial, Helvetica, sans-serif;
            height: 75%;
            overflow-y: scroll;
            overflow-x:hidden;
        `;

// Class for botchat
class botchat {
    constructor() {

        this.ct();
        this.scrollStyle();
    }

    ct() {
        //whole box main container style
        let stylesMain = `
              border-radius: 10px;
              background-color: #FEFEFE  ;
              margin-top: 9%;
              height: 533px;
              width: auto; 
                
              box-shadow: -1px 2px 10px 2px #888888;
        `;

        // image box styles
        var stylesHd = `
            margin-left: 2%;
            margin-right: 3%;
            margin-bottom: 4%;
            margin-top: 5%;
            height: 28px;
            width: 45px;
            opacity: 0.8;
            box-shadow: -2px 3px 2px #888888;
            background-color: #CEE8CE;
         `;

        // message box styles


        var stylesRw = `
           opacity: 1;
        `

        this.outer = document.createElement('div');
        this.outer.className = "container";

        this.outer2 = document.createElement('div');
        this.outer2.className = "row";

        this.dummy = document.createElement('span');
        this.dummy.className = "col-md-7 col-sm-6 col-xs-6 col-lg-7 col-xl-7";

        this.outer2.append(this.dummy);

        this.mainTag = document.createElement("div");
        this.mainTag.className = "col-md-4 col-sm-5 col-xs-5 col-lg-4 col-xl-4";
        this.mainTag.style = stylesMain;
        this.mainTag.id = "mainTag";




        var tit = document.createElement("div");
        tit.className = "row";
        var tit1 = document.createElement('img');
        tit1.className = "rounded";
        tit1.src = "chatbot.jpg";
        tit1.style = stylesHd;
        var stark = document.createElement('i');
        stark.innerText = "Ask Stark";
        stark.style = `
          margin-top: 5%;
        `

        tit.append(tit1);
        tit.append(stark);
        tit.style = `
        position: relative;
        left: 0px;        
        background-color:#D4DDEC;
        margin-bottom: 1px;
        `

        this.messagesDiv = document.createElement("div");
        this.messagesDiv.id = "info";
        this.messagesDiv.style = stylesMg;

        this.mainTag.append(tit);
        //this.mainTag.append(document.createElement('br'));

        //For stock graph display
        this.stock = document.createElement('div');


        this.stock.id = 'stockPrice';


        this.mainTag.append(this.stock);


        this.mainTag.append(this.messagesDiv);
        this.usmessage();

        this.outer2.append(this.mainTag);
        this.outer.append(this.outer2);
        document.body.append(this.outer);



    }


    scrollStyle() {
        var css = `
        ::-webkit-scrollbar {
            width: 2.5px;
          }
          
          
          ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 0.2px grey; 
            border-radius: 10px;
          }
           
          
          ::-webkit-scrollbar-thumb {
            background: #767373; 
            opacity: 0.7;
            border-radius: 10px;
          }
          
          
          ::-webkit-scrollbar-thumb:hover {
            background: #7B6F6C; 
          }
        
        `;
        head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        var canvasLib = document.createElement('script');
        canvasLib.src = "https://cdn.jsdelivr.net/npm/chart.js@2.8.0";



        head.appendChild(style);
        head.appendChild(canvasLib);

        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    //user entered message first goes here after send button click
    usmessage() {

        var group = document.createElement("div");
        group.className = "input-group";

        var styles = `
           margin-top: 1px;
           border-radius: 50px;
           font-size: 0.89em;
           font-family: Arial, Helvetica, sans-serif;
        `;
        group.style = styles;
        var sendMessage = document.createElement('input');
        sendMessage.id = "usInput";
        //sendMessage.placeholder = "Ask the bot!"
        sendMessage.className = "form-control";
        sendMessage.style = styles;

        var but = document.createElement('img');
        but.id = "usButton";
        //but.innerText = "send";
        //but.className = " col-md-2";
        but.src = "send_button.png";
        but.style = "height: 37px; width: 40px; margin-left: 4px; box-shadow: -0.5px 1px 1px 0.5px #F9FAFE;"


        but.onclick = function() {
            var string = document.getElementById('usInput').value;
            document.getElementById('stockPrice').style.display = "none";
            document.getElementById('stockPrice').innerHTML = " ";

            // sends user message to server and appends it to the UI
            if (!(string.length) == 0) {
                if (string.toLowerCase() == "stock price") {
                    document.getElementById("info").style.display = "none";
                    document.getElementById('stockPrice').style.display = "block";

                    //createStock();
                    createLineStock();
                } else if (string.toLowerCase() == "book an appointment" || (string.toLowerCase().includes('appointment') && string.toLowerCase().includes("book"))) {
                    document.getElementById("info").style.display = "block";

                    console.log("Booked an appointment");
                    sendMessage.value = "";

                    appointment();

                    elem = document.getElementById('info');
                    elem.scrollTop = elem.scrollHeight;

                } else {
                    document.getElementById("info").style.display = "block";

                    console.log('other query');
                    sendUserMessage(string);
                    sendMessage.value = "";
                    sendMessage.disabled = true;
                    elem = document.getElementById('info');
                    elem.scrollTop = elem.scrollHeight;

                }
            } else {
                console.log('Please enter your message');
            }


        }


        sendMessage.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                but.click();
            }
        });




        group.append(sendMessage);
        group.append(but);
        this.mainTag.append(document.createElement('br'));
        this.mainTag.append(group);
        //this.mainTag.append(but);
    }


}


function createStock() {
    var stockBox = document.getElementById('stockPrice');

    stockBox.style = stylesMg;
    var chart = new CanvasJS.Chart("stockPrice", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Simple Line Chart"
        },
        axisY: {
            includeZero: false
        },
        data: [{
            type: "line",
            dataPoints: [
                { y: 450 },
                { y: 414 },
                { y: 520, indexLabel: "highest", markerColor: "red", markerType: "triangle" },
                { y: 460 },
                { y: 450 },
                { y: 500 },
                { y: 480 },
                { y: 480 },
                { y: 410, indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" },
                { y: 500 },
                { y: 480 },
                { y: 510 }
            ]
        }]
    });
    chart.render();

}

function createLineStock() {




    var stockBox = document.getElementById('stockPrice');
    stockBox.style = stylesMg;
    stockBox.style.marginLeft = "0%";

    var opt = document.createElement('div');
    opt.className = "row";
    var but = document.createElement('div');
    but.className = "col-md-12";
    var butStyle = `
      span > i{
        margin-left: 3%;
        padding: 10px; 
        background-color:#F6F6FB; 
        border-radius: 55px;
        font-size: 1em;
        cursor: pointer;
      }
    `

    but.innerHTML = `
    <br>
    <span> 
     <i  onClick="chartBut(1)" id='one'>1 Day</i>
     <i  onClick="chartBut(2)" id='one'>5 Day</i>
     <i  onClick="chartBut(3)" id='one'>1 Month</i>
     <i  onClick="chartBut(4)" id='one'>YTD</i>
     <i  onClick="chartBut(5)" id='one'>1 Year</i>
    </span>
     `
    but.style = butStyle;

    var can = document.createElement('canvas');
    can.id = "myChart";
    can.height = "240";
    opt.append(but);
    stockBox.append(opt);
    stockBox.append(document.createElement('br'));
    stockBox.append(can);

    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = butStyle;
    } else {
        style.appendChild(document.createTextNode(butStyle));
    }
    head.appendChild(style);
    var tabl = document.createElement('div');
    tabl.innerHTML = `
      <span style='margin-left: 3%; font-size: 0.8em;' id='open'>Open :  10</span>
      <span style='margin-left: 2%; font-size: 0.8em;' id='close' >Close : 20</span>
      <span style='margin-left: 2%; font-size: 0.8em;' id='low'>Low : 30</span>
      <span style='margin-left: 2%; font-size: 0.8em;' id='high'>High : 40</span>
      <span style='margin-left: 2%; font-size: 0.8em;' id='mkt'>MKT :  20</span>
      <span style='margin-left: 2%; font-size: 0.8em;' id='yield'>Div Yield :  20</span>
    `
    stockBox.append(tabl);


    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Diligence IR',

                borderColor: 'rgba(19, 42, 88)',
                data: [80, 40, 55, 91, 26, 30, 45, 90]

            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },


        }

    });

    document.getElementById('usInput').value = "";
}

//function for stock buttons
function chartBut(which) {
    console.log(which);
}




//sends the user message to server and updates the UI
function sendUserMessage(message) {
    //alert(message);

    /*var styles = `
    background-color: #A2B1D3;
    opacity: 0.8;
    border-radius: 20px 15px 5px 30px;;
    width: auto;
    height: auto;
    margin-left: 30%;
    margin-bottom: 5px;
    margin-top: 3px;
    padding-left: 16px;
    padding-top: 5px;
    box-shadow: -1px 1px 2px #888888;
    `;*/
    global_message = message;

    var styles = `
    background-color: #A2B1D3;
    opacity: 0;
    border-radius: 10px;
    width: auto;
    height: auto;
    margin-left: 22%;
    margin-right: 2%;
    padding-left: 5%;
    padding-right: 3%;
    padding-bottom: 0.2%;
    padding-top: 4%;
    float: right;
    clear: left;
    margin-bottom: 5%;
    box-shadow: -1px -1px 2px #888888;
    `;
    var userTyped = document.createElement('div');
    userTyped.style = styles;
    userTyped.id = "usServer";

    var uText = document.createElement("p");
    uText.append(message);
    //sample response comment it out
    userTyped.append(uText);
    //userTyped.append(document.createElement('br'));


    document.getElementById('info').append(userTyped);
    //document.getElementById('info').append(document.createElement('br'));
    elem = document.getElementById('info');
    elem.scrollTop = elem.scrollHeight;
    anim(userTyped, 1);



    /*var userTyped = document.createElement('i');
    userTyped.style = styles;

    userTyped.append(message);
    userTyped.append(document.createElement('br'));
    document.getElementById('info').append(userTyped);
    userTyped.append(document.createElement('br'));
    */

    //uncomment this, and use it to update the UI
    /*var cml;
    if (window.XMLHttpRequest) {
        cml = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        cml = new ActiveXObject("Microsoft.CMLHTTP");
    }
    cml.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            //if the info object contains any text update the UI
            if (myObj.info == "proceed") {
                     var userTyped = document.createElement('div');
                     userTyped.style = styles;

                     userTyped.append(myObj.serverResponse);
                     userTyped.append(document.createElement('br'));
                     document.getElementById('info').append(userTyped);
                     userTyped.append(document.createElement('br'));
                     requestMessage();

            }
            //if there is no response from the server alert with a concent message
            else if (myObj.info == "forbid") {


            }
            //appending the messages to UI

            for (var i = 0; i < myObj.messages.length; i++) {
                //appending the messages to the UI
            }


        }
    };
    cml.open("GET", 'url + usermessage', true);

    cml.send();  */




}

//after sending user message to server, it requests the server for a response
//Data needs to be in JSON fromat
function requestMessage() {

    var styles = `
    background-color: #E0E5CF;
    opacity: 0;
    border-radius: 10px;
    width: auto;
    height: auto;
    float: left;
    clear: right;
    padding-left: 6%;
    padding-top: 4%;
    padding-right: 4%;
    padding-bottom: 0.2%;
    margin-right: 22%;
    margin-bottom: 5%;
    box-shadow: -1px -1px -1px #888888;
    `;

    // uText.append("We will make sure that you found what you are looking for. Thank You!");
    //sample response comment it out
    // userTyped.append(uText);
    //userTyped.append(document.createElement('br'));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(this.responseText);
            var length = myObj.result.fulfillment.messages.length;
            console.log("The length is " + length);
            if (length > 1) {
                console.log("Entered multiple messages loop");
                var myObj = myObj.result.fulfillment.messages;
                for (var i = 0; i < length; i++) {

                    if (typeof myObj[i].speech != "undefined") {
                        var userTyped = document.createElement('p');
                        userTyped.style = styles;
                        userTyped.id = "reServer";
                        var temp;
                        var uText = document.createElement("p");
                        var str = myObj[i].speech;
                        if (str.includes('https')) {

                            temp = document.createElement('a');
                            temp.href = str;
                            temp.innerHTML = str;
                            temp.target = "_blank";
                            console.log('contains url');
                            //userTyped.append(lk);
                        } else {
                            temp = myObj[i].speech;
                        }
                        uText.append(temp);
                        userTyped.append(uText);

                        document.getElementById('info').append(userTyped);


                        //resource = 1;
                        anim(userTyped, who = 2);
                        //userTyped.append(document.createElement('br'));
                        elem = document.getElementById('info');
                        elem.scrollTop = elem.scrollHeight;

                    } else if (typeof myObj[i].payload != "undefined") {
                        var img_styles = `
                         width: 90%;
                         height: 60%;
                         margin-top: 2%;
                         margin-bottom: 5%;
                        `;
                        var userTyped = document.createElement('p');
                        //userTyped.style = styles;
                        var lk = document.createElement('a');
                        lk.href = myObj[i].payload.image;
                        lk.target = "_blank";
                        var imgg = document.createElement('img');
                        imgg.src = myObj[i].payload.image;
                        imgg.style = img_styles;
                        lk.append(imgg);


                        userTyped.append(lk);

                        document.getElementById('info').append(userTyped);


                        anim(userTyped, who = 2);
                        //userTyped.append(document.createElement('br'));
                        elem = document.getElementById('info');
                        elem.scrollTop = elem.scrollHeight;

                    }


                    elem = document.getElementById('info');
                    elem.scrollTop = elem.scrollHeight;


                }

            } else {
                var userTyped = document.createElement('p');
                userTyped.style = styles;
                userTyped.id = "reServer";

                var uText = document.createElement("p");

                uText.append(JSON.parse(xhttp.responseText).result.fulfillment.speech);
                userTyped.append(uText);

                document.getElementById('info').append(userTyped);
                //resource = 1;
                anim(userTyped, who = 2);
                //userTyped.append(document.createElement('br'));
                elem = document.getElementById('info');
                elem.scrollTop = elem.scrollHeight;

            }
        }
    };
    xhttp.open("POST", baseUrl + "query?v=20180101", true);
    xhttp.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    data = JSON.stringify({ query: global_message, lang: "en", sessionId: "somerandomthing" }),
        xhttp.send(data);

    //use this code to send user message to server using ajax

}


function appointment() {
    var styles = `
    background-color: #E0E5CF;
    opacity: 1;
    border-radius: 30px 50px 50px 40px;
    width: auto;
    height: auto;
    float: left;
    clear: right;
    padding-left: 6%;
    padding-top: 4%;
    padding-right: 6%;
    padding-bottom: 2%;
    margin-right: 22%;
    margin-bottom: 5%;
    box-shadow: -1px -1px -1px #888888;
    `;
    var userTyped = document.createElement('p');
    userTyped.style = styles;
    userTyped.id = "apBox";

    var uText = document.createElement('div');

    var span = document.createElement('span');

    span.innerHTML = `
    <div class="row">
    <span class="col-md-1"></span> 
    <div class="col-md-10"> 
    <div class="row">

      <input type="text" id="appName" class="form-control col-md-12" style="height: 30%; margin-bottom: 2%; border-radius: 120px 120px 120px 120px;" placeholder="Name">    
    </div>
    <div class="row">
      <input type="text" id="appComp" class="form-control col-md-12" style="height: 30%; margin-bottom: 2%; border-radius: 120px 120px 120px 120px;" placeholder="company">
    </div>
    <div class="row">  
      <input type="tel"  id="appCont" class="form-control col-md-12" style="height: 30%; margin-bottom: 2%; border-radius: 120px 120px 120px 120px;" placeholder="contact">
    </div>
    <div class="row">  
      <input type="date" id="appDate" class="form-control col-md-10" style="box-shadow: 2px 2px 2px #888888; height: 20%; margin-bottom: 2%; border-radius: 120px 120px 120px 120px;" placeholder="date">
    </div>      
     <div class="row">
        <span class="col-md-3"></span>
        <button class="btn btn-primary" onclick="sched()" style="border-radius: 50px 50px 50px 50px;">Sched Call</button>
     </div> 
    </div>
    </div>
     `;

    uText.append(span);







    //sample response comment it out
    userTyped.append(uText);
    //userTyped.append(document.createElement('br'));


    document.getElementById('info').append(userTyped);


    //resource = 1;


}

function sched() {
    var styles = `
    background-color: #E0E5CF;
    opacity: 1;
    border-radius: 30px 50px 50px 40px;
    width: auto;
    height: auto;
    float: left;
    clear: right;
    padding-left: 6%;
    padding-top: 4%;
    padding-right: 6%;
    padding-bottom: 2%;
    margin-right: 22%;
    margin-bottom: 5%;
    box-shadow: -1px -1px -1px #888888;
    `;
    var appName = document.getElementById("appName").value;
    var appComp = document.getElementById("appComp").value;
    var appCont = document.getElementById("appCont").value;
    var appDate = document.getElementById("appDate").value;

    if (appName.length == 0 || appComp.length == 0 || appCont.length == 0 || appDate.length == 0) {
        alert("Please fill all the details");
    } else {
        alert("Your appointment will be scheduled on specified time");

        var userTyped = document.createElement('p');
        userTyped.style = styles;
        userTyped.id = "reServer";

        var uText = document.createElement("p");
        uText.append("Thanks for contacting us, we will get back to you soon");
        //uText.append(JSON.parse(xhttp.responseText).result.fulfillment.speech);
        userTyped.append(uText);

        document.getElementById('info').append(userTyped);
        //resource = 1;
        anim(userTyped, who = 2);
        //userTyped.append(document.createElement('br'));
        elem.scrollTop = elem.scrollHeight;
    }

}





var botStyles = `
        position: fixed;
        bottom: 0;
        opacity: 0.7;
        margin-left: 82%;
        width: 4.6em;
        height: 4.6em;
        `;

var botButton = document.createElement('img');
botButton.src = "botbut.png";
botButton.className = "botButton";
botButton.style = botStyles;

var click = 0;
botButton.onclick = function() {
    if (click == 0) {
        var t = new botchat();
        click = 1;
        anim(document.getElementById("mainTag"));
    } else if (click == 1) {
        document.getElementById("mainTag").style.display = "none";

        click = 2;
    } else {

        document.getElementById("mainTag").style.display = "block";
        document.getElementById("mainTag").style.opacity = 0;
        anim(document.getElementById("mainTag"));
        //alert(click);
        click = 1;

    }
    //console.log(click);
}

function animLag() {
    var myVar = setInterval(myTimer, 1);
    var count = 0;
    var styles = `
    background-color: #E0E5CF;
    opacity: 0.7;
    border-radius: 30px 50px 50px 40px;
    width: auto;
    height: auto;
    float: left;
    clear: right;
    padding-left: 6%;
    padding-top: 4%;
    padding-right: 4%;
    padding-bottom: 0.2%;
    margin-right: 22%;
    margin-bottom: 5%;
    box-shadow: -1px -1px -1px #888888;
    `;
    var userTyped = document.createElement('p');
    userTyped.style = styles;
    userTyped.id = "tempRes";
    var uText = document.createElement("p");

    uText.append("....");
    //sample response comment it out
    userTyped.append(uText);
    document.getElementById('info').append(userTyped);
    elem.scrollTop = elem.scrollHeight;

    function myTimer() {
        if (count == 10) {
            myStopFunction();
        } else {
            //console.log("Delaying the server output");
            count++;

        }


    }


    function myStopFunction() {
        //console.log("function stopped");
        document.getElementById('tempRes').remove();
        elem = document.getElementById('info');
        elem.scrollTop = elem.scrollHeight;


        clearInterval(myVar);
        requestMessage();
    }
}


//userTyped.append(document.createElement('br'));





function anim(which, who, time = 100) {
    var myVar = setInterval(myTimer, time);
    var opacity = 0;
    which.style.opacity = 0.8;
    resource = 1;

    function myTimer() {
        if (opacity >= 1.0) {
            myStopFunction();
        } else {
            which.style.opacity = 1;

            opacity = opacity + 0.2;
        }


    }

    function myStopFunction() {
        elem = document.getElementById('info');
        elem.scrollTop = elem.scrollHeight;

        which.style.opacity = 1;
        clearInterval(myVar);
        if (who == 1) {
            animLag();
            //console.log("Who is " + who)

        } else if (who == 2) {
            //console.log("Who is " + who);
            document.getElementById('usInput').disabled = false;
            document.getElementById('usInput').value = "";
            document.getElementById('usInput').focus();
            //document.getElementById('usInput').placeholder = "Ask the bot!";
            //sendUserMessage.disabled = false;
            //console.log("Checkin" + sendMessage.disabled);
        }


    }
}



document.body.append(botButton);