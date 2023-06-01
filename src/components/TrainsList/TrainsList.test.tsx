import { getByText, queryByText, render } from "@testing-library/react";
import { TrainsList } from "./TrainsList";

const trainsMock = [
  {
    id: 3,
    from: {
      name: "FromTestName1",
    },
    to: {
      name: "ToTestName1",
    },
    timeOfDeparting: "2023-06-06T23:43:30.000Z",
  },

  {
    id: 4,
    from: {
      name: "FromTestName2",
    },
    to: {
      name: "ToTestName2",
    },
    timeOfDeparting: "2023-06-04T23:43:30.000Z",
  },

  {
    id: 5,
    timeOfDeparting: "2023-06-07T23:43:30.000Z",
    from: {
      name: "FromTestName3",
    },
    to: {
      name: "ToTestName3",
    },
  },

  {
    id: 6,
    from: {
      name: "FromTestName4",
    },
    to: {
      name: "ToTestName4",
    },
    timeOfDeparting: "2023-06-10T23:43:30.000Z",
  },

  {
    id: 7,
    from: {
      name: "FromTestName5",
    },
    to: {
      name: "ToTestName5",
    },
    timeOfDeparting: "2023-06-03T23:43:30.000Z",
  },
];
describe("TrainList component", () => {
  const testId = "testIDlsaldladalsdlasl";
  let trainList: HTMLElement;
  const displayDays: number = 7;

  beforeEach(() => {
    const { getByTestId } = render(
      <TrainsList
        data-testid={testId}
        items={trainsMock}
        displayDays={displayDays}
      />
    );
    trainList = getByTestId(testId);
  });

  it("should render", () => {
    expect(trainList).toBeInTheDocument();
  });

  it("should render the correct data", () => {
    trainsMock.forEach((train) => {
      const trainIdElement = queryByText(trainList, train.id.toString());
      const fromElement = queryByText(trainList, train.from.name);
      const toElement = queryByText(trainList, train.to.name);
      const timeElement = queryByText(
        trainList,
        new Date(train.timeOfDeparting).toUTCString(),
        { exact: false }
      );
      // Перенести в утіліти
      const timeOfDeparting = new Date(train.timeOfDeparting).toUTCString();
      const SECONDS_IN_A_DAY = (3600 * 3600 * 24) / 4;
      const timelimit = Date.now() + displayDays * SECONDS_IN_A_DAY;
      if (
        Date.parse(timeOfDeparting) < Date.now() ||
        timelimit < Date.parse(timeOfDeparting)
      ) {
        expect(trainIdElement).toBeNull();
        expect(fromElement).toBeNull();
        expect(toElement).toBeNull();
        expect(timeElement).toBeNull();
        return;
      }
      expect(fromElement).toBeInTheDocument();
      expect(toElement).toBeInTheDocument();
      expect(timeElement).toBeInTheDocument();
      expect(trainIdElement).toBeInTheDocument();
    });
  });
});
