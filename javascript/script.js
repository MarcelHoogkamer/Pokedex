(() => {

    document.getElementById("search").addEventListener("click", function () {

        let input = document.querySelector("input").value;

        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => response.json())
            .then(data => {

                let pokemons = data.pokemons;

                let findPokemon = parseInt(document.getElementById("input").value);
                let result = pokemons.find(pokemon => pokemon.id === findPokemon || pokemon => pokemon.name === findPokemon);

                let template = document.getElementById("pokedex-tpl").content.cloneNode(true);
                let target = document.getElementById("target");

                template.querySelector("name").innerText = result.name;
                template.querySelector("id").innerText = result.id;
                template.querySelector("abilities").innerText = result.abilities;
                template.querySelector("moves").innerText = result.moves;
                template.querySelector("image").innerText = result.i;

                target.appendChild(template);
            })
            .catch(onerror => console.error("Error, no valid ID or name"))
    })

})();


//         let template = document.getElementById("pokedex-tpl");
//         let clone = template.content.cloneNode(true);
//
//         let name = clone.querySelector(".name");
//         name.innerText = pokemon.name;
//
//         let id = clone.querySelector(".id");
//         id.innerText = pokemon.id;
//
//         let abilities = clone.querySelector(".abilities");
//         abilities.innerText = pokemon.abilities.join(", ");
//
//         document.getElementById("target").appendChild(clone);
//     })
// })