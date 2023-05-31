import { Box } from "@mui/material";

interface ITrainsList {
  items: any[];
  trainDisplayDaysCount: number;
}
export const TrainsList: React.FC<ITrainsList> = ({
  items = [],
  trainDisplayDaysCount = 7,
}) => {
  return (
    <>
      {items?.map((elem: any) => {
        const timeOfDeparting = new Date(elem.timeOfDeparting).toUTCString();
        const SECONDS_IN_A_DAY = (3600 * 3600 * 24) / 4;
        const timelimit = Date.now() + trainDisplayDaysCount * SECONDS_IN_A_DAY;
        if (
          Date.parse(timeOfDeparting) < Date.now() ||
          timelimit < Date.parse(timeOfDeparting)
        ) {
          return null;
        }
        return (
          <Box sx={{ display: "flex", gap: "16px" }}>
            <div>{elem.id}</div>
            <div>from:</div>
            <div>{elem.from.name}</div>
            <div>to</div>
            <div>{elem.to.name}</div>
            <div>Time Of Departing:</div>
            <div>{timeOfDeparting}</div>
          </Box>
        );
      })}
    </>
  );
};
