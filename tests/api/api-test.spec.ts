import { test, request, expect } from "@playwright/test";

var baseURL = "https://restful-booker.herokuapp.com/";
var apiAuth = "auth";
var apiBooking = "booking/";
var healthCheck = "ping";
var username = "admin";
var password = "password123";

var createBookingData = {
  firstname: "Jim",
  lastname: "Brown",
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: "2018-01-01",
    checkout: "2019-01-01",
  },
  additionalneeds: "Breakfast",
};

var dataToUpdatePartially = {
  firstname: "Francis",
  lastname: "Kowalski",
};

var dataToUpdate = {
  firstname: "Mister",
  lastname: "Smith",
  totalprice: 112,
  depositpaid: false,
  bookingdates: {
    checkin: "2021-01-01",
    checkout: "2020-01-01",
  },
  additionalneeds: "Lunch",
};

var data = {
  username: username,
  password: password,
};

const authHeader =
  "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

let apiToken;
let createdBookingId;

test.beforeAll(async () => {
  const context = await request.newContext();
  const response = await context.post(baseURL + apiAuth, { headers, data });
  expect(response.status()).toBe(200);
  const body = await response.json();
  apiToken = body.access_token;
  await context.dispose();
});

var headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Cookie: `token=${apiToken}`,
  Authorization: authHeader,
};

test.describe("api", () => {
  test("Health check", async ({ request }) => {
    const response = await request.get(baseURL + healthCheck, {
      headers
    });
    expect(response.status()).toBe(201);
    const text = await response.text();
    console.log("Response body:", text);
    expect(text).toContain("Created");
  });
});

test.describe("api", () => {
  test("Create a new booking", async ({ request }) => {
    const response = await request.post(baseURL + apiBooking, {
      headers,
      data: JSON.stringify(createBookingData),
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log("New Booking ID:", body.bookingid);
    console.log("Response body:", body);
    expect(body.bookingid).toBeDefined();
    expect(body.booking.firstname).toBe("Jim");
    expect(body.booking.lastname).toBe("Brown");
    expect(body.booking.totalprice).toBe(111);
    expect(body.booking.depositpaid).toBe(true);
    expect(body.booking.bookingdates.checkin).toBe("2018-01-01");
    expect(body.booking.bookingdates.checkout).toBe("2019-01-01");
    expect(body.booking.additionalneeds).toBe("Breakfast");
  });
});

test.describe("api", () => {
  test("Get booking details by booking id", async ({ request }) => {
    const response = await request.post(baseURL + apiBooking, {
      headers,
      data: JSON.stringify(createBookingData),
    });
    const body = await response.json();
    createdBookingId = body.bookingid;
    const bookingData = await request.get(
      baseURL + apiBooking + createdBookingId,
    );
    expect(bookingData.status()).toBe(200);
    const booking = await bookingData.json();
    console.log("Booking Data:", booking);
    expect(booking.firstname).toBe("Jim");
    expect(booking.lastname).toBe("Brown");
    expect(booking.totalprice).toBe(111);
    expect(booking.depositpaid).toBe(true);
    expect(booking.bookingdates.checkin).toBe("2018-01-01");
    expect(booking.bookingdates.checkout).toBe("2019-01-01");
    expect(booking.additionalneeds).toBe("Breakfast");
  });
});

test.describe("api", () => {
  test("Update the booking partially", async ({ request }) => {
    const response = await request.post(baseURL + apiBooking, {
      headers,
      data: JSON.stringify(createBookingData),
    });
    const body = await response.json();
    createdBookingId = body.bookingid;
    const updateResponse = await request.patch(
      baseURL + apiBooking + createdBookingId,
      {
        headers,
        data: JSON.stringify(dataToUpdatePartially),
      },
    );
    expect(updateResponse.status()).toBe(200);
    const updatedResponseBody = await updateResponse.json();
    console.log("Updated Booking Data:", updatedResponseBody);
    expect(updatedResponseBody.firstname).toBe("Francis");
    expect(updatedResponseBody.lastname).toBe("Kowalski");
  });
});

test.describe("api", () => {
  test("Update the booking full", async ({ request }) => {
    await request.post(baseURL + apiBooking, {
      headers,
      data: JSON.stringify(createBookingData),
    });
    const response = await request.put(
      baseURL + apiBooking + createdBookingId,
      {
        headers,
        data: JSON.stringify(dataToUpdate),
      },
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log("Updated Booking Data:", body);
    expect(body.firstname).toBe("Mister");
    expect(body.lastname).toBe("Smith");
    expect(body.totalprice).toBe(112);
    expect(body.depositpaid).toBe(false);
    expect(body.bookingdates.checkin).toBe("2021-01-01");
    expect(body.bookingdates.checkout).toBe("2020-01-01");
    expect(body.additionalneeds).toBe("Lunch");
  });
});

test.describe("api", () => {
  test("Delete the booking", async ({ request }) => {
    await request.post(baseURL + apiBooking, {
      headers,
      data: JSON.stringify(createBookingData),
    });
    const response = await request.delete(
      baseURL + apiBooking + createdBookingId,
      { headers },
    );
    expect(response.status()).toBe(201);
    const text = await response.text();
    console.log("Response body:", text);
    expect(text).toContain("Created");
  });
});

test.describe("api", () => {
  test("Get booking details after deletion", async ({ request }) => {
    const response = await request.get(baseURL + apiBooking + createdBookingId);
    expect(response.status()).toBe(404);
    const text = await response.text();
    console.log("Response body:", text);
    expect(text).toContain("Not Found");
  });
});

test.describe("api", () => {
  test("Get all bookings", async ({ request }) => {
    const response = await request.get(baseURL + apiBooking, { headers });
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    const exists = bookings.some((b) => b.bookingid === createdBookingId);
    expect(exists).toBe(false);
  });
});

test.describe("api", () => {
  test("Try to partially update boking with invalid id", async ({ request }) => {
    const invalidId = "99999999";
    const response = await request.patch(
      baseURL + apiBooking + invalidId,
      {
        headers,
        data: JSON.stringify(dataToUpdatePartially),
      });
    expect(response.status()).toBe(405);
    const text = await response.text();
    console.log("Response body:", text);
    expect(text).toContain("Method Not Allowed");
  });
});

test.describe("api", () => {
  test("Try to update boking with invalid id", async ({ request }) => {
    const invalidId = "99999999";
    const response = await request.put(
      baseURL + apiBooking + invalidId,
      {
        headers,
        data: JSON.stringify(dataToUpdate),
      });
    expect(response.status()).toBe(405);
    const text = await response.text();
    console.log("Response body:", text);
    expect(text).toContain("Method Not Allowed");
  });
});
