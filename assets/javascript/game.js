
$(document).ready(function () {

    let fighters = {

        "obi": {
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 16,
            image: "../"
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
        character.attr("src", "")
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
    // console.log(fighters."skywalker".healthPoints) is incorrect syntax and it's 
    //    the reason that fighters.fighter.healthPoints doesn't work in the for loop.

    fighters.skywalker.healthPoints += 10;
    console.log(fighters.skywalker.healthPoints);
    
    // This lets you choose a player, and puts the rest of the players into 
    //    the enemy section
    $("#players").on("click", ".player", function () {

        $(".player").addClass("enemy");
        $("#attackers").append($(".enemy"));
        $("#players").append($(this));
        $(this).removeClass("charHov")
        $(this).toggleClass("enemy player");
    })

    // This lets you choose an enemy to fight and puts your opponent 
    // into the attack div
    $("#attackers").on("click", ".enemy", function () {

        $(this).toggleClass("enemy dual");
        $(this).removeClass("charHov");
        $("#attack").append($(this));
        // This changes enemies class so that you can't select more than
        // one opponent.
        $(".enemy").toggleClass("enemy bench")
    })
    $("button").on("click", function () {

        // access the opponent's (class duel) health points and subtract 
        //     from it your character's attackPower 
        console.log($(".dual").attr("data-name"));
        let enemyName = $(".dual").attr("data-name");
        let playerName = $(".character").attr("data-name");
        console.log("enemy health points: " + fighters[enemyName].healthPoints);
        console.log("enemy health points after I attack him: " + (fighters[enemyName].healthPoints - fighters[playerName].attackPower));
        
        // display his current healthpoints on his picture
        // if opponent's healthpoints are less than or equal to 0, display "You Won!" 
        //     and toggle classes of remaining enemies from bench to enemy. Then
        //      delete enemy with the class "dual".
        // access my character's (class player) health points and subtract from it my 
        //     opponent's counterattack power
        // display my current healthpoints on my picture
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

