import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getPokemons } from "../../../actions/pokemons";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo, useCallback, lazy, Suspense } from "react";

const PokemonCard = lazy(() => import("./PokemonCard"));

export const PokemonList = () => {
  const queryClient = useQueryClient();

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", "infinite"],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async ({ pageParam }) => {
      const pokemons = await getPokemons(pageParam);
      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(["pokemon", pokemon.id], pokemon);
      });
      return { results: pokemons, nextPage: pageParam + 1 };
    },
    getNextPageParam: (lastPage) =>
      lastPage?.results.length ? lastPage.nextPage : undefined,
  });

  // 🔹 Memoizamos la lista de Pokémon para evitar cálculos innecesarios
  const uniquePokemons = useMemo(() => {
    if (!data) return [];
    return Array.from(
      new Map(
        data.pages.flatMap((page) =>
          page.results.map((pokemon) => [pokemon.id, pokemon])
        )
      ).values()
    );
  }, [data]);

  // 🔹 Memoizamos la función de carga de más datos
  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <Suspense fallback={<p className="text-center">Cargando Pokémon...</p>}>
      {/* Eliminamos el return temprano y manejamos el loading dentro del JSX */}
      <div className="pokemon-container">
        {isLoading && <h1>Cargando pokemons...</h1>}
        {!isLoading && (
          <InfiniteScroll
            dataLength={uniquePokemons.length}
            next={loadMore}
            hasMore={hasNextPage}
            loader={<p className="text-center">Cargando...</p>}
            scrollableTarget="scrollableDiv"
            className="grid grid-cols-2 gap-2"
          >
            {uniquePokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Suspense>
  );
};
