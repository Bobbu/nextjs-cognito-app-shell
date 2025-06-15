// ui/components/FormField.tsx
import { forwardRef, type ElementType, type InputHTMLAttributes } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  Icon: ElementType;
} & InputHTMLAttributes<HTMLInputElement>;

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, placeholder, Icon, ...props }, ref) => {
    const { name } = props;
   
    // If we do not get given a name field, formState gets nothing from the
    // fields, so we put this check in to minimize developer mistakes during dev
    // time.
    if (process.env.NODE_ENV !== "production" && !name) {
      console.warn(
        `[FormField] Missing 'name' prop for input with id="${id}". This may prevent form data from being submitted correctly.`
      );
    }
    
    return (
      <div>
        <label
          htmlFor={id}
          className="mb-1 block text-xs font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            placeholder={placeholder}
            className="peer block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 py-[9px] pl-10 text-sm text-black dark:text-white outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            {...props}
          />
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-white" />
        </div>
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
