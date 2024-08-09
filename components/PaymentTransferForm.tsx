"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId, paymentTransferFormSchema } from "@/lib/utils";

import { Button } from "./ui/button";
import { Form } from "./ui/form";
import PaymentTransferCustomInputForm from "./PaymentTransferCustomInputForm";

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof paymentTransferFormSchema>>({
    resolver: zodResolver(paymentTransferFormSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data: z.infer<typeof paymentTransferFormSchema>) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.sharableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      // create transfer
      const transfer = await createTransfer(transferParams);

      // create transfer transaction
      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <PaymentTransferCustomInputForm
          name="senderBank"
          label="Select Source Bank"
          type="dropdown"
          control={form.control}
          accounts={accounts}
          setValue={form.setValue}
          description="Select the bank account you want to transfer funds from"
        />
        <PaymentTransferCustomInputForm
          name="name"
          label=" Transfer Note (Optional)"
          type="textarea"
          control={form.control}
          accounts={accounts}
          setValue={form.setValue}
          placeholder="Write a short note here"
          description="Please provide any additional information or instructions related to the transfer"
        />
        <div className="payment-transfer_form-details">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>
        <PaymentTransferCustomInputForm
          name="email"
          label="Recipient's Email Address"
          control={form.control}
          accounts={accounts}
          setValue={form.setValue}
          placeholder="ex: johndoe@gmail.com"
        />
        <PaymentTransferCustomInputForm
          name="sharableId"
          label="Receiver's Plaid Sharable Id"
          control={form.control}
          accounts={accounts}
          setValue={form.setValue}
          placeholder="Enter the public account number"
        />
        <PaymentTransferCustomInputForm
          name="amount"
          label="Amount"
          control={form.control}
          accounts={accounts}
          setValue={form.setValue}
          placeholder="ex: 5.00"
        />

        <div className="payment-transfer_btn-box">
          <Button
            type="submit"
            disabled={isLoading}
            className="payment-transfer_btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
