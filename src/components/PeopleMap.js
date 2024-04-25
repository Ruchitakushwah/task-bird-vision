import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapDialog = ({ open, onClose, person }) => {
  const mapContainerStyle = {
    width: "800px",
    height: "400px",
  };

  const center =
    person && person.lat && person.lng
      ? { lat: parseFloat(person.lat), lng: parseFloat(person.lng) }
      : { lat: 0, lng: 0 };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>View in Map</DialogTitle>
      <DialogContent>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            // address={person.area}
            center={center}
            zoom={person ? 10 : 2}
          >
            {person && <Marker position={center} title={person.name} />}
          </GoogleMap>
        </LoadScript>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;
