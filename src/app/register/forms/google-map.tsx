import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "210px",
};

// Define the type for the onAddressSelect function prop
interface AddressData {
  lat: number;
  lng: number;
  address: string;
}

const center = {
  lat: 24.7136, // Latitude for Riyadh, Saudi Arabia
  lng: 46.6753, // Longitude for Riyadh, Saudi Arabia
};

interface MapComponentProps {
  currentAddress: { lat: number; lng: number };
  onAddressSelect?: (addressData: AddressData) => void; // Optional callback prop
}

export default function MapComponent({ currentAddress, onAddressSelect }: MapComponentProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"], // Add 'places' library for autocomplete
  });

  // Define state for selected marker
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    currentAddress
  );

  // Handle map click
  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelected({ lat, lng });

      // Optional: Use Geocoding API for the address
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const address =
            data.results[0]?.formatted_address || "Address not found";
          if (onAddressSelect) {
            onAddressSelect({ lat, lng, address });
          }
        });
    },
    [onAddressSelect]
  );

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={currentAddress}
      onClick={onMapClick}
    >
      {selected && (
        <Marker position={{ lat: selected.lat, lng: selected.lng }} />
      )}
    </GoogleMap>
  );
}
