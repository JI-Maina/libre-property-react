import { Unit } from "@/types/property";
import UnitCard from "../../components/units/unit-card";
import { getUnit } from "@/lib/data-fetching/fetch-units";

type Params = {
  params: {
    unitId: string;
  };
};

const SingleUnit = async ({ params: { unitId } }: Params) => {
  const unitData: Promise<Unit> = getUnit(unitId);
  const unit = await unitData;

  return (
    <main>
      <section className="flex flex-col lg:flex-row gap-4 md:pt-4">
        <div className="flex-1 w-full md:max-w-[400px] md:mx-auto">
          <UnitCard unit={unit} />
        </div>

        {/* <div className="flex-1 w-full md:max-w-[400px] md:mx-auto">
          <Tabs defaultValue="payment" className=" ">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="payment">Make payment</TabsTrigger>
              <TabsTrigger value="maintenance">Create maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="payment">
              <UnitPaymentForm unit={unit} />
            </TabsContent>
            <TabsContent value="maintenance">
              <UnitMaintenanceForm unit={unit} />
            </TabsContent>
          </Tabs>
        </div> */}
      </section>
    </main>
  );
};

export default SingleUnit;
