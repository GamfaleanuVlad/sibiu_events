import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetina from "leaflet/dist/images/marker-icon-2x.png"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import Location from './Location';
import { LocationWithTypes } from '~/types';
import axios from 'axios';


export interface GeolocationBiref {
    coordonates?: { lat: number | null, lng: number | null }
    setCoordonates?: (lat: number, lng: number) => void
}


const Pin = L.icon({
    iconRetinaUrl: iconRetina.src,
    iconUrl: iconUrl.src,
    shadowUrl: iconShadow.src,
    iconAnchor: [12, 40]
});

const GeolocationMap = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [locations, setLocations] = useState<LocationWithTypes[]>([])

    useEffect(() => {

        axios.post<{ locationsWithTypes: LocationWithTypes[] }>('/api/getLocations').then(res => {
            setLocations(res.data.locationsWithTypes)
        })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const LocationPicker = () => {
        const markers = locations.map(location => ({
            id: location.id,
            lat: location.lat,
            lng: location.long,
            title: location.name
        }))


        return (

            <>
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={[marker.lat.toNumber(), marker.lng.toNumber()]}
                        icon={Pin}
                    >
                        <Popup maxHeight={300} minWidth={450}>
                            <Location id={marker.id} />
                        </Popup>
                    </Marker>
                ))}
            </>
        )
    }

    return (
        <>
            {latitude && longitude ? (
                <>
                    <MapContainer
                        center={[latitude, longitude]}
                        zoom={13}
                        scrollWheelZoom
                        dragging
                        doubleClickZoom={false}
                        style={{ height: '100%', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationPicker />
                    </MapContainer>
                </>
            ) : (
                <p>Loading map...</p>
            )}
        </>
    );
};

export default GeolocationMap;