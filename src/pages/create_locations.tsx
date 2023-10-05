// import React, { useState } from 'react';
// import { FormControl, InputLabel, TextField, Button } from '@mui/material';

// interface LocationData {
//   name: string;
//   address: string;
//   lat: number;
//   long: number;
//   image: string;
// }

// interface LocationFormProps {
//   onLocationAdded: (locationData: LocationData) => void;
// }

// const LocationForm: React.FC<LocationFormProps> = ({ onLocationAdded }) => {
//   const [newLocation, setNewLocation] = useState<LocationData>({
//     name: '',
//     address: '',
//     lat: 0,
//     long: 0,
//     image: '',
//   });

//   const handleFieldChange = (fieldName: keyof LocationData) => (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setNewLocation({ ...newLocation, [fieldName]: event.target.value });
//   };

//   const handleAddLocation = () => {
//     onLocationAdded(newLocation);
//     setNewLocation({
//       name: '',
//       address: '',
//       lat: 0,
//       long: 0,
//       image: '',
//     });
//   };

//   return (
//     <div>
//       <FormControl fullWidth>
//         <InputLabel>Location Name</InputLabel>
//         <TextField
//           value={newLocation.name}
//           onChange={handleFieldChange('name')}
//         />
//       </FormControl>
//       <FormControl fullWidth>
//         <InputLabel>Address</InputLabel>
//         <TextField
//           value={newLocation.address}
//           onChange={handleFieldChange('address')}
//         />
//       </FormControl>
//       <FormControl fullWidth>
//         <InputLabel>Latitude</InputLabel>
//         <TextField
//           type="number"
//           value={newLocation.lat}
//           onChange={handleFieldChange('lat')}
//         />
//       </FormControl>
//       <FormControl fullWidth>
//         <InputLabel>Longitude</InputLabel>
//         <TextField
//           type="number"
//           value={newLocation.long}
//           onChange={handleFieldChange('long')}
//         />
//       </FormControl>
//       <FormControl fullWidth>
//         <InputLabel>Image URL</InputLabel>
//         <TextField
//           value={newLocation.image}
//           onChange={handleFieldChange('image')}
//         />
//       </FormControl>
//       <Button variant="contained" color="primary" onClick={handleAddLocation}>
//         Add Location
//       </Button>
//     </div>
//   );
// };

// //export default LocationForm;

// //import React, { useState } from 'react';
// //import ReactDOM from 'react-dom';
// //import LocationForm from './LocationForm';

// const App: React.FC = () => {
//   const [locations, setLocations] = useState<LocationData[]>([]);

//   const handleLocationAdded = (locationData: LocationData) => {
//     // Here, you can call your API to create a location
//     // For the sake of this example, we'll simply add it to the list
//     setLocations([...locations, locationData]);
//   };

//   return (
//     <div>
//       <h1>Add Locations</h1>
//       <LocationForm onLocationAdded={handleLocationAdded} />
//       <h2>Locations:</h2>
//       <ul>
//         {locations.map((locationData, index) => (
//           <li key={index}>
//             <strong>Name:</strong> {locationData.name}<br />
//             <strong>Address:</strong> {locationData.address}<br />
//             <strong>Latitude:</strong> {locationData.lat}<br />
//             <strong>Longitude:</strong> {locationData.long}<br />
//             <strong>Image URL:</strong> {locationData.image}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


