import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertCategoriesSchema } from "@/db/schema";
import { z } from "zod";
import { useNewCategory } from "../hooks/use-new-category";
import { useCreateCategory } from "../api/use-create-category";
import { CategoryForm } from "./category-form";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const mution = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mution.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New category</SheetTitle>
          <SheetDescription>
            Create a new category to track transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={false}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
