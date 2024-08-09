import { paymentTransferFormSchema } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  UseFormSetValue,
} from "react-hook-form";
import { z } from "zod";
import { BankDropdown } from "./BankDropdown";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface PaymentTransferCustomInputFormProps {
  name: FieldPath<z.infer<typeof paymentTransferFormSchema>>;
  label: string;
  type?: string;
  control: Control<z.infer<typeof paymentTransferFormSchema>>;
  accounts: Account[];
  setValue: UseFormSetValue<z.infer<typeof paymentTransferFormSchema>>;
  placeholder?: string;
  description?: string;
}
interface FromInputProps {
  type: string;
  field: ControllerRenderProps<
    {
      email: string;
      name: string;
      amount: string;
      senderBank: string;
      sharableId: string;
    },
    "email" | "name" | "amount" | "senderBank" | "sharableId"
  >;
  placeholder?: string;
}

const FormInput = ({ type, field, placeholder }: FromInputProps) => {
  if (type === "input") {
    return (
      <Input placeholder={placeholder} className="input-class" {...field} />
    );
  } else {
    return (
      <Textarea className="input-class" placeholder={placeholder} {...field} />
    );
  }
};

const PaymentTransferCustomInputForm = ({
  name,
  label,
  type,
  control,
  accounts,
  setValue,
  placeholder,
  description,
}: PaymentTransferCustomInputFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="border-t border-gray-200">
          <div className="payment-transfer_form-item pb-6 pt-5">
            <div className="payment-transfer_form-content">
              <FormLabel className="text-14 font-medium text-gray-700">
                {label}
              </FormLabel>
              <FormDescription className="text-12 font-normal text-gray-600">
                {description}
              </FormDescription>
            </div>
            <div className="flex w-full flex-col">
              <FormControl>
                {type === "dropdown" ? (
                  <BankDropdown
                    accounts={accounts}
                    setValue={setValue}
                    otherStyles="!w-full"
                  />
                ) : (
                  <FormInput
                    type={type || "input"}
                    field={field}
                    placeholder={placeholder}
                  />
                )}
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default PaymentTransferCustomInputForm;
