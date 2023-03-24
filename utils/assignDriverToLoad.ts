// if (referenceNumber) {
//     const resData = await fetch(`${loadResUrl}`, {
//       credentials: "include",
//       headers: {
//         Content_Type: "application/json",
//         Authorization: `${authToken()}`,
//       },
//     });

import { DriverRecord } from "../record/driver.record";
import { LoadRecord } from "../record/load.record";
import { DriverEntity } from "../types";
import { ValidationError } from "./errors";

//     const { loadList }: { loadList: LoadEntity[] } = await resData.json();

//     const loadForDriver = loadList.find(
//       (load) => load.referenceNumber === referenceNumber
//     );

//     console.log(loadForDriver);

//     setLoadInfo(loadForDriver);
//   }

export const assignDriverToLoads = async (newDriver: DriverRecord) => {
  const loadsList = await LoadRecord.listAll();

  const foundLoad = loadsList.find(
    (load) => (load.referenceNumber = newDriver.referenceNumber)
  );

  if (foundLoad.referenceNumber) {
    newDriver.loadId = foundLoad.id;
    return newDriver;
  } else {
    return null;
  }
};
