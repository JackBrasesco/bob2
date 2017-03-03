//////////////////THINGS TO ADD////////////////////////
//DEFINE
//ALARMS
//IMAGE SEARCH
//HELP PAGE
//SIGN IN TO REMEBER THINGS
//NOTES
//VOICE CONTROL
var commands = {
  'hello': function() {
    console.log("it works")
  }
}
annyang.addCommands(commands);
annyang.start()
var output = $("#main-output");
var input = $("#main-input-field");
var clickme = $("#clickme");
//BOTTOM BUTTONS ---------------------------------------------------------

var helpbtn = $("#help-button");
var signinbtn = $("#sign-in-button");

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();}

/////////////////////////////////////////////////////////////
var verbs = ["lookup", "search", "find","stalk","go to","set","calculate","add","subtract","multiply","divide",]
function getWikiIntro(title, processor) {
  console.log("hello")
  $.ajax({
    method: "GET",
    url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=" + title,
    dataType: "jsonp",
    jsonp: "callback",
    success: function(res) {
      var pages = res.query && res.query.pages
      if (pages) {
        var pageKeys = Object.keys(pages);
        var text = pages[pageKeys[0]].extract;
        var processed = processor(text);
        output.text(processed);
      }    }
  })
}
var negitvity = "null"
input.keydown(function(e) {
  if (e.keyCode == 13) {

     var entry = input.val().toLowerCase();
     var negitive = entry.indexOf("not")
     if (negitive > -1) {
       negitvity = "true"
     }
     //BOB ---------------------------------------------------------------------
     var isBob = entry.indexOf("bob")
     var isOriginal = entry.indexOf("original")
     if (isBob > -1) {
       output.html("that's me!")
     }
     if (isOriginal > -1) {
       if (isBob > -1) {
         output.html("old bob is not at cool as me <br> but you can find him at this url: <br> jackbrasesco.github.io/bob")
       }
     }
     ////////////////////////////////////FUNCTIONAL STUFF AND COMMANDS///////////////////////////////////////////
     for (i = 0; i < verbs.length; i++) {
       var current_verb = verbs[i];
       var isVerb = entry.indexOf(current_verb);
       if (isVerb > -1) {
         if (current_verb == "go to") {
           var places = ["youtube","chat","drive"]
           var place_to_go = entry.split("go to ")[1];
           for (i = 0; i < places.length;i++) {
             var current_place = places[i]
             var isPlace = entry.indexOf(current_place);
             if (isPlace > -1) {
             if (current_place == "youtube") {
               console.log(current_place)
               openInNewTab("https://www.youtube.com/")
             }
             if (current_place == "chat") {
               openInNewTab("https://jackbrasesco.github.io/chat/")
             }
             if (current_place == "drive") {
               openInNewTab("https://drive.google.com/drive/u/0/my-drive")
             }
           }
           }
         }
         if (current_verb == "set") {
           var isTimer = entry.indexOf("timer");
           if (isTimer > -1) {
             var howlongtimer = entry.split("for")[1];
             openInNewTab("https://www.google.com/search?q=set%20a%20timer%20for" + howlongtimer);
           }
         }
         if (current_verb == "subtract") {
           var problem_to_solve = entry.split("subtract")[1]
           var isnosign = entry.indexOf("and")
           var isfrom = entry.indexOf("from")
           if (isnosign > -1) {
             var newstep1 = problem_to_solve.split("and")[0]
             var newstep2 = problem_to_solve.split("and")[1]
             problem_to_solve = (newstep1 + "-" + newstep2)
           }
           if (isfrom > -1) {
             var newstep1 = problem_to_solve.split("from")[0]
             var newstep2 = problem_to_solve.split("from")[1]
             problem_to_solve = (newstep2 + "-" + newstep1)
           }
           var firstNumbertoSubtract = parseInt(problem_to_solve.split("-")[0]);
           var secondNumbertoSubtract = parseInt(problem_to_solve.split("-")[1]);
           var finalNumber = (firstNumbertoSubtract-secondNumbertoSubtract);
           output.html(problem_to_solve + " is equal to " + finalNumber)
         }
         if (current_verb == "multiply") {
           var problem_to_solve = entry.split("multiply")[1];

           var isnosign = entry.indexOf("and")
           if (isnosign > -1) {
             var newstep1 = problem_to_solve.split("and")[0]
             var newstep2 = problem_to_solve.split("and")[1]
             problem_to_solve = (newstep1 + "*" + newstep2)
           }
           var isthereamultipysign = problem_to_solve.indexOf("*");
           var isthereanx = problem_to_solve.indexOf("x");
           if (isthereanx > -1) {
             var firstNumbertoX = parseInt(problem_to_solve.split("x")[0]);
             var secondNumbertoX = parseInt(problem_to_solve.split("x")[1]);
             var finalNumber = (firstNumbertoX*secondNumbertoX);
             output.html(problem_to_solve + " is equal to " + finalNumber)
           }
           if (isthereamultipysign > -1) {
           var firstNumbertoMultiply = parseInt(problem_to_solve.split("*")[0]);
           var secondNumbertoMultiply = parseInt(problem_to_solve.split("*")[1]);
           var finalNumber = (firstNumbertoMultiply*secondNumbertoMultiply);
           output.html(problem_to_solve + " is equal to " + finalNumber)
         }
         }
         if (current_verb == "add") {
           var problem_to_solve = entry.split("add")[1];
           var isnosign = entry.indexOf("and")
           if (isnosign > -1) {
             var newstep1 = problem_to_solve.split("and")[0]
             var newstep2 = problem_to_solve.split("and")[1]
             problem_to_solve = (newstep1 + "+" + newstep2)
           }
           var firstNumbertoAdd = parseInt(problem_to_solve.split("+")[0]);
           var secondNumbertoAdd = parseInt(problem_to_solve.split("+")[1]);
           var finalNumber = (firstNumbertoAdd+secondNumbertoAdd);
           output.html(problem_to_solve + " is equal to " + finalNumber)
         }
         if (current_verb == "divide") {
           var problem_to_solve = entry.split("divide")[1];
           var isnosign = entry.indexOf("and")
           var isoutof = entry.indexOf("out of")
           if (isnosign > -1) {
             var newstep1 = problem_to_solve.split("and")[0]
             var newstep2 = problem_to_solve.split("and")[1]
             problem_to_solve = (newstep1 + "/" + newstep2)
           }
           if (isoutof > -1) {
             var newstep1 = problem_to_solve.split("out of")[0]
             var newstep2 = problem_to_solve.split("out of")[1]
             problem_to_solve = (newstep2 + "/" + newstep1)
           }
           var firstNumbertoDivide = parseInt(problem_to_solve.split("/")[0]);
           var secondNumbertoDivide = parseInt(problem_to_solve.split("/")[1]);
           var finalNumber = (firstNumbertoDivide/secondNumbertoDivide);
           output.html(problem_to_solve + " is equal to " + finalNumber)
         }
         if (current_verb == "calculate") {
           var problem_to_solve = entry.split("calculate")[1];
           isTimes = problem_to_solve.indexOf("*")
           isX = problem_to_solve.indexOf("x")
           isDivide = problem_to_solve.indexOf("/")
           isAdd = problem_to_solve.indexOf("+")
           isSubtract = problem_to_solve.indexOf("-")
           if (isTimes > -1) {
             var firstNumbertoMultiply = parseInt(problem_to_solve.split("*")[0]);
             var secondNumbertoMultiply = parseInt(problem_to_solve.split("*")[1]);
             var finalNumber = (firstNumbertoMultiply*secondNumbertoMultiply);
             output.html(problem_to_solve + " is equal to " + finalNumber)
           }
           if (isX > -1) {
             var firstNumbertoX = parseInt(problem_to_solve.split("x")[0]);
             var secondNumbertoX = parseInt(problem_to_solve.split("x")[1]);
             var finalNumber = (firstNumbertoX*secondNumbertoX);
             output.html(problem_to_solve + " is equal to " + finalNumber)
           }
           if (isDivide > -1) {
             var firstNumbertoDivide = parseInt(problem_to_solve.split("/")[0]);
             var secondNumbertoDivide = parseInt(problem_to_solve.split("/")[1]);
             var finalNumber = (firstNumbertoDivide/secondNumbertoDivide);
             output.html(problem_to_solve + " is equal to " + finalNumber)
           }
           if (isAdd > -1) {
             var firstNumbertoAdd = parseInt(problem_to_solve.split("+")[0]);
             var secondNumbertoAdd = parseInt(problem_to_solve.split("+")[1]);
             var finalNumber = (firstNumbertoAdd+secondNumbertoAdd);
             output.html(problem_to_solve + " is equal to " + finalNumber)
           }
           if (isSubtract > -1) {
             var firstNumbertoSubtract = parseInt(problem_to_solve.split("-")[0]);
             var secondNumbertoSubtract = parseInt(problem_to_solve.split("-")[1]);
             var finalNumber = (firstNumbertoSubtract-secondNumbertoSubtract);
             output.html(problem_to_solve + " is equal to " + finalNumber)
           }
         }
         if (current_verb == "stalk") {
           var person_to_stalk = entry.split("stalk ")[1];
           var refined_stalk = person_to_stalk.replace(/\s+/g, '-');
           openInNewTab("http://www.whitepages.com/name/" + refined_stalk);
         }
         if (current_verb == "lookup") {
           var thing_to_look_up = entry.split("lookup ")[1]
           openInNewTab("https://www.google.com/search?q=" + thing_to_look_up);
         }
         if (current_verb == "search") {
           var thing_to_search = entry.split("search ")[1]
           var searchfor = thing_to_search.indexOf("for")
           if (searchfor > -1) {
             thing_to_search = entry.split("for")[1];
           }
           var onYoutube = entry.indexOf("youtube")
           if (onYoutube > -1) {
             output.html("let me search that for you. . .");
             setTimeout(function(){openInNewTab("https://www.youtube.com/results?search_query=" + thing_to_search);
},1000);
           } else {
           openInNewTab("https://www.google.com/search?q=" + thing_to_search);
         }
         }
         if (current_verb == "find") {
           var thing_to_find = entry.split("find ")[1];
           var ismathroot = thing_to_find.indexOf("root")
           if (ismathroot > -1) {
             var what_is_squarerooted = entry.split("of")[1]
             output.html("The square root of " + what_is_squarerooted + " is " + (Math.sqrt(what_is_squarerooted)))
           } else {
           openInNewTab("https://www.google.com/maps/search/" + thing_to_find);
         }
         }
       }
     }
     ////////////////////////////////CONVERSATIONAL THINGS/////////////////////////////////

     //Thanks ---------------------------------------------------
     var isThanking = entry.indexOf("thanks");
     var isThank = entry.indexOf("thank you");
     var yourwelcomeresponse = ["you're welcome!","no problem","thats what I'm here for", "I've got your back"]
     if (isThanking > -1) {
       var randomNumber1 = Math.floor(Math.random() * 4)
       var response_yourwelcome = yourwelcomeresponse[randomNumber1]
       output.html(response_yourwelcome)
     }
     if (isThank > -1) {
       var randomNumber2 = Math.floor(Math.random() * 4)
       var response_yourwelcome = yourwelcomeresponse[randomNumber2]
       output.html(response_yourwelcome)
     }
     //HELLO ----------------------------------------------------
     var isHi = entry.indexOf("hi");
     var isHello = entry.indexOf("hello");
     var isHey = entry.indexOf("hey");
     var iswhatsup = entry.indexOf("whats up");
     var iswhatsupgrammar = entry.indexOf("what's up");
     var greetingresponse = ["Hey there!","Howdy!","Hi, how are you?","salutations earthling."]
     var randomNumber3 = Math.floor(Math.random() * 4)
     if (isHi > -1) {
       var response_greeting = greetingresponse[randomNumber3]
       output.html(response_greeting)
     }
     if (isHello > -1) {
       var response_greeting = greetingresponse[randomNumber3]
       output.html(response_greeting)
     }
     if (isHey > -1) {
       var response_greeting = greetingresponse[randomNumber3]
       output.html(response_greeting)
     }
     if (iswhatsup > -1) {
       var response_greeting = greetingresponse[randomNumber3]
       output.html(response_greeting)
     }
     if (iswhatsupgrammar > -1) {
       var response_greeting = greetingresponse[randomNumber3]
       output.html(response_greeting)
     }
     //HOW ARE YOU RESPONSE----------------------------------------
     var isGood = entry.indexOf("good")
     var isFine = entry.indexOf("fine")
     var isBad = entry.indexOf("bad")
     var isSad = entry.indexOf("sad")
     var positivehauresponse = ["That's good to hear!", "Great!","Alrighty then"];
     var negitivehauresponse = ["Sorry to hear that","That sucks. . ."];
     var randomNumber4 = Math.floor(Math.random() * 3)
     var randomNumber5 = Math.floor(Math.random() * 2)
     if (negitvity == "true") {
       if (isGood > -1) {
        output.html(negitivehauresponse[randomNumber5])
      }
      if (isFine > -1) {
        output.html(negitivehauresponse[randomNumber5])
      }
      if (isBad > -1) {
        output.html(positivehauresponse[randomNumber4])
      }
      if (isSad > -1) {
        output.html(positivehauresponse[randomNumber4])
      }
    } else {
      if (isGood > -1) {
       output.html(positivehauresponse[randomNumber4])
     }
     if (isFine > -1) {
       output.html(positivehauresponse[randomNumber4])
     }
     if (isBad > -1) {
       output.html(negitivehauresponse[randomNumber5])
     }
     if (isSad > -1) {
       output.html(negitivehauresponse[randomNumber5])
     }
     //FUCK YOU ----------------------------------------------------------------
     var isAttack = entry.indexOf("fuck you")
     if (isAttack > -1) {
       output.html("When and where?")
     }
     if (output.html() == "") {
       output.html("Sorry I didn't get that. . . <br> click help to find out what I can do!")
     }

    }
     input.val("")
  }
})
