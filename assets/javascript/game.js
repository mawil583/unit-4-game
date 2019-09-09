$(document).ready(function () {
    let characters = ["obi", "maul", "skywalker", "sidious"];

    // This dynamically creates boxes with each assigned to a character
    for (let i = 0; i < characters.length; i++) {
        let character = $("<div>");
        character.addClass("character");
        character.attr("data-name", characters[i]);
        character.text(characters[i]);
        $("#players").append(character);
    }

    // This lets you choose a player, and puts the rest of the players
    // into the enemy section
    $("#players").on("click", ".character", function () {
        
        $(".character").addClass("enemy");
        $("#attackers").append($(".enemy"));
        $("#players").append($(this));
        $(this).attr("class", "character");
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

