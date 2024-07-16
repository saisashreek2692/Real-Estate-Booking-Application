"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function EditListing({params}) {

    //const params = usePathname();
    const {user} = useUser();
    const router = useRouter();

    useEffect(() => {
        // console.log(params.split('/')[2]);
        user && verifyUserRecord();
    }, [user]);

    const verifyUserRecord = async () => {
        const { data, error } = await supabase
        .from('listing')
        .select('*')
        .eq('createdBy', user?.primaryEmailAddress.emailAddress)
        .eq('id', params.id)

        if (data?.length <= 0) {
            router.replace('/')
        }

    }

    const onSubmitHandler = async (formValue) => {
        
        const { data, error } = await supabase
        .from('listing')
        .update(formValue)
        .eq('id', params.id)
        .select()

        if (data) {
            console.log(data);
            toast("Listing Updated Successfully")
        }
        
    }

  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-medium text-2xl">
        Enter more infomation about listing.
      </h2>
      <div className="p-8 rounded-lg shadow-md">
        <Formik
          initialValues={{
            type: "",
            propertyType: "",
            bedroom: "",
            bathroom: "",
            builtIn: "",
            parking: "",
            lotSize: "",
            area: "",
            price: "",
            hoa: "",
            description: "",
          }}
          onSubmit={(values) => {
            console.log(values)
            onSubmitHandler(values)
        }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                    <RadioGroup defaultValue="Rent" onValueChange={(v) => values.type=v}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rent" id="Rent" />
                        <Label htmlFor="Rent">Rent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sell" id="Sell" />
                        <Label htmlFor="Sell">Sell</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Property Type</h2>
                    <Select onValueChange={(e) => values.propertyType=e}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Family House">
                          Single Family House
                        </SelectItem>
                        <SelectItem value="Town House">Town House</SelectItem>
                        <SelectItem value="Duplex">Duplex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Bedroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="bedroom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Bathroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="bathroom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Built In</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900 Sq.Ft"
                      name="builtIn"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Parking</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      name="parking"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Lot Size(sq.Ft)</h2>
                    <Input
                      type="number"
                      placeholder=""
                      name="lotSize"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Area(Sq.Ft)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900"
                      name="area"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Selling Price($)</h2>
                    <Input
                      type="number"
                      placeholder="40000"
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">HOA (Per Month)($)</h2>
                    <Input
                      type="number"
                      min="1900"
                      max="2100"
                      placeholder="100"
                      name="hoa"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-slate-500">Description</h2>
                    <Textarea
                      placeholder="Add Home Description......"
                      name="description"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-7 justify-end">
                    <Button
                      variant="outline"
                      className="text-primary border-primary hover:text-primary"
                    >
                      Save
                    </Button>
                    <Button>Save & Publish</Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditListing;
