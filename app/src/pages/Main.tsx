import { useNavigate } from '@remix-run/react';
import { type Map as LeafletMap, type FeatureGroup as LeafletFeatureGroup } from 'leaflet';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom"
import { ClientOnly } from "remix-utils/client-only";
import capitals from '~capitals';
import Connections from '~components/Connections/index'
import Header from '~components/Header/index'
import Map from "~components/Map/index.client"
import MetaDescription from '~components/Meta/Description';
import MetaTitle from '~components/Meta/Title';
import BuyMeACoffee from '~components/Support/BuyMeACoffee';
import { MAX_ZOOM, MAX_VISIBLE_NODES, INITIAL_MAP_BOUNDS } from "~constants";
import useActiveWikivoyagePage from '~hooks/useActiveWikivoyagePage';
import useGeolocation from '~hooks/useGeolocation';
import useResetScrollPosition from "~hooks/useResetScrollPosition"
import { type NodeMap } from "~types";
import { getFormattedName } from '~utils';

type MainPageComponentProps = {
  activeId: string,
  nodes: NodeMap,
  isFreshSession: boolean
}

function App({ activeId, nodes, isFreshSession }: MainPageComponentProps) {
  useResetScrollPosition()
  const [hoverId, setHoverId] = useState<string | -1>(-1)
  const [mapBounds, setMapBounds] = useState(INITIAL_MAP_BOUNDS)
  const geolocation = useGeolocation()
  const navigate = useNavigate()

  const mapRef = useRef<LeafletMap>(null)
  const isMapZoomedIn = mapRef.current && mapRef.current.getZoom() > 5

  const featureGroupRef = useRef<LeafletFeatureGroup<any>>(null)

  const activeNode = nodes[activeId]
  const hoverNode = nodes[hoverId]

  const [sw_lng, sw_lat, ne_lng, ne_lat] = mapBounds
    .split(",")
    .map(Number.parseFloat)
  const visibleFocusNodeIds: Set<string> = activeNode
    ? new Set([activeId, ...activeNode.edges])
    : new Set()

  const otherNodesToShow = (isMapZoomedIn || !!activeId)
    ? [...capitals, ...Object.keys(nodes)]
    : [...capitals]

  const otherVisibleNodeIds = otherNodesToShow
    .filter(title => !visibleFocusNodeIds.has(title))
    .filter(title => {
      if (!nodes[title]) {
        return false
      }
      // Avoid rendering nodes that are out of view
      const { lat, lng } = nodes[title]
      return sw_lng < lng && ne_lng > lng && sw_lat < lat && ne_lat > lat
    })
  const allVisibleNodeIds = new Set(
    [...visibleFocusNodeIds, ...otherVisibleNodeIds]
      .slice(0, MAX_VISIBLE_NODES)
  )
  const visibleNodes = [...allVisibleNodeIds]
    .map(title => nodes[title])
    .filter(Boolean)

  const updateVisibleNodes = useCallback((map: LeafletMap) => {
    if (!map) return
    setMapBounds(map.getBounds().toBBoxString())
  }, [setMapBounds])

  const activeEdges = (activeNode?.edges || [])
    .filter(otherId => nodes[otherId])
    .map(otherId => ({
      origin: activeNode,
      destination: nodes[otherId]
    }))
  const inactiveEdges = (Object.values(visibleNodes) || [])
      .filter(({ title }) => title !== activeId)
      .map(({ title }) => {
          const node = nodes[title]
          return node.edges
            .filter(otherId => nodes[otherId])
            .map(otherId => {
              const otherNode = nodes[otherId]
              return {
                origin: node,
                destination: otherNode
              }
            })
      })
      .flat()
      .filter(({ origin, destination }) => {
        // only include edges between two visible markers
        return allVisibleNodeIds.has(origin.title) && allVisibleNodeIds.has(destination.title)
      })

    // Zoom active node and edges into view
    useEffect(() => {
      const map = mapRef.current
      if (!map) return

      // scroll to top to make header link visible
      window.scrollTo({ top: 0 });

      const bounds = featureGroupRef.current?.getBounds()
      if (bounds?.isValid()) {
        // zoom to fit connected nodes
        map.fitBounds(bounds, { padding: [50, 50], animate: true })
      } else {
        // zoom to fit singleton node
        if (!activeNode) return
        map.setView(activeNode, MAX_ZOOM, { animate: true })
      }
    }, [mapRef.current, activeNode])

    // Handle clicks on the geolocation button
    const centerMapOnGeolocation = () => {
      const map = mapRef.current
      if (!map) return

      if (!geolocation) return
      const { latitude, longitude } = geolocation

      map.setView([latitude, longitude], MAX_ZOOM, { animate: true })

      // Select nearest marker
      let closestNode = null
      let closestDistance = NaN
      for (const title in nodes) {
        const node = nodes[title]
        const distance = map.distance(node, { lat: latitude, lng: longitude })
        if (!(closestDistance < distance)) {
          closestNode = node
          closestDistance = distance
        }
      }
      const newActiveNodeId = closestNode ? closestNode.title: ""
    }

    return (
    <>
    <MetaTitle node={activeNode} />
    <MetaDescription node={activeNode} />
    <div className="App">
      <div style={{ height: '100%', maxHeight: '75svh', display: 'flex', flexDirection: 'column' }}>
        {
          <Header
            nodeTitle={activeId}
            node={activeNode}
            verbose={isFreshSession}
          />
        }
        <ClientOnly fallback={<p>fallback</p>}>

          {() =>
          <Map
            mapRef={mapRef}
            featureGroupRef={featureGroupRef}
            geolocation={geolocation}
            updateVisibleNodes={updateVisibleNodes}
            activeEdges={activeEdges}
            inactiveEdges={inactiveEdges}
            visibleNodes={visibleNodes}
            activeId={activeId}
            hoverId={hoverId}
            setActiveId={title => navigate(`/after/${getFormattedName(title)}`, { replace: true })}
            setHoverId={setHoverId}
            centerMapOnGeolocation={centerMapOnGeolocation}
            />
          }
        </ClientOnly>
      </div>
      <Connections
        verbose={isFreshSession}
        activeNode={activeNode}
        activeEdges={activeEdges}
        hoverNode={hoverNode}
        onMouseEnter={setHoverId}
        onMouseLeave={() => setHoverId(-1)}
        />
      <footer>
        <div className="links">
          <Link to="/settings">
            Settings
          </Link>
          <Link to="/about">
            About
          </Link>
        </div>
        <BuyMeACoffee />
      </footer>
    </div>
    </>
  );
}

export default App;
