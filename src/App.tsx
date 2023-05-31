import { Box, Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { getCities, getTrains } from "./axios/axios";
import { TrainsList } from "./components/TrainsList";
function App() {
  const [cities, setCities] = useState<any>([]);
  const [from, setFrom] = useState<any | null>("Choose the city of departure");
  const [inputFromValue, setInputFromValue] = useState("");
  const [to, setTo] = useState<any | null>("Choose the city of arrival");
  const [inputToValue, setInputToValue] = useState("");
  const [trains, setTrains] = useState([]);
  const [trainDisplayDaysCount] = useState<number>(7);

  const fetchAllCity = async () => {
    const tmpCities = await getCities();

    const cities = tmpCities.map(
      ({ name, id }: { name: string; id: number }) => {
        return { label: name, id };
      }
    );
    setCities(cities);
  };
  const fetchAllTrains = async () => {
    if (!(from.id && to.id)) return;
    const trains = await getTrains({ fromId: from.id, toId: to.id });
    setTrains(trains);
  };
  useEffect(() => {
    fetchAllCity();
  }, []);
  return (
    <Box className="App">
      <Box sx={{ display: "flex" }}>
        <Autocomplete
          value={from}
          onChange={(event: any, newValue: string | null) => {
            setFrom(newValue);
          }}
          inputValue={inputFromValue}
          onInputChange={(event, newInputValue) => {
            setInputFromValue(newInputValue);
          }}
          id="from"
          options={cities}
          sx={{ width: 360 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <Autocomplete
          value={to}
          onChange={(event: any, newValue: string | null) => {
            setTo(newValue);
          }}
          inputValue={inputToValue}
          onInputChange={(event, newInputValue) => {
            setInputToValue(newInputValue);
          }}
          id="to"
          options={cities}
          sx={{ width: 360 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <Button onClick={fetchAllTrains}>Submit</Button>
      </Box>
      <TrainsList
        items={[...trains]}
        trainDisplayDaysCount={trainDisplayDaysCount}
      />
    </Box>
  );
}

export default App;
