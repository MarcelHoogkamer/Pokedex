document.getElementById("run").addEventListener("click", async () => {
    let list = await fetch(
        "https://unpkg.com/pokeapi-js-wrapper/dist/index.js");
    let main = await list.json();
    console.log(main);

})
const golduck = await P.getPokemonByName("golduck")
console.log(golduck)
})()

// or with Promises
P.getPokemonByName("eevee")
    .then(function(response) {
        console.log(response)
    })

P.resource([
    "/api/v2/pokemon/36",
    "api/v2/berry/8",
    "https://pokeapi.co/api/v2/ability/9/",
]).then( response => {
    console.log(response)
})