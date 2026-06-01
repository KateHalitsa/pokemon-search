import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearSelectedItems } from "../../store/pokemonSlice";
import './SelectedItemsFlyout.css'


function SelectedItemsFlyout() {
  const dispatch = useAppDispatch();

  const selectedItems = useAppSelector(
    (state) => state.pokemon.selectedItems
  );
  function handleDownload() {
  const headers = [
    'Name',
    'Description',
    'Details URL',
  ];

  const rows = selectedItems.map((item) => [
    item.name,
    item.description,
    `/pokemon/${item.name}`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob(
    [csvContent],
    {
      type: 'text/csv;charset=utf-8;',
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement('a');

  link.href = url;

  link.download =
    `${selectedItems.length}_items.csv`;

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
        Selected items:
        {selectedItems.length}
      </p>

      <button className='unselect-btn' onClick={handleClear}>
        Unselect all
      </button>

      <button className='download-btn' onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}
export default SelectedItemsFlyout;