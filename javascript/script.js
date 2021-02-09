(() => {

    let input = document.getElementById("search");
    let pressSearch = document.getElementById("pressSearch");
    let evolution1 = document.getElementById("first");
    let evolution2 = document.getElementById("second");
    let evolution3 = document.getElementById("third");
    let move1 = document.getElementById("move1");
    let move2 = document.getElementById("move2");
    let move3 = document.getElementById("move3");
    let move4 = document.getElementById("move4");

    function allEvolutions(search){
        fetch(search)
            .then(function(response) {
                return response.json();
            })
            .then(function(pokemon) {

                let image = pokemon.sprites.front_default;
                let id = parseInt(pokemon.id);
                let name = pokemon.forms[0].name;

                document.getElementById("pokemon-img").innerHTML = "<img src='"+image+"' id='mainimg'>";
                document.getElementById("id").innerText = "ID: " + id;
                document.getElementById("name").innerText= "NAME: " + name;

                let allMoves = pokemon.moves;

                document.getElementById("move1").innerText = allMoves[0].move.name;
                document.getElementById("move2").innerText = allMoves[1].move.name;
                document.getElementById("move3").innerText = allMoves[2].move.name;
                document.getElementById("move4").innerText = allMoves[3].move.name;

                fetch(pokemon.species.url)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(species) {
                        fetch(species.evolution_chain.url)
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(evolution) {

                                if(evolution.chain.evolves_to.length === 1) {
                                    one = "" + evolution.chain.species.url.replace('-species', '') + "";
                                    two = "" + evolution.chain.evolves_to[0].species.url.replace('-species', '') + "";
                                    three = "" + evolution.chain.evolves_to[0].species.url.replace('-species', '') + "";

                                    fetch(one)
                                        .then(function (response) {
                                            return response.json();
                                        })
                                        .then(function (firstEvo) {
                                            evolution1.innerHTML = "<img src='" + firstEvo.sprites.front_default + "' id='evimg1'>";
                                        });

                                    fetch(two)
                                        .then(function (response) {
                                            return response.json();
                                        })
                                        .then(function (secondEvo) {
                                            evolution2.innerHTML = "<img src='" + secondEvo.sprites.front_default + "' id='evimg2'>";
                                        });

                                    fetch(three)
                                        .then(function (response) {
                                            return response.json();
                                        })
                                        .then(function (thirdEvo) {
                                            evolution3.innerHTML = "<img src='" + thirdEvo.sprites.front_default + "' id='evimg3'>";
                                        });
                                }
                            });
                    });
            });
        }


    document.getElementById("first").addEventListener("click", function() {
        allEvolutions(one);
    });

    document.getElementById("second").addEventListener("click", function() {
        allEvolutions(two);
    });

    document.getElementById("third").addEventListener("click", function() {
        allEvolutions(three);
    });

    pressSearch.addEventListener("click", function() {
        let search = "https://pokeapi.co/api/v2/pokemon/" + input.value;
        allEvolutions(search.toLowerCase());
    });


    allEvolutions("https://pokeapi.co/api/v2/pokemon/1");


})();