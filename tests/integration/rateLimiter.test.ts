import request from "supertest";
import app from "../../src/app";

describe("Rate Limiter Test", () => {
  const API_ENDPOINT = "/api/some-endpoint"; // Change this to your actual API route
  const TOTAL_REQUESTS = 500;

  it("should block requests after exceeding the rate limit", async () => {
    let blockedRequests = 0;
    let successRequests = 0;

    for (let i = 0; i < TOTAL_REQUESTS; i++) {
      const response = await request(app).get(API_ENDPOINT);

    //   expect(res.statusCode).toBe(200);
    // expect(res.body).toEqual({ status: "ok" });
      
      if (response.status === 429) {
        blockedRequests++;
      } else {
        successRequests++;
      }
    }

    console.log(`Total Blocked Requests: ${blockedRequests}`);
    console.log(`Total Successful Requests: ${successRequests}`);

    expect(blockedRequests).toBeGreaterThan(0);
  }, 60000); // Setting higher timeout to handle multiple requests
});
