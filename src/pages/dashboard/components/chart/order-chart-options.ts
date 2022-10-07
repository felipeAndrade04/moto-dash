import { ApexOptions } from "apexcharts";
import { getLastSixMonths, months, priceFormat } from "../../../../utils";

export const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: "#ccc",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
    formatter: (val) => priceFormat(Number(val) * 100),
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    type: "category",
    axisBorder: {
      color: "#ccc",
    },
    axisTicks: {
      color: "#ccc",
    },
    categories: getLastSixMonths().map((month) => months[month]),
  },
  yaxis: {
    labels: {
      formatter: (val) => priceFormat(Number(val) * 100),
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
  },
};
