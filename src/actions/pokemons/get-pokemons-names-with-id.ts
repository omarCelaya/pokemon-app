import { pokeApi } from "../../config/api/pokeApi"
import { PokeAPIPaginatedReponse } from "../../infrastructure/interfaces/pokeapi.interfaces";


export const getPokemonNamesWithId = async () => {

    const url = `pokemon?limit=1304`

    const { data } = await pokeApi.get<PokeAPIPaginatedReponse>(url);

    return data.results.map(pokemon => ({ id: Number(pokemon.url.split('/')[6]), name: pokemon.name }))
}