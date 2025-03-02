import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginatedReponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";



export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
    try {
        const url = `/pokemon?offset=${page * 10}&limit=${limit}`
        const { data } = await pokeApi.get<PokeAPIPaginatedReponse>(url)
        const pokemonPromises = data.results.map((info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url)
        });
        
        const pokeApiPokemons = await Promise.all(pokemonPromises);
        
        const pokemonsPromises = pokeApiPokemons.map(item =>
            PokemonMapper.pokeApiPokemonToEntity(item.data),
            );
            
        const pokemons = await Promise.all(pokemonsPromises);
        return pokemons;
    } catch (error) {
        throw new Error('error getting pokemons')
    }
}