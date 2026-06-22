import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearSelectedItems } from "../../store/pokemonSlice";
import './SelectedItemsFlyout.css'


function SelectedItemsFlyout() {
  const dispatch = useAppDispatch();
  const t = useTranslations("Selecte");
  
  const selectedItems = useAppSelector(
    (state) => state.pokemon.selectedItems
  );
  async function handleDownload() {
  const response = await fetch("/api/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(selectedItems)
  });

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${selectedItems.length}_items.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

  if (selectedItems.length === 0) {
    return null;
  }

  function handleClear() {
    dispatch(clearSelectedItems());
  }
  

  return (
    <div className="flyout">
      <p>
        {t("items")}:
        {selectedItems.length}
      </p>

      <button className='unselect-btn' onClick={handleClear}>
       {t("all")}
         </button>

      <button className='download-btn' onClick={handleDownload}>
           {t("download")}
      </button>
    </div>
  );
}
export default SelectedItemsFlyout;