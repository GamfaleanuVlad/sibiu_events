import React, { useState, useEffect, useRef, createRef, Ref } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetina from "leaflet/dist/images/marker-icon-2x.png"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import Location from './Location';
import { LocationFull } from '~/types';
import axios from 'axios';


const RegisteredLocations = ({ map, locations, openPopup, showTypes }: { map: React.RefObject<L.Map>, locations: LocationFull[], showTypes?: boolean, openPopup: number }) => {
    const Pin = L.icon({
        iconRetinaUrl: iconRetina.src,
        iconUrl: iconUrl.src,
        shadowUrl: iconShadow.src,
        iconAnchor: [12, 40]
    });

    const popupRefs = useRef(locations.map(() => React.createRef<L.Popup>()));
    useEffect(() => {
        if (openPopup >= 0) {
            popupRefs.current[openPopup]?.current?.openOn(map!.current!)
        }
    }, [openPopup])

    return (
        <>
            {locations.map((location, index) => {
                return (
                    <Marker
                        key={location.id}
                        position={[location.lat, location.long]}
                        icon={Pin}
                    >
                        <Popup ref={popupRefs.current[index]} maxHeight={700} minWidth={450}>
                            <Location location={location} showTypes={showTypes} />
                        </Popup>
                    </Marker>
                )
            })
            }
        </>
    )
}


const CreationMap = ({ selectedLocationId, showTypes }: { selectedLocationId?: string, showTypes?: boolean }) => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(-1)
    const mapRef = useRef<L.Map>(null);

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


    useEffect(() => {
        if (selectedLocationId) {
            const locationIndex = locations.findIndex(l => l.id === selectedLocationId)
            if (locationIndex !== -1 && mapRef.current) {
                mapRef.current.flyTo([locations[locationIndex]!.lat + 0.02, locations[locationIndex]!.long], 13)
                setSelectedLocationIndex(locationIndex)
            }
        }
    }, [selectedLocationId])

    return (
        <>
            {latitude && longitude ? (
                <>
                    <MapContainer
                        ref={mapRef}
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
                        <RegisteredLocations
                            map={mapRef}
                            locations={locations}
                            showTypes={showTypes}
                            openPopup={selectedLocationIndex} />
                    </MapContainer>
                </>
            ) : (
                <p>Loading map...</p>
            )}
        </>
    );
};

export default CreationMap;