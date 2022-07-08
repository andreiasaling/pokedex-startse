const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    const pokemonPromises = []

    for (let i = 1; i <= 151; i++) {
        pokemonPromises.push(
            fetch(getPokemonUrl(i)).then((response) => response.json())
        )        
    }

    Promise.all(pokemonPromises).then((pokemons) => {
        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name)

            accumulator += `
                            <li class="card ${types[0]}">
                            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                            <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/${pokemon.id}.png">
                            <p class="card-subtitle"> ${types.join(" | ")}</p>
                            <p class="card-subtitle"> Peso: ${pokemon.weight}</p>
                            <p class="card-subtitle"> Altura: ${pokemon.height}</p>
                            </li>`
            return accumulator
        },
        "")

        const ul = document.querySelector('[data="pokedex"]')
        ul.innerHTML = listPokemons
    })
}

fetchPokemon()