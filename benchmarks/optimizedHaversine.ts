import Benchmark from "benchmark";

export function haversineDistanceOptimized(
  lat1Rad: number, lon1Rad: number, lat2Rad: number, lon2Rad: number
): number {
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const a = sinDLat * sinDLat +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            sinDLon * sinDLon;

  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const lat1Rad = 45.4642 * (Math.PI / 180);
const lon1Rad = 9.19 * (Math.PI / 180);
const lat2Rad = 41.9028 * (Math.PI / 180);
const lon2Rad = 12.4964 * (Math.PI / 180);

const suite = new Benchmark.Suite();

suite
  .add("haversineDistanceOptimized", function() {
    haversineDistanceOptimized(lat1Rad, lon1Rad, lat2Rad, lon2Rad);
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target));
  })
  .on("complete", function(this: any) {
    console.log("Benchmark completato");
    console.log("Migliore performance:", this.filter("fastest")[0].name);
  })
  .run({ async: true });
