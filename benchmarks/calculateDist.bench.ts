import Benchmark from "benchmark";

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
  
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  }
const testCoords = [
  [45.4641, 9.1919, 48.8566, 2.3522],
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