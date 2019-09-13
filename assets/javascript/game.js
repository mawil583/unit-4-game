
$(document).ready(function () {

    let fighters = {

        "obi": {
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 16,
        },
        "maul": {
            healthPoints: 200,
            attackPower: 3,
            counterAttackPower: 6
        },
        "skywalker": {
            healthPoints: 90,
            attackPower: 11,
            counterAttackPower: 22,
        },
        "sidious": {
            healthPoints: 150,
            attackPower: 5,
            counterAttackPower: 10
        }
    }

let initialAP;

    console.log(Object.keys(fighters));
    console.log(Object.values(fighters));
    console.log(Object.entries(fighters));


    // This dynamically creates boxes with each assigned to a character by looping 
    //     through the fighters in the object. Object.keys(fighters) returns an 
    //     array consisting of the keys of the object {fighters}. Then the loop 
    //     just executes the code for each of the 4 characters. 

    function loop() {
        for (let fighter of Object.keys(fighters)) {

            let character = $("<div>");
            character.addClass("player character charHov");
            character.attr("data-name", fighter);
            character.text(fighter);
            character.append("<br>");
            let image = $("<img src='../unit-4-game/assets/images/" + fighter + ".jpeg'>");
            character.append(image);
            character.append("<br>");
            let healthDiv = $("<p>");
            $(healthDiv).text("Health Points = " + fighters[fighter].healthPoints)
            character.append(healthDiv);
            $("#players").append(character);
            console.log(fighter + " has " + fighters[fighter].healthPoints + " HP");
        }
        // fighters = Object.assign({}, fighters);
    }
    loop();


    // This lets you choose a player, and puts the rest of the players into 
    //    the enemy section
    $("#players").on("click", ".player", function () {

        $(".player").toggleClass("player enemy");
        $("#attackers").append($(".enemy"));
        $(this).toggleClass("enemy player");
        $("#players").append($(this));
        $(this).removeClass("charHov");
        if ( ! initialAP) {
            initialAP = fighters[$(this).attr('data-name')].attackPower
        }
    })

    // This lets you choose an enemy to fight and puts your opponent 
    // into the attack div
    $("#attackers").on("click", ".enemy", function () {

        $(this).toggleClass("enemy dual");
        $(this).removeClass("charHov");
        $("#attack").append($(this));
        // this removes the defeated character if there is one
        $(".endGame").remove();
        // This changes enemies class so that you can't select more than
        // one opponent.
        $(".enemy").toggleClass("enemy bench");
    })
    // End character click section -------------------------------------------------------------

    $(".attackBtn").on("click", function () {
        // variable declarations -----------------------------------------------------------
        console.log("attack button just clicked")
        // let enemyPlayersCount = $(".bench").length + $(".dual").length + $(".enemy").length;
        let defeatedEnemy = ($(".dual").attr("data-name"));
        // console.log(enemyPlayersCount)
        let enemyName = $(".dual").attr("data-name");
        console.log(enemyName);
        let playerName = $(".character").attr("data-name");

        // function declarations ----------------------------------------------------------
        function enemyCounterAttack() {
            // this subtracts my healthpoints 
            fighters[playerName].healthPoints -= (fighters[enemyName].counterAttackPower);
            // display my current healthpoints on my picture:
            $(".player").children("p").text("Health-Points = " + fighters[playerName].healthPoints);
            // console.log("Length of players: " + enemyPlayersCount);
        }


        // console.log(enemyPlayersCount);
        function afterPlayerAttack() {
            // if opponent's healthpoints are less than or equal to 0, display "You Won!" 
            //     and toggle classes of remaining enemies from bench to enemy. Then
            //      delete enemy with the class "dual".

            if (fighters[enemyName].healthPoints <= 0 && fighters[playerName].healthPoints > 0) {

                $(".dual").remove();
                let enemyPlayersCount = $(".bench").length + $(".dual").length + $(".enemy").length;
                $(".bench").toggleClass("bench enemy");
                console.log("enemies remaining: " + enemyPlayersCount);
                $(".battleDisplay").empty();
                if (enemyPlayersCount > 0) {
                    // $(".battleDisplay").empty();
                    $("#attack").append("<div class='endGame'>You won against " + (defeatedEnemy) +
                        "! Now choose another enemy to fight.</div>");
                    // $("button").off("click");
                } else if (enemyPlayersCount <= 0) {
                    $(".attackBtn").attr("disabled", true);
                    $("#attack").append("<div class='endGame'>Congratulations! You won the game!</div>");
                    $("#attack").append("<button class='reset';>Reset</button>");
                    console.log("you've been alerted that you won the game and toggled classes and off.click");
                }

            }
        }
        // end function declarations -------------------------------------------------------



        //  attackButton on click ACTUALLY STARTS HERE ---------------------------------------------------



        // this subtracts enemy health points
        // console.log("number of enemy players before clicking: " + enemyPlayersCount);
        fighters[enemyName].healthPoints -= (fighters[playerName].attackPower);
        console.log("enemy health points after I attack him: " + (fighters[enemyName].healthPoints - fighters[playerName].attackPower));
        // console.log("number of enemy players after clicking: " + enemyPlayersCount);
        // display opponent's current healthpoints on picture
        $(".dual").children("p").text("Health-Points = " + fighters[enemyName].healthPoints);
        // This displays to the user "You attacked enemy for _ damage"
        console.log($(".battleDisplay"))
        $(".battleDisplay").text("You attacked " + enemyName + " for " + fighters[playerName].attackPower + " damage.");
        console.log($(".battleDisplay"))
       
        $("#attack").append($(".battleDisplay"));
        console.log($(".battleDisplay"))
        
        
        afterPlayerAttack();
        
        if (fighters[enemyName].healthPoints > 0 && fighters[playerName].healthPoints > 0) {
            enemyCounterAttack();
            $(".battleDisplay").append("<div>" + enemyName + " attacked you back for " + fighters[enemyName].counterAttackPower + " damage.")

        }

        // if opponent's healthpoints are less than or equal to 0, display "You Lost"
        //     and freeze all click events except reset
        if (fighters[playerName].healthPoints <= 0 && fighters[enemyName].healthPoints > 0) {
            $(".attackBtn").attr("disabled", true);
            $(".battleDisplay").empty();
            $("#attack").append("<div class='endGame'>You lost against " + ($(".dual").attr("data-name")) +
                "! Click Restart to try again.</div>");
            $(".dual").remove();
            $("#attack").append("<button class='reset'>Reset</button>");
            $(".player").children("p").text("Health-Points = " + fighters[playerName].healthPoints);
        }


        // access my character's (class player) health points and subtract from it my 
        //     opponent's counterattack power
        console.log("playerHealthBefore: " + (fighters[playerName].healthPoints))
        console.log(fighters[enemyName].counterAttackPower)
        console.log("playerHealthAfter: " + (fighters[playerName].healthPoints))
        

        console.log("fighters[playerName].attackPower before " + fighters[playerName].attackPower)
        fighters[playerName].attackPower += initialAP;

        console.log("fighters[playerName].attackPower after " + fighters[playerName].attackPower)
        

        // reset button
        $(".reset").click(function () {
            // $("div").empty();
            $("#players").empty();
            $("#attackers").empty();
            $(".battleDisplay").empty();
            $(".dual").remove();
            $(".endGame").empty();
            $("button.reset").remove();
            fighters.obi.healthPoints = 120;
            fighters.maul.healthPoints = 200;
            fighters.skywalker.healthPoints = 90;
            fighters.sidious.healthPoints = 150;
            fighters.obi.attackPower = 8;
            fighters.maul.attackPower = 3;
            fighters.skywalker.attackPower = 11;
            fighters.sidious.attackPower = 5;
            loop();
            $(".attackBtn").attr("disabled", false);
            initialAP = null;
        })
    })
})



// the 3 lines below do the same thing as fighters[enemyName].healthPoints -= fighters[playerName].attackPower;
// let enemy = fighters[enemyName];
// let player = fighters[playerName];
// enemy.healthPoints -= player.attackPower;
