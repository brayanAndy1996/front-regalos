'use client';

import { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useAppDispatch } from "@/lib/hooks";
import { setClasification } from "@/lib/filters";

interface ValueItem {
  key: string;
  label: string;
}

const valuesItems: ValueItem[] = [
  { key: "a-z", label: "Alfabeticamente de A - Z" },
  { key: "z-a", label: "Alfabeticamente de Z - A" },
  { key: "-+", label: "De menor a mayor precio" },
  { key: "+-", label: "De mayor a menor precio" },
];

const SelectClasificar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Set<string>>(new Set(["a-z"])); 

  useEffect(() => {
    const clasificacion = Array.from(value)
    dispatch(setClasification({ clasification: clasificacion[0]}));
  }, [value]);

  return (
    <div>
      <p className="font-bold">Clasificar por</p>
      <Select
        variant="underlined"
        className="max-w-xs"
        color="primary"
        aria-label="Clasificar por"
        placeholder="Eliga su clasificación"
        selectedKeys={value}
        onSelectionChange={(keys) => setValue(new Set(keys as any))} 
      >
        {valuesItems.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectClasificar;
