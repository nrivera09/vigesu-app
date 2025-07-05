import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { IoMdClose } from "react-icons/io";
import debounce from "lodash/debounce";

interface ItemOption {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

interface ModalUsingItemProps {
  onClose: () => void;
  onSave: (items: ItemOption[]) => void;
  initialItems?: ItemOption[];
}

const ModalUsingItem = ({
  onClose,
  onSave,
  initialItems,
}: ModalUsingItemProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ItemOption[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemOption[]>([]);

  const [selectedItem, setSelectedItem] = useState<ItemOption | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🔍 función para buscar coincidencias
  const fetchItems = async (term: string) => {
    if (term.length < 3) return;
    try {
      const res = await fetch(
        "https://ronnyruiz-001-site1.qtempurl.com/api/QuickBooks/Items/GetItemName"
      );
      const data = await res.json();
      const filtered = data.filter((item: ItemOption) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );

      setResults(filtered);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchItems, 300), []);

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      setSelectedItems((prev) => [...prev, { ...selectedItem, quantity }]);
      setSelectedItem(null);
      setQuery("");
      setQuantity(1);
      setResults([]);
    }
  };

  const handleDeleteItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  useEffect(() => {
    setSelectedItems(initialItems ?? []);
  }, [initialItems]);

  useEffect(() => {
    if (query.length >= 3) {
      debouncedFetch(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedFetch]);

  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-2xl">
        {/* Input y cantidad */}
        <div className="mb-3 flex flex-row gap-4 items-center justify-center">
          <div className="relative flex-1">
            <label>Item:</label>
            <input
              type="search"
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedItem(null);
              }}
              className="input input-lg text-lg w-full"
            />
            {results.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full bg-white border shadow rounded max-h-40 overflow-y-auto">
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-2 text-sm hover:bg-base-200 cursor-pointer"
                    onClick={() => {
                      setSelectedItem(item);
                      setQuery(item.name);
                      setResults([]);
                      setQuantity(1);
                    }}
                  >
                    {item.name} — ${item.unitPrice}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="max-w-[100px]">
            <label>Cantidad:</label>
            <input
              type="number"
              className="input input-lg text-lg w-full"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
            />
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="btn bg-black text-white rounded-full font-bold text-2xl"
              onClick={handleAddItem}
              disabled={!selectedItem}
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* Tabla de ítems */}
        <div className="mb-3 mt-5">
          <table className="table table-fixed w-full">
            <thead>
              <tr>
                <th className="w-[40%] text-center">Item</th>
                <th className="w-[40%] text-center">Cantidad</th>
                <th className="w-[20%] text-center"></th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item.id} className="odd:bg-base-200">
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">
                    <ActionButton
                      icon={
                        <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Delete"
                      onClick={() => handleDeleteItem(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones de acción */}
        <div className="modal-action flex items-center justify-between">
          <button type="button" className="btn" onClick={onClose}>
            <IoMdClose className="w-[20px] h-[20px] opacity-70" /> Cancelar
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => onSave(selectedItems)}
          >
            <AiOutlineSave className="w-[20px] h-[20px] opacity-70" />
            Guardar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalUsingItem;
