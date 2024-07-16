import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ProfileFormFieldProps<T extends FieldValues> {
  /**
   * The form control, which is provided by `useForm`.
   * @see https://react-hook-form.com/api/useform
   */
  control: Control<T>;
  /**
   * The name of the field, which should match the key in the form values.
   */
  name: Path<T>;
  /**
   * The label of the field.
   */
  label: string;
  /**
   * The placeholder of the field
   */
  placeholder: string;
  /**
   * The description of the field.
   */
  description: string;
  /**
   * The mode of the form.
   * @default 'edit'
   */
  mode?: 'edit' | 'view';
}

function ProfileFormField<T extends FieldValues>({
  control,
  name,
  label,
  mode = 'edit',
  placeholder,
  description,
}: ProfileFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {mode === 'view' ? (
              <div className="text-gray-700">{field.value}</div>
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {description && mode !== 'view' && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}

export default ProfileFormField;
