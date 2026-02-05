import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hall } from '../types';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default Leaflet marker icons not showing in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker Icon to match brand
const createCustomIcon = () => {
    const iconMarkup = renderToStaticMarkup(
        <div className="relative">
            <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white shadow-lg flex items-center justify-center animate-bounce-slow">
                <MapPin size={16} color="white" fill="white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500 transform rotate-45 -z-10 translate-y-[-50%]"></div>
        </div>
    );

    return L.divIcon({
        html: iconMarkup,
        className: 'custom-marker-icon', // Need to reset default styles
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
    });
};

const customIcon = createCustomIcon();

interface MapProps {
    halls: Hall[];
}

const FitBounds: React.FC<{ halls: Hall[] }> = ({ halls }) => {
    const map = useMap();


    useEffect(() => {
        if (!halls || halls.length === 0) return;

        const bounds = L.latLngBounds(halls.map(h => [h.coordinates.lat, h.coordinates.lng]));

        const fitMap = () => {
            map.fitBounds(bounds, { padding: [50, 50] });
        };

        fitMap(); // Initial fit

        // Re-fit when popup resets/closes implies user is done interacting with specific pin
        map.on('popupclose', fitMap);

        return () => {
            map.off('popupclose', fitMap);
        };
    }, [halls, map]);

    return null;
};

const Map: React.FC<MapProps> = ({ halls }) => {
    return (
        <div className="w-full h-full relative z-0">
            {/* Height is controlled by parent */}
            <MapContainer
                center={[1.8667, 103.1167]} // Default center Batu Pahat
                zoom={10}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                touchZoom={false}
                zoomControl={false}
                dragging={false} // Disable dragging as per request? "cant zoom or unzoom, deafult zoom is cover and can sell all pin"
                className="w-full h-full rounded-[2.5rem] z-0"
                style={{ height: "100%", width: "100%", borderRadius: "2.5rem" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Light theme map
                />

                {halls.map(hall => (
                    <Marker
                        key={hall.id}
                        position={[hall.coordinates.lat, hall.coordinates.lng]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-serif font-bold text-gray-800">{hall.name}</h3>
                                <p className="text-xs text-gray-500 mb-2">{hall.location}</p>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${hall.coordinates.lat},${hall.coordinates.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-pink-500 text-xs font-bold hover:underline"
                                >
                                    View on Google Maps
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <FitBounds halls={halls} />
            </MapContainer>

            {/* Overlay to prevent interactions if map needs to be purely static, but user might want to click pins. 
          The MapContainer props disable zoom/drag, so pins are still clickable. */}
        </div>
    );
};

export default Map;
