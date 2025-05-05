import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { useMap } from '~/context/MapContext';

const TripsMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { map } = useMap();

  useEffect(() => {
    if (!mapRef.current) return;

    const view = new View({
      center: [0, 0],
      zoom: 2,
      maxZoom: 20,
    });

    const layer = new TileLayer({
      source: new XYZ({
        urls: [
          'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        ],
        attributions:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }),
      cacheSize: 256,
      preload: 2,
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [layer],
      view,
      maxTilesLoading: 32,
      controls: [],
      interactions: [],
    });

    setIsLoading(false);
    map.current = mapInstance.current;

    return () => {
      map.current = null;
      mapInstance.current?.setTarget(undefined);
    };
  }, [map]);

  return (
    <div className="relative w-full h-full group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse z-10">
          <p className="text-foreground">Loading map...</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />

      <div
        className="absolute bottom-0 left-0 w-full py-2 bg-background/60 text-center text-foreground text-sm pointer-events-none translate-y-10 transition-[opacity,transform] duration-300 ease-in-out group-hover:translate-y-0 group-hover:pointer-events-auto"
      >
        Click to view the boat live
      </div>
    </div>
  );
};

export default TripsMap;
