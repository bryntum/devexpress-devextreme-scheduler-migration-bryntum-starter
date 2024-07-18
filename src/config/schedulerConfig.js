const startDate = new Date(2024, 8, 2, 8);
const timeZoneOffset = startDate.getTimezoneOffset() / 60;

const schedulerConfig = {
  startDate: startDate,
  zoomOnMouseWheel: false,
  zoomOnTimeAxisDoubleClick: false,
  viewPreset: "hourAndDay",
  timeZone: "UTC",
  workingTime: {
    fromHour: 8,
    toHour: 17 - timeZoneOffset,
  },
  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      field: "name",
      width: 150,
      showImage: false,
    },
  ],
};

export { schedulerConfig };
