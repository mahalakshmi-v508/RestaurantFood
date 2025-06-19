
// import React, { useEffect, useState, useRef } from 'react';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const defaultCenter = {
//   lat: 8.9784,
//   lng: 77.4192
// };

// const MyMapComponent = () => {
//   const [currentLocation, setCurrentLocation] = useState(defaultCenter);
//   const [keyword, setKeyword] = useState('biryani');
//   const [restaurants, setRestaurants] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const location = {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude
//           };
//           console.log("Current Location:", currentLocation);

//              // 🟡 Alert with coordinates
//           alert(`📍 Your Location:\nLatitude: ${location.lat}\nLongitude: ${location.lng}`);
//           setCurrentLocation(location);
//           fetchRestaurants(location); // Fetch restaurants when location is obtained
//         },
//         () => {
//           alert('Could not get location. Using default.');
//           fetchRestaurants(defaultCenter); // Fetch restaurants at default location
//         }
//       );
//     }
//   }, []);
//   useEffect(() => {
//   if (mapRef.current) {
//     mapRef.current.panTo(currentLocation);
//   }
// }, [currentLocation]);
// useEffect(() => {
//   if (mapRef.current && currentLocation) {
//     mapRef.current.panTo(currentLocation);
//   }
// }, [currentLocation]);



//   const fetchRestaurants = (location) => {
//     if (!mapRef.current) return;

//     const service = new window.google.maps.places.PlacesService(mapRef.current);

//     const request = {
//       location: location,
//       radius: 5000,
//       keyword: keyword,
//       type: 'restaurant'
//     };

//     service.nearbySearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         setRestaurants(results);
//       } else {
//         alert('No results found.');
//         setRestaurants([]);
//       }
//     });
//   };

//   const handleMarkerClick = (place) => {
//     setSelectedPlace(place);
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyACI6AB352rfLKhI9GhPWi9kYdrhgC6o5M" libraries={['places']}>
//       <div style={{ padding: '10px' }}>
//         <h2>🔍 Find Nearby Restaurants</h2>

//         <input
//           type="text"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="Search food (e.g. biryani, kuruma)"
//           style={{ padding: '10px', width: '300px', marginRight: '10px' }}
//         />
//         <button onClick={() => fetchRestaurants(currentLocation)} style={{ padding: '10px' }}>
//           Search
//         </button>
//       </div>

//    <GoogleMap
//   mapContainerStyle={containerStyle}
//   center={currentLocation}
//   zoom={14}
//   onLoad={(map) => (mapRef.current = map)}
// >

//         <Marker position={currentLocation} />

//         {restaurants.map((place, index) => (
//           <Marker
//             key={index}
//             position={{
//               lat: place.geometry.location.lat(),
//               lng: place.geometry.location.lng()
//             }}
//             onClick={() => handleMarkerClick(place)}
//           />
//         ))}

//         {selectedPlace && (
//           <InfoWindow
//             position={{
//               lat: selectedPlace.geometry.location.lat(),
//               lng: selectedPlace.geometry.location.lng()
//             }}
//             onCloseClick={() => setSelectedPlace(null)}
//           >
//             <div>
//               <h4>{selectedPlace.name}</h4>
//               <p>{selectedPlace.vicinity}</p>
//               <p>⭐ Rating: {selectedPlace.rating ?? 'N/A'}</p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>

//       <div style={{ padding: '10px' }}>
//         <h3>🍽 {restaurants.length} results for: <strong>{keyword}</strong></h3>
//         {restaurants.map((place, index) => (
//           <div
//             key={index}
//             style={{
//               border: '1px solid #ddd',
//               padding: '10px',
//               marginBottom: '10px',
//               borderRadius: '8px'
//             }}
//           >
//             <h4>{place.name}</h4>
//             <p>{place.vicinity}</p>
//             <p>⭐ Rating: {place.rating ?? 'N/A'}</p>
//           </div>
//         ))}
//       </div>
//     </LoadScript>
//   );
// };

// export default MyMapComponent;
// import React, { useEffect, useState, useRef } from 'react';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const defaultCenter = {
//   lat: 13.0827, // Chennai fallback
//   lng: 80.2707
// };

// const MyMapComponent = () => {
//   const [currentLocation, setCurrentLocation] = useState(defaultCenter);
//   const [restaurants, setRestaurants] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const mapRef = useRef(null);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   const locationLockedRef = useRef(false); // ✅ Lock to stop re-updating location

//   // Get user's current location only once
//   useEffect(() => {
//     if (navigator.geolocation && !locationLockedRef.current) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const location = {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude
//           };
//           setCurrentLocation(location);
//           locationLockedRef.current = true; // ✅ Lock after first fetch
//         },
//         () => {
//           setCurrentLocation(defaultCenter);
//           locationLockedRef.current = true;
//         }
//       );
//     }
//   }, []);

//   // Fetch restaurants after map loads
//   useEffect(() => {
//     if (mapLoaded && mapRef.current && currentLocation) {
//       fetchRestaurants(currentLocation);

//       // ✅ panTo only once
//       if (!locationLockedRef.current) {
//         mapRef.current.panTo(currentLocation);
//       }
//     }
//   }, [mapLoaded]);

//   const fetchRestaurants = (location) => {
//     if (!mapRef.current) return;

//     const service = new window.google.maps.places.PlacesService(mapRef.current);

//     const request = {
//       location: location,
//       radius: 5000,
//       type: 'restaurant'
//     };

//     service.nearbySearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         setRestaurants(results);
//       } else {
//         setRestaurants([]);
//       }
//     });
//   };

//   const handleMarkerClick = (place) => {
//     setSelectedPlace(place);
//   };

//   return (
//     <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
//       <div style={{ padding: '10px' }}>
//         <h2>🔍 Find Nearby Restaurants</h2>
//       </div>

//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={currentLocation}
//         zoom={15}
//         onLoad={(map) => {
//           mapRef.current = map;
//           setMapLoaded(true);
//         }}
//       >
//         {/* Current Location Marker */}
//         <Marker
//           position={currentLocation}
//           icon={{
//             url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
//           }}
//         />

//         {/* Restaurant Markers */}
//         {restaurants.map((place, index) => (
//           <Marker
//             key={index}
//             position={{
//               lat: place.geometry.location.lat(),
//               lng: place.geometry.location.lng()
//             }}
//             onClick={() => handleMarkerClick(place)}
//             icon={{
//               url: "https://maps.google.com/mapfiles/ms/icons/restaurant.png",
//               scaledSize: new window.google.maps.Size(40, 40)
//             }}
//           />
//         ))}

//         {/* InfoWindow */}
//         {selectedPlace && (
//           <InfoWindow
//             position={{
//               lat: selectedPlace.geometry.location.lat(),
//               lng: selectedPlace.geometry.location.lng()
//             }}
//             onCloseClick={() => setSelectedPlace(null)}
//           >
//             <div>
//               <h4>{selectedPlace.name}</h4>
//               <p>{selectedPlace.vicinity}</p>
//               <p>⭐ Rating: {selectedPlace.rating ?? 'N/A'}</p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>

//       <div style={{ padding: '10px' }}>
//         <h3>🍽 {restaurants.length} restaurants found near you</h3>
//         {restaurants.map((place, index) => (
//           <div
//             key={index}
//             style={{
//               border: '1px solid #ddd',
//               padding: '10px',
//               marginBottom: '10px',
//               borderRadius: '8px'
//             }}
//           >
//             <h4>{place.name}</h4>
//             <p>{place.vicinity}</p>
//             <p>⭐ Rating: {place.rating ?? 'N/A'}</p>
//           </div>
//         ))}
//       </div>
//     </LoadScript>
//   );
// };

// export default MyMapComponent;
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

const MyMapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 13.0827, lng: 80.2707 });
  const [restaurants, setRestaurants] = useState([]);

  // Blue icon for user
  const userIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconSize: [30, 30],
  });

  // Red icon for restaurants
  const redIcon = new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [30, 30],
  });

  // Get user current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(coords);
        fetchRestaurants(coords);
      },
      () => {
        fetchRestaurants(currentLocation); // fallback to default
      }
    );
  }, []);

  // Fetch restaurants using Overpass API
  const fetchRestaurants = async ({ lat, lng }) => {
    const radius = 1000; // meters
    const query = `
      [out:json];
      (
        node["amenity"="restaurant"](around:${radius},${lat},${lng});
        way["amenity"="restaurant"](around:${radius},${lat},${lng});
        relation["amenity"="restaurant"](around:${radius},${lat},${lng});
      );
      out center;
    `;

    try {
      const res = await axios.post('https://overpass-api.de/api/interpreter', query, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const places = res.data.elements.map((el) => ({
        id: el.id,
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
        name: el.tags.name || 'Unnamed Restaurant',
      }));

      setRestaurants(places);
    } catch (err) {
      console.error('Failed to load restaurants:', err);
    }
  };

  // Auto map center
  const ChangeMapView = ({ center }) => {
    const map = useMap();
    map.setView(center, 16);
    return null;
  };

  return (
    <div>
      <h2 style={{ padding: '10px' }}>🍽 Restaurants Near You</h2>

      <MapContainer center={currentLocation} zoom={15} style={{ height: '400px', width: '100%' }}>
        <ChangeMapView center={currentLocation} />
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User marker */}
        <Marker position={currentLocation} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Restaurant markers */}
        {restaurants.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lon]} icon={redIcon}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ padding: '10px' }}>
        <h3>📍 {restaurants.length} restaurants found</h3>
        {restaurants.map((place) => (
          <div key={place.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '5px 0', borderRadius: '8px' }}>
            <h4>{place.name}</h4>
            <p>Latitude: {place.lat}</p>
            <p>Longitude: {place.lon}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMapComponent;
