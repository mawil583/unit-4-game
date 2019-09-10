$(document).ready(function () {

    let fighters = {
                
        "obi": {
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 16
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

    // This dynamically creates boxes with each assigned to a character by
    // looping through the fighters in the object. Object.keys(fighters) 
    // returns an array of
    for (let fighter of Object.keys(fighters)) {

        let character = $("<div>");
        character.addClass("player character charHov");
        character.attr("data-name", fighter);
        character.text(fighter);
        $("#players").append(character);
        console.log(fighters[fighter]);
        console.log(fighter + " has " + fighters[fighter].healthPoints + " HP");
    }
    // console.log(fighters."skywalker".healthPoints) is incorrect syntax
    // and it's the reason that fighters.fighter.healthPoints doesn't
    // work in the for loop.
    fighters.skywalker.healthPoints += 10;
    console.log(fighters.skywalker.healthPoints);
    

    // This lets you choose a player, and puts the rest of the players
    // into the enemy section
    $("#players").on("click", ".player", function () {

        $(".player").addClass("enemy");
        $("#attackers").append($(".enemy"));
        $("#players").append($(this));
        $(this).toggleClass("enemy player");
    })

    // This lets you choose an enemy to fight and puts your opponent 
    // into the attack div
    $("#attackers").on("click", ".enemy", function () {

        $(this).toggleClass("enemy dual");
        $("#attack").append($(this));
        // This changes enemies class so that you can't select more than
        // one opponent.
        $(".enemy").toggleClass("enemy bench")
    })

})

