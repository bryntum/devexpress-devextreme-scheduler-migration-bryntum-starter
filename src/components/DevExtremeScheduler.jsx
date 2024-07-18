"use client";

import { handleErrors } from "@/utils";
import { Resource, Scheduler } from "devextreme-react/scheduler";
import CustomStore from "devextreme/data/custom_store";
import "devextreme/dist/css/dx.light.css";
import { useEffect, useState } from "react";

const currentDate = new Date(2024, 8, 2);
const views = ["timelineDay"];
const groups = ["ownerId"];

const appointmentsDataSource = new CustomStore({
  load: () => {
    return fetch("/api/load")
      .then(handleErrors)
      .then((response) => response.json())
      .catch(() => {
        throw "Network error";
      });
  },
  insert: (values) => {
    return fetch("/api/insert", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  update: (key, values) => {
    return fetch("/api/update" + "/" + encodeURIComponent(key.id), {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(handleErrors)
      .catch(() => {
        throw "Network error";
      });
  },

  remove: (key) => {
    return fetch("/api/remove" + "/" + encodeURIComponent(key.id), {
      method: "DELETE",
    })
      .then(handleErrors)
      .catch(() => {
        throw "Network error";
      });
  },
});

const DevExtremeScheduler = () => {
  const [resources, setResources] = useState(null);

  useEffect(() => {
    fetch("/api/load/resources")
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
      })
      .catch((error) => {
        console.error("Failed to load resources data:", error);
      });
  }, []);

  if (!resources) {
    return <div>Loading...</div>;
  }

  return (
    <Scheduler
      dataSource={appointmentsDataSource}
      views={views}
      timeZone="UTC"
      defaultCurrentView="timelineDay"
      defaultCurrentDate={currentDate}
      height={580}
      groups={groups}
      firstDayOfWeek={1}
      startDayHour={8}
      endDayHour={17}
    >
      <Resource
        fieldExpr="ownerId"
        allowMultiple={true}
        dataSource={resources}
        label="Owner"
        useColorAsDefault={true}
      />
    </Scheduler>
  );
};
export default DevExtremeScheduler;
