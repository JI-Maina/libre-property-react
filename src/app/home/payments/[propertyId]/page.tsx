import { getServerSession } from "next-auth";

import { columns } from "../components/columns";
import { PaymentsTable } from "../components/payments-table";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type Props = {
  params: {
    propertyId: string;
  };
};

const getAllPayments = async (id: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `http://127.0.0.1:8000/property/properties/${id}/payments/`,
    {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch payments data");

  return res.json();
};

const PropertPaymentsPage = async ({ params: { propertyId } }: Props) => {
  const paymentData = getAllPayments(propertyId as string);
  const payments = await paymentData;

  console.log(payments);
  console.log(propertyId);

  return <PaymentsTable data={payments} columns={columns} />;
};

export default PropertPaymentsPage;