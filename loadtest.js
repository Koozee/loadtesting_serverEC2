import http from "k6/http";
import { check } from "k6";

// Test configuration
export const options = {
  thresholds: {
    // Tidak menambahkan batasan pada durasi untuk memastikan overload.
    http_req_failed: ["rate<0.1"], // Kurangi persentase kegagalan untuk memastikan terus mencoba meskipun ada kegagalan.
  },
  stages: [
    { duration: "30s", target: 100 }, // Naik ke 100 virtual users
    { duration: "1m", target: 200 }, // Stabil di 200 virtual users
    { duration: "30s", target: 0 }, // Turun kembali ke 0 virtual users
  ],
};

// Simulated user behavior
export default function () {
  let res = http.get("http://54.209.25.161/"); // Masukkan IP atau URL server EC2
  check(res, { "status was 200": (r) => r.status === 200 });
}

