"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import debounce from "lodash/debounce";

interface ItemOption {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  _uid?: string;
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

  //  Debounced search function usando useRef como en tu ejemplo
  const debouncedFetch = useRef(
    debounce(async (term: string) => {
      if (term.length < 3) return;

      try {
        const res = await axiosInstance.get<ItemOption[]>(
          "/QuickBooks/Items/GetItemName"
        );

        const filtered = res.data.filter((item) =>
          item.name.toLowerCase().includes(term.toLowerCase())
        );

        setResults(filtered);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    }, 500)
  ).current;

  const handleAddItem = () => {
    if (selectedItem && quantity > 0) {
      setSelectedItems((prev) => [
        ...prev,
        { ...selectedItem, quantity, _uid: uuidv4() },
      ]);
      setSelectedItem(null);
      setQuery("");
      setQuantity(1);
      setResults([]);
    }
  };

  const handleDeleteItem = (uid: string) => {
    setSelectedItems((prev) => prev.filter((i) => i._uid !== uid));
  };

  useEffect(() => {
    const itemsWithUid = (initialItems ?? []).map((item) => ({
      ...item,
      _uid: item._uid ?? uuidv4(),
    }));
    setSelectedItems(itemsWithUid);
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
          <div className="flex flex-col flex-1">
            <legend className="fieldset-legend text-lg font-normal">
              Item:
            </legend>
            <div className="relative">
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
                <ul className="bg-base-100 w-full rounded-box shadow-md z-50 max-h-60 overflow-y-auto absolute  mt-1">
                  {results.map((item) => (
                    <li
                      key={item.id}
                      className="cursor-pointer text-sm block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedItem(item);
                        setQuery(item.name);
                        setResults([]);
                        setQuantity(1);
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="max-w-[100px]">
            <legend className="fieldset-legend text-lg font-normal">
              Cantidad:
            </legend>
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
                <tr key={item._uid} className="odd:bg-base-200">
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">
                    <ActionButton
                      icon={
                        <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Delete"
                      onClick={() => handleDeleteItem(item._uid!)}
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
