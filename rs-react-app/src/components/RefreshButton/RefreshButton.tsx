import { useSelector } from "react-redux";
import {  useRefreshPokemonMutation } from "../api/pokemonApi";
import type {  RootState } from "../../store/store";
import "./RefreshButton.css"
import { useTranslations } from "next-intl";

function RefreshButton(){
const [refreshPokemon, { isLoading }] =
  useRefreshPokemonMutation();
  const t = useTranslations("Refresh");
  
  const {
  lastSearch
} = useSelector(
  (state: RootState) => state.pokemon
);
  async function handleRefresh() {
   await refreshPokemon(lastSearch);
}
return(
<button onClick={handleRefresh} disabled={isLoading} className="refresh-btn">
  {t("title")}
</button>
)
}
export default RefreshButton;


