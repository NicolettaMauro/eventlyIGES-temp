import Benchmark from "benchmark";

export function calculateDistanceOptimized(
  lat1: number, lon1: number, lat2: number, lon2: number
): number {
  const R = 6371;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const a = sinDLat * sinDLat +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            sinDLon * sinDLon;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const lat1 = 45.4642;
const lon1 = 9.19;
const lat2 = 41.9028;
const lon2 = 12.4964;

const suite = new Benchmark.Suite();

suite
  .add("calculateDistanceOptimized", function() {
    calculateDistanceOptimized(lat1, lon1, lat2, lon2);
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target));
  })
  .on("complete", function(this: any) {
    console.log("Benchmark completato");
    console.log("Migliore performance:", this.filter("fastest")[0].name);
  })
  .run({ async: true });
