"use client";
import GoogleAddressSearch from "@/app/_Components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const coordinateHandler = async () => {
    setLoader(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();

    if (data) {
      setLoader(false);
      console.log("New Data Added", data);
      toast("New Record Added for Listing");
      router.replace('/edit-listing/'+data[0].id)
    }
    if (error) {
      setLoader(false);
      console.log("Failed To Add Record", error);
      toast("Failed to Add Address");
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-5 rounded-lg border shadow-md w-full flex flex-col gap-5">
          <h2 className="text-gray-500">Add Your Home for listing</h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loader}
            onClick={coordinateHandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
