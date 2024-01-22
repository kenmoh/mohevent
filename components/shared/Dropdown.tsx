import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ICategory } from "@/lib/mongodb/db/models/category.model";
import { startTransition, useState } from "react";
import { Input } from "../ui/input";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoty, setCategoty] = useState<string>("");

  const handleAddCategory = () => {
    console.log("first");
  };
  return (
    <div>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue
            placeholder="Category"
            className="text-white font-bold"
          />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 &&
            categories.map((catecory) => (
              <SelectItem
                value="light"
                key={catecory._id}
                className="text-gray-200"
              >
                {catecory.name}
              </SelectItem>
            ))}
          <AlertDialog>
            <AlertDialogTrigger className="flex w-full rounded-sm pl-8 py-3 text-blue-800 hover:text-blue-500">
              Open
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>New category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    value={categoty}
                    type="text"
                    placeholder="Catery Name"
                    onChange={(e) => setCategoty(e.target.value)}
                    className="ring-0 focus:outline-none focus:border-none"
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-red-400 text-red-700 hover:bg-red-300 hover:text-red-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-400 text-green-700 hover:bg-green-300 hover:text-hover-600"
                  onClick={() => startTransition(handleAddCategory)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
