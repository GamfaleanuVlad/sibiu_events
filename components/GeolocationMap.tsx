import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetina from "leaflet/dist/images/marker-icon-2x.png"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import Location from './Location';
import { LocationFull } from '~/types';
import axios from 'axios';


export interface GeolocationBiref {
    coordonates?: { lat: number | null, lng: number | null }
    setCoordonates?: (lat: number, lng: number) => void
}

const RegisteredLocations = ({locations} : {locations: LocationFull[]}) => {
    const Pin = L.icon({
        iconRetinaUrl: iconRetina.src,
        iconUrl: iconUrl.src,
        shadowUrl: iconShadow.src,
        iconAnchor: [12, 40]
    });

    return (
        <>
            {locations.map(location => (
                <Marker
                    key={location.id}
                    position={[location.lat, location.long]}
                    icon={Pin}
                >
                    <Popup maxHeight={300} minWidth={450}>
                        <Location location={location} />
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

const GeolocationMap = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [locations, setLocations] = useState<LocationFull[]>([])

    useEffect(() => {

        axios.post<{ locationsFull: LocationFull[] }>('/api/getLocations').then(res => {
            setLocations(res.data.locationsFull)
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
                        <RegisteredLocations locations={locations} />
                    </MapContainer>
                </>
            ) : (
                <p>Loading map...</p>
            )}
        </>
    );
};

export default GeolocationMap;