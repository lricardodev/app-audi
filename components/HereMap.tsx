"use client";

import React, { useEffect, useRef } from "react";
import H from "@here/maps-api-for-javascript";

interface HereMapProps {
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  theme?: "day" | "night";
}

export default function HereMap({ 
  apiKey, 
  center = { lat: 19.4326, lng: -99.1332 }, // Default: CDMX
  zoom = 14,
  theme = "day"
}: HereMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<H.Map | null>(null);
  const defaultLayersRef = useRef<any>(null); // Still need any for layers structure or find proper type

  useEffect(() => {
    if (!mapRef.current) return;
    
    // If map already exists, just change the layer if theme changes
    if (mapInstance.current && defaultLayersRef.current) {
      const layers = defaultLayersRef.current;
      if (theme === "night") {
        if (layers.vector.normal.mapnight) {
          mapInstance.current.setBaseLayer(layers.vector.normal.mapnight);
        } else {
          const baseLayer = mapInstance.current.getBaseLayer();
          const provider = baseLayer?.getProvider();
          if (provider instanceof H.map.provider.RemoteTileProvider) {
            const darkStyle = new (H.map as any).Style(
              'https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
              'https://js.api.here.com/v3/3.1/styles/omv/'
            );
            (provider as any).setStyle(darkStyle);
          }
        }
      } else {
        mapInstance.current.setBaseLayer(layers.vector.normal.map);
      }
      return;
    }

    const key = apiKey || process.env.NEXT_PUBLIC_HERE_MAPS_API_KEY || process.env.NEXT_PUBLIC_HERE_API_KEY || "";
    
    if (!key) {
      console.warn("HERE Maps API Key is missing. Map will not load.");
      return;
    }

    try {
      const platform = new H.service.Platform({
        apikey: key,
      });

      const defaultLayers = platform.createDefaultLayers() as any;
      defaultLayersRef.current = defaultLayers;
      
      // Determine base layer based on theme
      let baseLayer = defaultLayers.vector.normal.map;
      if (theme === "night" && defaultLayers.vector.normal.mapnight) {
        baseLayer = defaultLayers.vector.normal.mapnight;
      }

      const map = new H.Map(
        mapRef.current,
        baseLayer,
        {
          center,
          zoom,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );

      mapInstance.current = map;

      // Apply dark style if theme is night and mapnight wasn't available
      if (theme === "night" && !defaultLayers.vector.normal.mapnight) {
        const baseLayer = map.getBaseLayer();
        const provider = baseLayer?.getProvider();
        if (provider instanceof H.map.provider.RemoteTileProvider) {
          const darkStyle = new (H.map as any).Style(
            'https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
            'https://js.api.here.com/v3/3.1/styles/omv/'
          );
          (provider as any).setStyle(darkStyle);
        }
      }

      // Habilitar eventos de mapa (pan, zoom)
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Ajustar el mapa al cambiar el tamaño de la ventana
      const handleResize = () => map.getViewPort().resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        map.dispose();
        mapInstance.current = null;
      };
    } catch (error) {
      console.error("Error initializing HERE Map:", error);
    }
  }, [apiKey, center, zoom, theme]);

  return (
    <div className="absolute inset-0 z-0">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
