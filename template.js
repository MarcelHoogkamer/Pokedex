getData().then((pokemons) => {

    pokemons.forEach(pokemon => {

        let template = document.getElementById("pokedex-tpl");
        let clone = template.content.cloneNode(true);

        let name = clone.querySelector(".name");
        name.innerText = pokemon.name;

        let id = clone.querySelector(".id");
        id.innerText = pokemon.id;

        let abilities = clone.querySelector(".abilities");
        abilities.innerText = pokemon.abilities.join(", ");

        document.getElementById("target").appendChild(clone);
    })
})