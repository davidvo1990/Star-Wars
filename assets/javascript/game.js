$(document).ready(function () {
    var selectChar;
    var selectDefender;
    var isCharSelect = false;
    var isDefenderSelect = false;

    var allChar = {
        "obi": {
            name: "Obi-Wan Kenobi",
            health: 120,
            attack: 8,
            counterattack: 15
        },
        "luke": {
            name: "Luke Skywalker",
            health: 100,
            attack: 11,
            counterattack: 5
        },
        "darthS": {
            name: "Darth Sidious",
            health: 150,
            attack: 10,
            counterattack: 20
        },
        "darthM": {
            name: "Darth Maul",
            health: 180,
            attack: 8,
            counterattack: 25
        }
    };
    /////////////////////////////////////
    //adding atributte to character
    function addAtributte() {
        $("#obi .char-name").html(allChar.obi.name);
        $("#luke .char-name").html(allChar.luke.name);
        $("#darthS .char-name").html(allChar.darthS.name);
        $("#darthM .char-name").html(allChar.darthM.name);

        $("#obi .char-health").html(allChar.obi.health);
        $("#luke .char-health").html(allChar.luke.health);
        $("#darthS .char-health").html(allChar.darthS.health);
        $("#darthM .char-health").html(allChar.darthM.health);

        //test
        //var x = Object.values(allChar)[0]
        //console.log(x)
        //console.log(Object.values(x)[0])
    }
    addAtributte();
    //////////////////////////////////////
    // function select() will pick your character and move the rest as your enemies
    function select() {
        $(".character").on("click", function () {
            //if (isCharSelect === false && isDefenderSelect === false){
                // prepend click image to character box
            $("#charbox").prepend($(this));
            //console.log(this);
            // then prepend the rest to enemies box
            $("#enembox").prepend($(".allchar"));
            //$(".allchar .image").attr("style", "background:red");
            $(".allchar .image").attr("class", "col-2 image character enem");
            isCharSelect = true;

            $(".character").off("click");
            console.log("Is My Charater select yet? " + isCharSelect)
            selectChar = $(this).attr("id");
            console.log("My character is " + selectChar)
            //}
            getCharAtr();
            charOriginalAtt = charAtt;
            enemies();
            console.log("--------------------------");
        })
        //END select()
    };

    //////////////////////////////////
    //function to select defender
    function enemies() {
        $(".enem").on("click", function () {
            //if (isCharSelect === true && isDefenderSelect === false ){
            $("#defender").prepend($(this));
            $(this).attr("class", "col-2 image character def");
            //$(".def").attr("style", "background:black; color:white");
            isDefenderSelect = true;
            $(".enem").off("click");
            //}
            console.log("Is Defender there? " + isDefenderSelect);
            selectDefender = $(this).attr("id");
            console.log("The Defender is " + selectDefender)
            console.log("My char original attack is " + charOriginalAtt);
            getDefAtr();
            fight();
            $(".def").off("click");
            console.log("--------------------------");
        })
        //END enemies()
    };

    select();

    ////////////////////////////////////////////////////
    // all variable to do math after click fight button
    var attackCounter = 0;
    var charHealth = null;
    var defHealth = null;
    var charAtt;
    var charOriginalAtt;
    var defAtt;
    var charCounterAtt;
    var defCounterAtt;
    //var charCurrentHealth;
    var charName;
    var defName;
    var charKey;
    var defKey;
    //Object.keys and Object.values change Object into array
    // get character atribute
    function getCharAtr() {
        for (var i = 0; i < Object.keys(allChar).length; i++) {
            if (selectChar === Object.keys(allChar)[i]) {
                var x = Object.values(allChar)[i];
                //charCurrentHealth=charHealth;
                charKey = Object.keys(allChar)[i];
                charName = Object.values(x)[0];
                charHealth = Object.values(x)[1];
                charAtt = Object.values(x)[2];
                charCounterAtt = Object.values(x)[3];
                console.log("Object character key is : " + charKey);
                console.log("Character is: " + charName);
                console.log("Character HP is: " + charHealth);
                console.log("Character attack is: " + charAtt);
                console.log("Character counter attack is: " + charCounterAtt);
            }
        }
        // END getCharAtr()
    };

    // get defender atribute
    function getDefAtr() {
        for (var i = 0; i < Object.keys(allChar).length; i++) {
            if (selectDefender === Object.keys(allChar)[i]) {
                var x = Object.values(allChar)[i];
                defKey = Object.keys(allChar)[i];
                defName = Object.values(x)[0];
                defHealth = Object.values(x)[1];
                defAtt = Object.values(x)[2];
                defCounterAtt = Object.values(x)[3];
                console.log("Object defender key is : " + defKey);
                console.log("Defender is: " + defName);
                console.log("Defender HP is: " + defHealth);
                console.log("Defender attack is: " + defAtt);
                console.log("Defender counter attack is: " + defCounterAtt);
            }
        }
        // END getDefAtr()
    };
    // fight button, do thing when click the button as well print out message
    function fight() {
        $(".fight").on("click", function () {
            attackCounter++;
            charAtt = charOriginalAtt * attackCounter;
            defHealth = defHealth - charAtt;
            //this will not let defender have extra hit before dead
            if (defHealth > 0) {
                charHealth = charHealth - defCounterAtt;
            }
            console.log("Time character attack is " + attackCounter);
            console.log("Character attack is: " + charAtt);
            console.log("Character health is: " + charHealth);
            console.log("Defender health is: " + defHealth);
            $(".message1").html("You attack " + defName + " with " + charAtt + ".");
            $(".message2").html(defName + " attack you back for " + defCounterAtt + " damage.");

            $("#" + charKey + " .char-health").html(charHealth);
            $("#" + defKey + " .char-health").html(defHealth);

            ifDefDie();
            ifCharDie()
        })
        // END fight()
    };

    //decrease defender count each time one die, default = 3
    var countDef = 3;
    function ifDefDie() {
        if (defHealth <= 0) {
            enemies()
            $(".def").hide();
            $(".btn").off("click");
            countDef--;
            //prevent defender health show negative number
            $("#" + defKey + " .char-health").html("0");
        }
        outOfDef();
        // END ifDefDie()
    };

    // if character health reach 0 then loss
    function ifCharDie() {
        if (charHealth <= 0) {
            $(".message1").html("<h1 class='header'>YOU DIE! GAME OVER!!!</h1>");
            $(".message2").html("<button class='btn' type='button' id='reset'>Reset</button>");
            $(".btn").off("click");
            //prevent character health show negative number
            $("#" + charKey + " .char-health").html("0");
            console.log("--------------------------");
            reset();
        }
        // END ifCharDie()
    };
    // if run out of defender then you loss
    function outOfDef() {
        if (countDef === 0) {
            $(".message1").html("<h1 class='header'>YOU WIN! GAME END!!!</h1>");
            $(".message2").html("<button class='btn'  type='button' id='reset'>Reset</button>");
            console.log("--------------------------");
            reset();
        }
        // END outOfDef()
    };
    // reset button
    function reset() {
        $("#reset").on("click", function () {
            countDef = 3;
            $(".image").show();
            // put all character on order
            $(".allchar").append($("#obi"));
            $(".allchar").append($("#luke"));
            $(".allchar").append($("#darthS"));
            $(".allchar").append($("#darthM"));
            $(".container").prepend($(".allchar"));
            $(".allchar .image").attr("class", "col-2 image character");
            $(".allchar .image").remove("style");
            //reset all atribute
            addAtributte();
            charHealth = null;
            defHealth = null;
            charAtt = 0;
            charOriginalAtt = 0;
            attackCounter = 0;
            $(".message1").html("");
            $(".message2").html("");
            select();
        })
        // END reset()
    };

    // change color as time pass for fun
    setInterval(function () {
        $(".header").attr("style", "color:red");
        $(".btn").attr("style", "background:rgb(85, 22, 233)");
        $(".val").attr("style", "color:green");
    }, 2000);
    setInterval(function () {
        $(".header").attr("style", "color:yellow");
        $(".btn").attr("style", "background:rgb(18, 219, 219)");
        $(".val").attr("style", "color:brown");
    }, 3000);
    setInterval(function () {
        $(".header").attr("style", "color:blue");
        $(".btn").attr("style", "background:rgb(213, 18, 219)");
        $(".val").attr("style", "color:purple");
    }, 5000);
    setInterval(function () {
        $(".header").attr("style", "color:rgb(9, 245, 40)");
        $(".btn").attr("style", "background:black");
        $(".val").attr("style", "color:blue");
    }, 7000);
    setInterval(function () {
        $(".header").attr("style", "color:rgb(213, 18, 219)");
        $(".btn").attr("style", "background:blue");
        $(".val").attr("style", "color:orange");
    }, 11000)
    setInterval(function () {
        $(".header").attr("style", "color:rgb(18, 219, 219)");
        $(".btn").attr("style", "background:yellow");
        $(".val").attr("style", "color:violet");
    }, 17000);
    setInterval(function () {
        $(".header").attr("style", "color:rgb(85, 22, 233)");
        $(".btn").attr("style", "background:red");
        $(".val").attr("style", "color:cyan");
    }, 7000);

// sound for fun
    var audio = new Audio("assets/music/Star Wars Theme  John Williams.mp3");
    setInterval(function () {
    audio.play();
    },1000);
    //END
});