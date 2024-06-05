// disgusting super component so that we can lazy load and make the website a tiny bit faster

// Hey I'm from the future. Maybe this can be less disgusting with remix now ... in the mix

import { type Map as LeafletMap, type FeatureGroup as LeafletFeatureGroup, LatLngTuple, Map } from 'leaflet';
import { type Ref } from "react"
import { MapContainer, FeatureGroup, Pane } from 'react-leaflet'
import 'leaflet-doubletapdrag'
import 'leaflet-doubletapdragzoom'
import DeviceGeolocation from "~components/Map/DeviceGeolocation/index"
import GeolocationButton from '~components/Map/GeolocationButton/index';
import MarkerSet from '~components/Map/MarkerSet/index'
import PolylineSet from '~components/Map/PolylineSet/index'
import Protomaps from '~components/Map/Protomaps/index'
import { MIN_ZOOM, MAX_ZOOM, MAX_BOUNDS } from "~constants";
import { type Position } from "~hooks/useGeolocation";
import { type Node } from "~types";

type MapComponentProps = {
    mapRef: Ref<LeafletMap>
    featureGroupRef: Ref<LeafletFeatureGroup<any>>
    geolocation: Position | undefined
    updateVisibleNodes: (map: LeafletMap) => void
    activeEdges: { origin: Node, destination: Node }[]
    inactiveEdges: { origin: Node, destination: Node }[]
    visibleNodes: Node[]
    activeId: string
    hoverId: string | -1
    setActiveId: (id: string) => void
    setHoverId: (id: string | -1) => void
    centerMapOnGeolocation: () => void
}

export default function (props: MapComponentProps) {
    const {
        mapRef,
        featureGroupRef,
        geolocation,
        updateVisibleNodes,
        activeEdges,
        inactiveEdges,
        visibleNodes,
        activeId,
        hoverId,
        setActiveId,
        setHoverId,
        centerMapOnGeolocation
    } = props

    return (
        // @ts-ignore: TS2322: Can't pass props doubleTapDragZoom, doubleTapDragZoomOptions
        <MapContainer id="map" ref={mapRef} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} maxBounds={MAX_BOUNDS} maxBoundsViscosity={1} doubleClickZoom={false} doubleTapDragZoom="center" doubleTapDragZoomOptions={{ reverse: true }}>
            <span className="loading">loading...</span>
            <Protomaps file="20230918-z12.pmtiles" onBoundsChange={updateVisibleNodes} />
            <Pane name="edges" style={{ zIndex: 600 }}>
            <PolylineSet edges={inactiveEdges} />
            <FeatureGroup ref={featureGroupRef}>
                <PolylineSet edges={activeEdges} active={true} />
            </FeatureGroup>
            </Pane>
            <Pane name="nodes" style={{ zIndex: 601 }}>
            <MarkerSet
                nodes={visibleNodes}
                activeId={activeId}
                hoverId={hoverId}
                onClick={setActiveId}
                onMouseOver={setHoverId}
                onMouseOut={() => setHoverId(-1)}
            />
            </Pane>
            <Pane name="geolocation">
            <DeviceGeolocation geolocation={geolocation} />
            </Pane>
            {geolocation && <GeolocationButton onClick={centerMapOnGeolocation} />}
      </MapContainer>
    )
}
