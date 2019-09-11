
$(document).ready(function () {

    let fighters = {

        "obi": {
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 16,
        },
        "maul": {
            healthPoints: 180,
            attackPower: 7,
            counterAttackPower: 14
        },
        "skywalker": {
            healthPoints: 100,
            attackPower: 6,
            counterAttackPower: 12,
        },
        "sidious": {
            healthPoints: 150,
            attackPower: 9,
            counterAttackPower: 18
        }
    }

    console.log(Object.keys(fighters));
    console.log(Object.values(fighters));
    console.log(Object.entries(fighters));

    // This dynamically creates boxes with each assigned to a character by looping 
    //     through the fighters in the object. Object.keys(fighters) returns an 
    //     array consisting of the keys of the object {fighters}. Then the loop 
    //     just executes the code for each of the 4 characters. 
    for (let fighter of Object.keys(fighters)) {

        let character = $("<div>");
        character.addClass("player character charHov");
        character.attr("data-name", fighter);
        character.text(fighter);
        character.append("<br>");
        let image = $("<img src='../unit-4-game/assets/images/" + fighter + ".jpeg'>");
        character.append(image);
        character.append("<br>");

        // code that was working before...
        // character.append("Health Points = " + fighters[fighter].healthPoints);
        // $("#players").append(character);
        // console.log(fighter + " has " + fighters[fighter].healthPoints + " HP");

        let healthDiv = $("<p>");
        $(healthDiv).text("Health Points = " + fighters[fighter].healthPoints)
        character.append(healthDiv);
        $("#players").append(character);
        console.log(fighter + " has " + fighters[fighter].healthPoints + " HP");
    }

   
    console.log(fighters.skywalker.healthPoints);

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
    $("button").on("click", function () {
        

        // access the opponent's (class duel) health points and subtract 
        //     from it your character's attackPower 
        let enemyName = $(".dual").attr("data-name");
        let playerName = $(".character").attr("data-name");
        console.log(fighters[enemyName].healthPoints);
        // console.log(fighters.enemyName.healthPoints);
        (fighters[enemyName].healthPoints) -= (fighters[playerName].attackPower);
        // console.log(fighters.enemyName.healthPoints)
        console.log($(".dual").attr("data-name"));

        // the 3 lines below do the same thing as fighters[enemyName].healthPoints -= fighters[playerName].attackPower;
        // let enemy = fighters[enemyName];
        // let player = fighters[playerName];
        // enemy.healthPoints -= player.attackPower;
        
        console.log("enemy health points: " + fighters[enemyName].healthPoints);
        console.log("enemy health points after I attack him: " + (fighters[enemyName].healthPoints - fighters[playerName].attackPower));

        // display opponent's current healthpoints on his picture
        $(".dual").children("p").text("Health-Points = " + fighters[enemyName].healthPoints);


        // enemyHp = enemyHp - (fighters[playerName].attackPower);
        //     does not work because you're mutating the enemyHp variable instead of 
        //     mutating the acual object


        // if opponent's healthpoints are less than or equal to 0, display "You Won!" 
        //     and toggle classes of remaining enemies from bench to enemy. Then
        //      delete enemy with the class "dual".
        if (fighters[enemyName].healthPoints <= 0) {
            $("#attack").append("<div class='endGame'>You won against " + ($(".dual").attr("data-name")) + "! Now choose another enemy to fight.</div>");
            $(".dual").remove();
            $(".bench").toggleClass("bench enemy");
        }

        // access my character's (class player) health points and subtract from it my 
        //     opponent's counterattack power
        
        console.log("playerHealthBefore: " + (fighters[playerName].healthPoints))
        console.log(fighters[enemyName].counterAttackPower)
        fighters[playerName].healthPoints -= (fighters[enemyName].counterAttackPower);
        console.log("playerHealthAfter: " + (fighters[playerName].healthPoints))

        // display my current healthpoints on my picture
        $(".player").children("p").text("Health-Points = " + fighters[playerName].healthPoints)

        // if opponent's healthpoints are less than or equal to 0, display "You Lost"
        //     and freeze all click events except reset
        // display under the opponent (append to div with ID attack) "you 
        //     attacked (data-name associated with #attack Id) for 
        //      [your character's attack power] damage"
        // display under the opponent (append to div with ID attack) 
        //     "(data-name associated with #attack Id) attacked you back for 
        //      [opponent's counterattack power] damage."
        // double your character's attack power
        // 
    })

    // add reset button that appends all players to #players ID and resets
    // player values

})

