"use client"
import { MapPin } from 'lucide-react';
import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

function GoogleAddressSearch({selectedAddress, setCoordinates}) {
  return (
    <div className='flex items-center w-full'>
        <MapPin className='h-10 w-10 p-2 text-primary bg-rose-200 rounded-l-lg' />
        <GooglePlacesAutocomplete 
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
                placeholder: "Search Your Property Address",
                isClearable: true,
                className: "w-full",
                onChange: (place) => {
                    console.log(place);
                    selectedAddress(place);
                    geocodeByAddress(place?.label)
                    .then(result => getLatLng(result[0]))
                    .then(({lat, lng}) => {
                        setCoordinates({lat, lng})
                    })
                }
            }}
        />
    </div>
  )
}

export default GoogleAddressSearch