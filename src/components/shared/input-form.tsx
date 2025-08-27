import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface InputFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const InputForm = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  required = true,
}: InputFormProps<T>) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                required={required}
                className="placeholder:text-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputForm;
