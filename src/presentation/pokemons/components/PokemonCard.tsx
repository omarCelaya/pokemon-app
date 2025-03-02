import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../../domain/entities/pokemon";
import pokeBall from "../../../assets/pokeball-light.png";
import { memo, useCallback, useMemo } from "react";

interface Props {
    pokemon: Pokemon;
}

const PokemonCard = memo(({ pokemon }: Props) => {
    const navigate = useNavigate();

    // Memoriza la navegación para evitar renders innecesarios
    const handleClick = useCallback(() => {
        navigate(`/pokemon/${pokemon.id}`);
    }, [navigate, pokemon.id]);

    // Memoriza el estilo para evitar cálculos innecesarios
    const backgroundStyle = useMemo(() => ({ backgroundColor: pokemon.color }), [pokemon.color]);

    return (
        <div
            className="relative flex flex-col items-start rounded-lg shadow-md p-6 sm:p-8 md:p-10 cursor-pointer
                       transition-transform transform hover:scale-[1.02] will-change-transform
                       overflow-hidden z-0 lg:mx-4 xl:mx-6 2xl:mx-8"
            style={backgroundStyle}
            onClick={handleClick}
            role="button"
            aria-label={`Ver detalles de ${pokemon.name}`}
        >
            {/* Nombre y Número */}
            <h2 className="text-white text-sm sm:text-base md:text-lg font-bold absolute top-2 left-2 capitalize">
                {pokemon.name} <br /> #{pokemon.id}
            </h2>

            {/* Fondo de Pokéball */}
            <div className="absolute inset-0 flex justify-center items-center opacity-30 lg:opacity-25">
                <img
                    src={pokeBall}
                    alt="pokeball"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rotate-[20deg] scale-110"
                    loading="lazy"
                />
            </div>

            {/* Imagen del Pokémon */}
            <img
                src={pokemon.avatar}
                alt={pokemon.name}
                className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 right-2 top-8 sm:top-4 md:top-[-5px]"
                loading="lazy"
            />

            {/* Tipo de Pokémon */}
            <p className="text-white mt-14 sm:mt-16 font-semibold text-sm sm:text-base">
                {pokemon.types[0]}
            </p>
        </div>
    );
});

export default PokemonCard;
