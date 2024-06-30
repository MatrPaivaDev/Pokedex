
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 300
const limit = 20
let offset = 0



function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}


// Adding one more item to the end of the existing list

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => {
        const newHtml = pokemonsList.map(pokemon => `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
        <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        
        <img src="${pokemon.photo}" 
        alt="${pokemon.name}">
        </div>
        </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qdtRecordNextPage = offset + limit

    if (qdtRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonsItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})