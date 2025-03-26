import React, { createContext, useContext, useRef } from 'react';
import type { Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Stroke, Circle as CircleStyle, Fill } from 'ol/style';
import { Coordinate } from 'ol/coordinate';
import { Live } from '~/types';
import { LineString } from 'ol/geom';

interface MapContextType {
  map: React.MutableRefObject<Map | null>;
  setCenter: (coords: [number, number]) => void;
  setZoom: (zoomLevel: number) => void;
  flyTo: (coords: [number, number], zoom?: number) => void;
  addWaypoints: (waypoints: Coordinate[], color: string) => void;
  removeWaypoints: () => void;
  updateLivePos: (live: Live) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const map = useRef<Map | null>(null);
  const waypointLayerRef = useRef<VectorLayer | null>(null);
  // New refs for live layer and its feature
  const liveLayerRef = useRef<VectorLayer | null>(null);
  const liveFeatureRef = useRef<Feature | null>(null);

  const setCenter = (coords: [number, number]) => {
    map.current?.getView().setCenter(fromLonLat(coords));
  };

  const setZoom = (zoomLevel: number) => {
    map.current?.getView().setZoom(zoomLevel);
  };

  const flyTo = (coords: [number, number], zoom?: number) => {
    const view = map.current?.getView();
    if (view) {
      const transformedCoords = fromLonLat(coords);
      view.animate({
        center: transformedCoords,
        zoom: zoom !== undefined ? zoom : view.getZoom(),
        duration: 500,
      });
    }
  };

  const addWaypoints = (waypoints: Coordinate[], color: string) => {
    if (!map.current) return;

    let vectorSource: VectorSource;

    if (!waypointLayerRef.current) {
      vectorSource = new VectorSource();
      const waypointLayer = new VectorLayer({
        source: vectorSource,
        updateWhileAnimating: true,
        updateWhileInteracting: true,
      });
      map.current.addLayer(waypointLayer);
      waypointLayerRef.current = waypointLayer;
    } else {
      vectorSource = waypointLayerRef.current.getSource() as VectorSource;
    }

    if (waypoints.length === 1) {
      const pointFeature = new Feature({
        geometry: new Point(waypoints[0]),
      });

      const pointStyle = new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: color }),
          stroke: new Stroke({ color: '#FFFFFF', width: 2 }),
        }),
      });

      pointFeature.setStyle(pointStyle);
      vectorSource.addFeature(pointFeature);
    } else if (waypoints.length > 1) {
      // Assuming you want a line for multiple waypoints
      const lineFeature = new Feature({
        geometry: new LineString(waypoints),
      });

      const lineStyle = new Style({
        stroke: new Stroke({
          color: color,
          width: 2,
        }),
      });

      lineFeature.setStyle(lineStyle);
      vectorSource.addFeature(lineFeature);
    }
  };

  const removeWaypoints = () => {
    if (map.current && waypointLayerRef.current) {
      map.current.removeLayer(waypointLayerRef.current);
      waypointLayerRef.current = null;
    }
  };

  const updateLivePos = (live: Live) => {
    if (!map.current) return;

    // Create the live layer if it doesn't exist yet
    if (!liveLayerRef.current) {
      const liveSource = new VectorSource();
      const liveLayer = new VectorLayer({
        source: liveSource,
        updateWhileAnimating: true,
        updateWhileInteracting: true,
      });
      liveLayer.setZIndex(1000);
      map.current.addLayer(liveLayer);
      liveLayerRef.current = liveLayer;
    }
    const liveSource = liveLayerRef.current.getSource() as VectorSource;
    // Transform the live coordinates (pass as [longitude, latitude])
    const transformedCoord = fromLonLat([live.longitude, live.latitude]);

    if (!liveFeatureRef.current) {
      // Create and add the live feature once
      const liveFeature = new Feature({
        geometry: new Point(transformedCoord),
      });

      const liveStyle = new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: '#c41c2d' }),
          stroke: new Stroke({
            color: '#1e2a2e',
            width: 2,
          }),
        }),
      });

      liveFeature.setStyle(liveStyle);
      liveSource.addFeature(liveFeature);
      liveFeatureRef.current = liveFeature;
    } else {
      liveFeatureRef.current.setGeometry(new Point(transformedCoord));
    }
  };

  return (
    <MapContext.Provider
      value={{ map, setCenter, setZoom, flyTo, addWaypoints, removeWaypoints, updateLivePos }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
