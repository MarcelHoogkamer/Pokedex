document.getElementById("run").addEventListener("click", async () => {
    let list = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151");
    let main = await list.json();
    console.log(main);

})
