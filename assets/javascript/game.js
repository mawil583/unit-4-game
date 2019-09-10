$(document).ready(function () {
    let fighters = [

        {
            name: "obi",
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 16
        },
        {
            name: "maul",
            healthPoints: 180,
            attackPower: 7,
            counterAttackPower: 14
        },
        {
            name: "skywalker",
            healthPoints: 100,
            attackPower: 6,
            counterAttackPower: 12,
        },
        {
            name: "sidious",
            healthPoints: 150,
            attackPower: 9,
            counterAttackPower: 18
        }
    ]
    
    let characters = ["obi", "maul", "skywalker", "sidious"];

    // This dynamically creates boxes with each assigned to a character
    for (let i = 0; i < characters.length; i++) {
        let character = $("<div>");
        character.addClass("player character");
        character.attr("data-name", characters[i]);
        character.text(characters[i]);
        $("#players").append(character);
    }

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

