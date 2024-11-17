import request from "supertest";
import app from "../src/app";

describe("POST /api/submission/{questionId}", () => {
	it("should post a submission for SST question", async () => {
		const response = await request(app)
			.post("/api/submission/1")
			.send({ text: "Answer" })
			.set("Accept", "application/json");

		expect(response.status).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Answer submitted successfully.");
	});

	it("should post a submission for RO question", async () => {
		const response = await request(app)
			.post("/api/submission/2")
			.send({ list: [1, 2, 3] })
			.set("Accept", "application/json");

		expect(response.status).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Answer submitted successfully.");
	});

	it("should post a submission for RMMCQ question", async () => {
		const response = await request(app)
			.post("/api/submission/3")
			.send({ list: [1, 2, 3] })
			.set("Accept", "application/json");

		expect(response.status).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("Answer submitted successfully.");
	});

	it("should return 404 for a non-existent question ID", async () => {
		const response = await request(app)
			.post("/api/submission/999")
			.send({ text: "Answer" })
			.set("Accept", "application/json");

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("success", false);
		expect(response.body).toHaveProperty("message", "No question found!");
	});
});

describe("GET /api/submission/history}", () => {
	it("should return all submission histories", async () => {
		const response = await request(app).get("/api/submission/history");

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("submissions");
		expect(Array.isArray(response.body.data.submissions)).toBe(true);

		expect(response.body.data.submissions.length).toBeGreaterThan(0);

		const firstSubmission = response.body.data.submissions[0];
		expect(firstSubmission).toHaveProperty("id");
		expect(firstSubmission).toHaveProperty("title");
		expect(firstSubmission).toHaveProperty("type");
		expect(firstSubmission).toHaveProperty("questionId");

		const secondSubmission = response.body.data.submissions[1];
		expect(secondSubmission).toHaveProperty("id");
		expect(secondSubmission).toHaveProperty("title");
		expect(secondSubmission).toHaveProperty("type");
		expect(secondSubmission).toHaveProperty("questionId");

		const thirdSubmission = response.body.data.submissions[2];
		expect(thirdSubmission).toHaveProperty("id");
		expect(thirdSubmission).toHaveProperty("title");
		expect(thirdSubmission).toHaveProperty("type");
		expect(thirdSubmission).toHaveProperty("questionId");
	});

	it("should handle query parameter for SST question", async () => {
		const response = await request(app)
			.get("/api/submission/history")
			.query({ type: "SST" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("submissions");
		expect(Array.isArray(response.body.data.submissions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Submission history retrieved successfully."
		);

		expect(response.body.data.submissions.length).toBeGreaterThan(0);
		expect(response.body.data.submissions[0].title).toEqual(
			"Evolution of Medicare"
		);
		expect(response.body.data.submissions[0].type).toEqual("SST");
		expect(response.body.data.submissions[0].questionId).toEqual(1);
		expect(
			response.body.data.submissions[0].Score.content.score
		).toBeGreaterThanOrEqual(0);
		expect(
			response.body.data.submissions[0].Score.content.score
		).toBeLessThanOrEqual(2);
		expect(
			response.body.data.submissions[0].Score.content.maximumScore
		).toEqual(2);

		expect(
			response.body.data.submissions[0].Score.form.score
		).toBeGreaterThanOrEqual(0);
		expect(
			response.body.data.submissions[0].Score.form.score
		).toBeLessThanOrEqual(2);
		expect(
			response.body.data.submissions[0].Score.form.maximumScore
		).toEqual(2);

		expect(
			response.body.data.submissions[0].Score.grammar.score
		).toBeGreaterThanOrEqual(0);
		expect(
			response.body.data.submissions[0].Score.grammar.score
		).toBeLessThanOrEqual(2);
		expect(
			response.body.data.submissions[0].Score.grammar.maximumScore
		).toEqual(2);

		expect(
			response.body.data.submissions[0].Score.vocabulary.score
		).toBeGreaterThanOrEqual(0);
		expect(
			response.body.data.submissions[0].Score.vocabulary.score
		).toBeLessThanOrEqual(2);
		expect(
			response.body.data.submissions[0].Score.vocabulary.maximumScore
		).toEqual(2);

		expect(
			response.body.data.submissions[0].Score.spelling.score
		).toBeGreaterThanOrEqual(0);
		expect(
			response.body.data.submissions[0].Score.spelling.score
		).toBeLessThanOrEqual(2);
		expect(
			response.body.data.submissions[0].Score.spelling.maximumScore
		).toEqual(2);
	});

	it("should handle query parameter for RO question", async () => {
		const response = await request(app)
			.get("/api/submission/history")
			.query({ type: "RO" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("submissions");
		expect(Array.isArray(response.body.data.submissions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Submission history retrieved successfully."
		);

		expect(response.body.data.submissions.length).toBeGreaterThan(0);
		expect(response.body.data.submissions[0].title).toEqual(
			"Argument Analysis"
		);
		expect(response.body.data.submissions[0].type).toEqual("RO");
		expect(response.body.data.submissions[0].questionId).toEqual(2);
		expect(
			response.body.data.submissions[0].Score.score
		).toBeGreaterThanOrEqual(0);
		expect(
			response.body.data.submissions[0].Score.score
		).toBeLessThanOrEqual(10);
		expect(response.body.data.submissions[0].Score.maximumScore).toEqual(
			10
		);
	});

	it("should handle query parameter for RMMCQ question", async () => {
		const response = await request(app)
			.get("/api/submission/history")
			.query({ type: "RMMCQ" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("submissions");
		expect(Array.isArray(response.body.data.submissions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Submission history retrieved successfully."
		);

		expect(response.body.data.submissions.length).toBeGreaterThan(0);
		expect(response.body.data.submissions[0].title).toEqual(
			"Writing Technology"
		);
		expect(response.body.data.submissions[0].type).toEqual("RMMCQ");
		expect(response.body.data.submissions[0].questionId).toEqual(3);
		expect(
			response.body.data.submissions[0].Score.score
		).toBeGreaterThanOrEqual(0);
		expect(
			response.body.data.submissions[0].Score.score
		).toBeLessThanOrEqual(10);
		expect(response.body.data.submissions[0].Score.maximumScore).toEqual(
			10
		);
	});

	it("should handle paging model, page 1 limit 2", async () => {
		const response = await request(app)
			.get("/api/submission/history")
			.query({ page: "1", limit: "2" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("submissions");
		expect(Array.isArray(response.body.data.submissions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Submission history retrieved successfully."
		);

		expect(response.body.data.submissions.length).toEqual(2);
	});

	it("should handle paging model, page 2 limit 1", async () => {
		const response = await request(app)
			.get("/api/submission/history")
			.query({ page: "2", limit: "1" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("submissions");
		expect(Array.isArray(response.body.data.submissions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Submission history retrieved successfully."
		);

		expect(response.body.data.submissions.length).toEqual(1);
	});

	it("should handle paging model, page 1 limit 3", async () => {
		const response = await request(app)
			.get("/api/submission/history")
			.query({ page: "1", limit: "3" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("submissions");
		expect(Array.isArray(response.body.data.submissions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Submission history retrieved successfully."
		);

		expect(response.body.data.submissions.length).toEqual(3);
	});
});
