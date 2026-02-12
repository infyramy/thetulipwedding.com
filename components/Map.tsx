import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Hall } from '../types';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Dynamically import Leaflet CSS to ensure it loads properly
const loadLeafletCSS = () => {
    if (typeof window !== 'undefined' && !document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
    }
};

// Fix for default Leaflet marker icons not showing in React
let DefaultIcon: L.Icon | null = null;

const initializeDefaultIcon = () => {
    if (typeof window !== 'undefined' && !DefaultIcon) {
        try {
            DefaultIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            L.Marker.prototype.options.icon = DefaultIcon;
        } catch (err) {
            console.error('Error initializing Leaflet icon:', err);
        }
    }
};

// Custom Marker Icon to match brand
const createCustomIcon = () => {
    const iconMarkup = renderToStaticMarkup(
        <div className="relative">
            <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white shadow-lg flex items-center justify-center">
                <MapPin size={16} color="white" fill="white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500 transform rotate-45 -z-10 translate-y-[-50%]"></div>
        </div>
    );

    return L.divIcon({
        html: iconMarkup,
        className: 'custom-marker-icon',
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
    });
};

interface MapProps {
    halls: Hall[];
}

const FitBounds: React.FC<{ halls: Hall[] }> = ({ halls }) => {
    const map = useMap();

    useEffect(() => {
        if (!halls || halls.length === 0) return;

        const bounds = L.latLngBounds(halls.map(h => [h.coordinates.lat, h.coordinates.lng]));

        const fitMap = () => {
            // Invalidate size to ensure map renders correctly
            map.invalidateSize();
            map.fitBounds(bounds, { padding: [50, 50] });
        };

        // Small delay to ensure container is rendered
        const timer = setTimeout(fitMap, 100);

        map.on('popupclose', fitMap);

        return () => {
            clearTimeout(timer);
            map.off('popupclose', fitMap);
        };
    }, [halls, map]);

    return null;
};

const Map: React.FC<MapProps> = ({ halls }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            loadLeafletCSS();
            initializeDefaultIcon();
            setIsLoaded(true);
        } catch (err) {
            console.error('Error loading map:', err);
            setError('Failed to load map');
        }
    }, []);

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-[2.5rem]">
                <div className="text-center p-8">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 font-medium">Map tidak dapat dimuatkan</p>
                    <p className="text-gray-400 text-sm mt-2">Sila refresh halaman atau hubungi kami</p>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-[2.5rem]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative z-0" style={{ minHeight: '384px' }}>
            <MapContainer
                center={[1.8667, 103.1167]}
                zoom={11}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                touchZoom={false}
                zoomControl={true}
                dragging={true}
                className="w-full h-full rounded-[2.5rem] z-0"
                style={{ height: "100%", width: "100%", minHeight: '384px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {halls.map(hall => (
                    <Marker
                        key={hall.id}
                        position={[hall.coordinates.lat, hall.coordinates.lng]}
                        icon={createCustomIcon()}
                    >
                        <Popup>
                            <div className="text-center p-2">
                                <h3 className="font-serif font-bold text-gray-800 mb-1">{hall.name}</h3>
                                <p className="text-xs text-gray-500 mb-2">{hall.location}</p>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${hall.coordinates.lat},${hall.coordinates.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-pink-500 text-xs font-bold hover:underline inline-block mt-2"
                                >
                                    View on Google Maps →
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <FitBounds halls={halls} />
            </MapContainer>
        </div>
    );
};

export default Map;
