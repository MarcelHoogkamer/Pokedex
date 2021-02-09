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
                document.getElementById("id").innerHTML = "ID: " + id;
                document.getElementById("name").innerHTML = "NAME: " + name;

                let allMoves = pokemon.moves;

                document.getElementById("move1").innerHTML = allMoves[0].move.name;
                document.getElementById("move2").innerHTML = allMoves[1].move.name;
                document.getElementById("move3").innerHTML = allMoves[2].move.name;
                document.getElementById("move4").innerHTML = allMoves[3].move.name;
                
                // DISPLAY THE EVOLUTIONS
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

                                console.log(evolution, species)
                                if(evolution.chain.evolves_to.length == 1){
                                    one = ""+evolution.chain.species.url.replace('-species','')+"";
                                    console.log(evolution.chain.species.url);
                                    two = ""+evolution.chain.evolves_to[0].species.url.replace('-species','')+"";

                                    if(evolution.chain.evolves_to[0].evolves_to[0] != undefined){

                                        three = ""+evolution.chain.evolves_to[0].evolves_to[0].species.url.replace('-species','')+"";

                                        fetch(one)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(firstEvo) {
                                                evolution1.classList.remove("gone");
                                                evolution1.innerHTML = "<img src='"+firstEvo.sprites.front_default+"' id='evimg1'>";
                                            });

                                        fetch(two)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(secondEvo) {
                                                evolution2.classList.remove("gone");
                                                evolution2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"' id='evimg2'>";
                                            });

                                        fetch(three)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(thirdEvo) {
                                                evolution3.classList.remove("gone");
                                                evolution3.innerHTML = "<img src='"+thirdEvo.sprites.front_default+"' id='evimg3'>";
                                            });
                                    }
                                    else{
                                        fetch(one)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(firstEvo) {
                                                evolution1.classList.remove("gone");
                                                evolution1.innerHTML = "<img src='"+firstEvo.sprites.front_default+"' id='evimg1'>";

                                            });

                                        fetch(two)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(secondEvo) {
                                                evolution2.classList.remove("gone");
                                                evolution2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"' id='evimg2'>";

                                            });
                                        evolution3.innerHTML = "";
                                        evolution3.classList.add("gone");

                                    }
                                }
                                if(evolution.chain.evolves_to.length > 1){

                                    one = ""+evolution.chain.species.url.replace('-species','')+"";
                                    fetch(one)
                                        .then(function(response) {
                                            return response.json();
                                        })
                                        .then(function(firstEvo) {
                                            evolution1.classList.remove("gone");
                                            evolution1.innerHTML = "<img src='"+firstEvo.sprites.front_default+"' id='evimg1'>";
                                        });

                                    var i = Math.floor(Math.random() * (evolution.chain.evolves_to.length-1)) + 0;
                                    two = ""+evolution.chain.evolves_to[i].species.url.replace('-species','')+"";
                                    fetch(two)
                                        .then(function(response) {
                                            return response.json();
                                        })
                                        .then(function(secondEvo) {
                                            evolution2.classList.remove("gone");
                                            evolution2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"' id='evimg2'>";
                                        });

                                    slide = setInterval(function(){
                                        if(i < evolution.chain.evolves_to.length-1){
                                            i++;
                                        }
                                        else{
                                            i=0;
                                        }
                                        console.log(i);
                                        two = ""+evolution.chain.evolves_to[i].species.url.replace('-species','')+"";
                                        fetch(two)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(secondEvo) {
                                                evolution2.classList.remove("gone");
                                                evolution2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"' id='evimg2'>";
                                            });
                                    }, 1000);

                                    evolution3.innerHTML = "";
                                    evolution3.classList.add("gone");
                                }
                                else{
                                    evolution1.innerHTML = "";
                                    evolution1.classList.add("gone");
                                    evolution2.innerHTML = "";
                                    evolution2.classList.add("gone");
                                    evolution3.innerHTML = "";
                                    evolution3.classList.add("gone");
                                }
                            });
                    });

            });
    }

    slide = 0;

    document.getElementById("first").addEventListener("click", function() {
        clearInterval(slide);
        allEvolutions(one);
    });

    document.getElementById("second").addEventListener("click", function() {
        clearInterval(slide);
        allEvolutions(two);
    });

    document.getElementById("third").addEventListener("click", function() {
        clearInterval(slide);
        allEvolutions(three);
    });

    pressSearch.addEventListener("click", function() {
        clearInterval(slide);
        let search = "https://pokeapi.co/api/v2/pokemon/" + document.getElementById("search").value;
        allEvolutions(search.toLowerCase());
    });

    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            clearInterval(slide);
            let search = "https://pokeapi.co/api/v2/pokemon/" + document.getElementById("search").value;
            allEvolutions(search.toLowerCase());
        }
    });


    allEvolutions("https://pokeapi.co/api/v2/pokemon/1");


})();