 import {  useState } from "react";
 
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Tag,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { categoryOptions } from "../data";

 
 export  const CategoryCombobox = ({
  category,
  setCategory,
  isPending,
}: {
  category: string;
  setCategory: (value: string) => void;
  isPending: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const current = categoryOptions.find((c) => c.value === category);
  const CurrentIcon = current?.icon;

  const handleSelect = (value: string) => {
    setCategory(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={isPending}
            className={cn(
              "flex h-10 w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 text-[#FAFAFA] transition-colors hover:border-white/25 disabled:pointer-events-none disabled:opacity-50"
            )}
          />
        }
      >
        <span className="flex items-center gap-2 text-sm">
          {CurrentIcon ? (
            <CurrentIcon className="size-4 text-[#60A5FA]" />
          ) : (
            <Tag className="size-4 text-[#6B6B6B]" />
          )}
          {current?.label ?? (
            <span className="text-[#6B6B6B]">Select category</span>
          )}
        </span>
        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[--radix-popover-trigger-width] p-0 border border-white/10 bg-[#0C0C12] text-[#FAFAFA] shadow-2xl"
      >
        <Command
          className="bg-transparent"
          filter={(value, search) =>
            value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <CommandInput
            placeholder="Search categories..."
            className="text-[#FAFAFA] placeholder:text-[#6B6B6B]"
          />

          <CommandList className="max-h-[280px] overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-xs text-[#6B6B6B]">
              No category found.
            </CommandEmpty>
            <CommandGroup>
              {categoryOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = category === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer text-[#D8CFBC] data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-[#FAFAFA]"
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4 text-[#4ADE80]",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Icon className="mr-2 size-4 text-[#6B6B6B]" />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};