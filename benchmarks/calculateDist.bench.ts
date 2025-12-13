import Benchmark from "benchmark";
import { calculateDistance } from "../lib/map";

const testCoords = [
  [45.4641, 9.1919, 48.8566, 2.3522], // Milano → Parigi
  [40.7128, -74.006, 34.0522, -118.2437],
  [35.6895, 139.6917, 37.7749, -122.4194],
];

const suite = new Benchmark.Suite();

suite.add("calculateDistance", () => {
  for (const [lat1, lon1, lat2, lon2] of testCoords) {
    calculateDistance(lat1, lon1, lat2, lon2);
  }
})
.on("cycle", (event: any) => console.log(String(event.target)))
.on("complete", function (this: any) {
  console.log("Benchmark completato");
})
.run({ async: false });
