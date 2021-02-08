(() => {
    let input = document.getElementById("search");
    let pressSearch = document.getElementById("goSearch");
    let evolve1 = document.getElementById("evolve1");
    let evolve2 = document.getElementById("evolve2");
    let evolve3 = document.getElementById("evolve3");
    let move1 = document.getElementById("move1");
    let move2 = document.getElementById("move2");
    let move3 = document.getElementById("move3");
    let move4 = document.getElementById("move4");

    function goEvolution(search){
        fetch(search)
            .then(function(response) {
                return response.json();
            })
            .then(function(pokemon) {

                let image = pokemon.sprites.front_default;
                id = parseInt(pokemon.id);
                let name = pokemon.forms[0].name;


                //IMAGE INTO DIV
                document.getElementById("image").innerHTML = "LOOKS LIKE: <img src='"+image+"'>";

                //ID NUMBER INTO DIV
                document.getElementById("id").innerHTML = "ID NUMBER:" + id;

                //NAME INTO DIV
                document.getElementById("name").innerHTML = "NAME:" + name.replace('-',' ');

                //PLACE MOVES INTO DIV

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
                                //if it evolves
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
                                                evolve1.classList.remove("gone");
                                                evolve1.innerHTML = "1ST: <img src='"+firstEvo.sprites.front_default+"'>";
                                            });

                                        fetch(two)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(secondEvo) {
                                                evolve2.classList.remove("gone");
                                                evolve2.innerHTML = "2ND + <img src='"+secondEvo.sprites.front_default+"'>";
                                            });

                                        fetch(three)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(thirdEvo) {
                                                evolve3.classList.remove("gone");
                                                evolve3.innerHTML = "3RD + <img src='"+thirdEvo.sprites.front_default+"'>";
                                            });
                                    }
                                    else{
                                        fetch(one)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(firstEvo) {
                                                evolve1.classList.remove("gone");
                                                evolve1.innerHTML = "1ST + <img src='"+firstEvo.sprites.front_default+"'>";

                                            });

                                        fetch(two)
                                            .then(function(response) {
                                                return response.json();
                                            })
                                            .then(function(secondEvo) {
                                                evolve2.classList.remove("gone");
                                                evolve2.innerHTML = "2ND + <img src='"+secondEvo.sprites.front_default+"'>";

                                            });
                                        evolve3.innerHTML = "";
                                        evolve3.classList.add("gone");

                                    }
                                }
                                if(evolution.chain.evolves_to.length > 1){
                                    //exceptions like eevee
                                    one = ""+evolution.chain.species.url.replace('-species','')+"";
                                    fetch(one)
                                        .then(function(response) {
                                            return response.json();
                                        })
                                        .then(function(firstEvo) {
                                            evolve1.classList.remove("gone");
                                            evolve1.innerHTML = "1ST + <img src='"+firstEvo.sprites.front_default+"'>";
                                        });

                                    var i = Math.floor(Math.random() * (evolution.chain.evolves_to.length-1)) + 0;
                                    two = ""+evolution.chain.evolves_to[i].species.url.replace('-species','')+"";
                                    fetch(two)
                                        .then(function(response) {
                                            return response.json();
                                        })
                                        .then(function(secondEvo) {
                                            evolve2.classList.remove("gone");
                                            evolve2.innerHTML = "2ND + <img src='"+secondEvo.sprites.front_default+"'>";
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
                                                evolve2.classList.remove("gone");
                                                evolve2.innerHTML = "2ND + <img src='"+secondEvo.sprites.front_default+"'>";
                                            });
                                    }, 1000);

                                    evolve3.innerHTML = "";
                                    evolve3.classList.add("gone");
                                }
                                else{
                                    evolve1.innerHTML = "";
                                    evolve1.classList.add("gone");
                                    evolve2.innerHTML = "";
                                    evolve2.classList.add("gone");
                                    evolve3.innerHTML = "";
                                    evolve3.classList.add("gone");
                                }
                            });
                    });

            });
    }

    slide = 0;

    document.getElementById("first").addEventListener("click", function() {
        //var one = ""+evolution.chain.species.url.replace('-species','')+"";
        clearInterval(slide);
        goEvolution(one);
    });

    //if second evolution

    document.getElementById("second").addEventListener("click", function() {
        clearInterval(slide);
        goEvolution(two);
    });

    //if third evolution

    document.getElementById("third").addEventListener("click", function() {
        clearInterval(slide);
        goEvolution(three);
    });

    pressSearch.addEventListener("click", function() {
        clearInterval(slide);
        let search = "https://pokeapi.co/api/v2/pokemon/" + document.getElementById("search").value;
        goEvolution(search.toLowerCase());
    });

    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            clearInterval(slide);
            let search = "https://pokeapi.co/api/v2/pokemon/" + document.getElementById("search").value;
            goEvolution(search.toLowerCase());
        }
    });


    goEvolution("https://pokeapi.co/api/v2/pokemon/1");


})();