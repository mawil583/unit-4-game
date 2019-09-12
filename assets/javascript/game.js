
$(document).ready(function () {

    let fighters = {

        "obi": {
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 18,
        },
        "maul": {
            healthPoints: 5000,
            attackPower: 7,
            counterAttackPower: 14
        },
        "skywalker": {
            healthPoints: 100,
            attackPower: 6,
            counterAttackPower: 20,
        },
        "sidious": {
            healthPoints: 150,
            attackPower: 9,
            counterAttackPower: 18
        }
    }



    // console.log(Object.keys(fighters));
    // console.log(Object.values(fighters));
    // console.log(Object.entries(fighters));


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
        fighters = Object.assign({}, fighters);
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
    })

    // This lets you choose an enemy to fight and puts your opponent 
    // into the attack div
    $("#attackers").on("click", ".enemy", function () {

        $(this).toggleClass("enemy dual");
        $(this).removeClass("charHov");
        $("#attack").append($(this));
        // this removes the defeated character if there is one
        $("div.endGame").remove();
        // This changes enemies class so that you can't select more than
        // one opponent.
        $(".enemy").toggleClass("enemy bench");
    })
    // End character click section -------------------------------------------------------------

    $("button").on("click", function () {
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
                if (enemyPlayersCount > 0) {
                    $("#attack").append("<div class='endGame'>You won against " + (defeatedEnemy) +
                        "! Now choose another enemy to fight.</div>");
                    // $("button").off("click");
                } else if (enemyPlayersCount <= 0) {
                    $(".attackBtn").attr("disabled", true);
                    $("#attack").append("<div class='endGame'>Congratulations! You won the game!</div>");
                    $("#attack").append("<button class='reset';>Reset</button>");
                    console.log("you've been alerted that you won the game and toggled classes and off.click");
                }

                // if (fighters[enemyName].healthPoints <= 0 && fighters[playerName].healthPoints > 0) {
                //     $(".dual").remove();
                //     let enemyPlayersCount = $(".bench").length + $(".dual").length + $(".enemy").length;
                //     console.log("enemies remaining: " + enemyPlayersCount)
                //     $(".bench").toggleClass("bench enemy");
                //     if (enemyPlayersCount > 0) {
                //         $("#attack").append("<div class='endGame'>You won against " + (defeatedEnemy) +
                //             "! Now choose another enemy to fight.</div>");
                //     } else if (enemyPlayersCount <= 0) {
                //         $("#attack").append("<div class='endGame'>Congratulations! You won the game!</div>");
                //         $("#attack").append("<button class='reset';>Reset</button>");
                //         $("button").off("click");
                //         console.log("you've been alerted that you won the game and toggled classes and off.click")
                //     }
                // }
            }
        }
        // end function declarations -------------------------------------------------------



        //  CODE ACTUALLY STARTS HERE ---------------------------------------------------



        // this subtracts enemy health points
        // console.log("number of enemy players before clicking: " + enemyPlayersCount);
        fighters[enemyName].healthPoints -= (fighters[playerName].attackPower);
        console.log("enemy health points after I attack him: " + (fighters[enemyName].healthPoints - fighters[playerName].attackPower));
        // console.log("number of enemy players after clicking: " + enemyPlayersCount);
        // display opponent's current healthpoints on picture
        $(".dual").children("p").text("Health-Points = " + fighters[enemyName].healthPoints);

        afterPlayerAttack();

        if (fighters[enemyName].healthPoints > 0 && fighters[playerName].healthPoints > 0) {
            enemyCounterAttack();
        }


        // if (fighters[playerName].healthPoints <= 0) {
        //     $("button").off("click");
        // } 

        // if opponent's healthpoints are less than or equal to 0, display "You Lost"
        //     and freeze all click events except reset
        if (fighters[playerName].healthPoints <= 0 && fighters[enemyName].healthPoints > 0) {
            $(".attackBtn").attr("disabled", true);
            $("#attack").append("<div class='endGame'>You lost against " + ($(".dual").attr("data-name")) +
                "! Click Restart to try again.</div>");
            $("#attack").append("<button class='reset'>Reset</button>");
            $(".player").children("p").text("Health-Points = " + fighters[playerName].healthPoints);
        }


        // access my character's (class player) health points and subtract from it my 
        //     opponent's counterattack power
        console.log("playerHealthBefore: " + (fighters[playerName].healthPoints))
        console.log(fighters[enemyName].counterAttackPower)
        console.log("playerHealthAfter: " + (fighters[playerName].healthPoints))

        // display under the opponent (append to div with ID attack) "you 
        //     attacked (data-name associated with #attack Id) for 
        //      [your character's attack power] damage"
        // display under the opponent (append to div with ID attack) 
        //     "(data-name associated with #attack Id) attacked you back for 
        //      [opponent's counterattack power] damage."
        // double your character's attack power
        fighters[playerName].attackPower += 20;


        // reset button
        $(".reset").click(function () {
            $("div").empty();
            fighters.obi.healthPoints = 120;
            fighters.maul.healthPoints = 5000;
            fighters.skywalker.healthPoints = 100;
            fighters.sidious.healthPoints = 150;
            fighters.obi.attackPower = 8;
            fighters.maul.attackPower = 7;
            fighters.skywalker.attackPower = 6;
            fighters.sidious.attackPower = 9;
            loop();
            $(".attackBtn").attr("disabled", false);
        })
    })
})



// if my health points are negative but I beat the last opponent, I shouldn't be able to continue

// the 3 lines below do the same thing as fighters[enemyName].healthPoints -= fighters[playerName].attackPower;
// let enemy = fighters[enemyName];
// let player = fighters[playerName];
// enemy.healthPoints -= player.attackPower;

// enemyHp = enemyHp - (fighters[playerName].attackPower);
//     does not work because you're mutating the enemyHp variable instead of 
//     mutating the acual object
