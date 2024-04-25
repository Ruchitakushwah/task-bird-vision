import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import AddPersonDialog from "./AddNewPersonDialog";
import MapDialog from "./PeopleMap";

const PeopleList = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpenMap, setIsDialogOpenMap] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/static/people.json")
        .then((response) => response.json())
        .then((data) => {
          setPeople(data);
          setFilteredPeople(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [isAuthenticated]);

  const handleAddPerson = (newPerson) => {
    const updatedPeople = [...people, newPerson];
    localStorage.setItem("people", JSON.stringify(updatedPeople));
    setPeople(updatedPeople);
    setFilteredPeople(updatedPeople);
  };

  const handleViewMap = (person) => {
    setSelectedPerson(person);
    setIsDialogOpenMap(true);
  };

  const handleAreaChange = (event) => {
    const area = event.target.value;
    setSelectedArea(area);
    if (area === "") {
      setFilteredPeople(people);
    } else {
      const filtered = people.filter((person) => person.area === area);
      setFilteredPeople(filtered);
    }
  };

  const areas = [
    { value: "", label: "All Areas" },
    { value: "Dalarna", label: "Dalarna" },
    { value: "Halland", label: "Halland" },
    { value: "Malmo", label: "Malmo" },
    { value: "Solna", label: "Solna" },
    { value: "Uppsala", label: "Uppsala" },
    { value: "Gotland", label: "Gotland" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {isAuthenticated && (
        <div>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel>Filter by Area</InputLabel>
            <Select value={selectedArea} onChange={handleAreaChange}>
              {areas.map((area) => (
                <MenuItem key={area.value} value={area.value}>
                  {area.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Area
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPeople.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{person.area}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleViewMap(person)}
                      >
                        View in Map
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDialogOpen(true)}
            >
              Add New Person
            </Button>
          </div>

          <AddPersonDialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onAddPerson={handleAddPerson}
          />
          <MapDialog
            open={isDialogOpenMap}
            onClose={() => setIsDialogOpenMap(false)}
            people={people}
            person={selectedPerson}
          />
        </div>
      )}
    </div>
  );
};

export default PeopleList;
