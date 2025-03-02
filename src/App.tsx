import { PokemonList } from "./presentation/pokemons/components/PokemonList"
import Layout from "./presentation/pokemons/layout/Layout"
import './styles.css'
function App() {

  return (
    <>
      <Layout>
        <PokemonList />
      </Layout>
    </>
  )
}

export default App
