import request from "supertest";
import app from "../src/app";

describe("GET /api/question", () => {
	it("should return all questions", async () => {
		const response = await request(app).get("/api/question");

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("questions");
		expect(Array.isArray(response.body.data.questions)).toBe(true);
		expect(response.body).toHaveProperty("message");

		expect(response.body.data.questions.length).toEqual(3);

		const firstQuestion = response.body.data.questions[0];
		expect(firstQuestion).toHaveProperty("id");
		expect(firstQuestion).toHaveProperty("title");
		expect(firstQuestion).toHaveProperty("type");
		expect(firstQuestion).toHaveProperty("createdAt");
	});

	it("should handle query parameters for SST question", async () => {
		const response = await request(app)
			.get("/api/question")
			.query({ type: "SST" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("questions");
		expect(Array.isArray(response.body.data.questions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Questions retrieved successfully."
		);

		expect(response.body.data.questions.length).toBeGreaterThan(0);
		expect(response.body.data.questions[0].id).toEqual(1);
		expect(response.body.data.questions[0].title).toEqual(
			"Evolution of Medicare"
		);
		expect(response.body.data.questions[0].type).toEqual("SST");
	});

	it("should handle query parameters for RO question", async () => {
		const response = await request(app)
			.get("/api/question")
			.query({ type: "RO" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("questions");
		expect(Array.isArray(response.body.data.questions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Questions retrieved successfully."
		);

		expect(response.body.data.questions.length).toBeGreaterThan(0);
		expect(response.body.data.questions[0].id).toEqual(2);
		expect(response.body.data.questions[0].title).toEqual(
			"Argument Analysis"
		);
		expect(response.body.data.questions[0].type).toEqual("RO");
	});

	it("should handle query parameters for RMMCQ question", async () => {
		const response = await request(app)
			.get("/api/question")
			.query({ type: "RMMCQ" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("questions");
		expect(Array.isArray(response.body.data.questions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Questions retrieved successfully."
		);

		expect(response.body.data.questions.length).toBeGreaterThan(0);
		expect(response.body.data.questions[0].id).toEqual(3);
		expect(response.body.data.questions[0].title).toEqual(
			"Writing Technology"
		);
		expect(response.body.data.questions[0].type).toEqual("RMMCQ");
	});

	it("should handle paging model, page 1 limit 2", async () => {
		const response = await request(app)
			.get("/api/question")
			.query({ page: "1", limit: "2" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("questions");
		expect(Array.isArray(response.body.data.questions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Questions retrieved successfully."
		);

		expect(response.body.data.questions.length).toEqual(2);
	});

	it("should handle paging model, page 2 limit 1", async () => {
		const response = await request(app)
			.get("/api/question")
			.query({ page: "2", limit: "1" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("questions");
		expect(Array.isArray(response.body.data.questions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Questions retrieved successfully."
		);

		expect(response.body.data.questions.length).toEqual(1);
	});

	it("should handle paging model, page 1 limit 3", async () => {
		const response = await request(app)
			.get("/api/question")
			.query({ page: "1", limit: "3" });

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("questions");
		expect(Array.isArray(response.body.data.questions)).toBe(true);
		expect(response.body).toHaveProperty(
			"message",
			"Questions retrieved successfully."
		);

		expect(response.body.data.questions.length).toEqual(3);
	});

	it("should return details of SST question by id", async () => {
		const response = await request(app).get("/api/question/1");

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("question");
		expect(typeof response.body.data.question).toBe("object");
		expect(response.body).toHaveProperty(
			"message",
			"Question details retrieved successfully."
		);

		expect(response.body.data.question.id).toEqual(1);
		expect(response.body.data.question.title).toEqual(
			"Evolution of Medicare"
		);
		expect(response.body.data.question.type).toEqual("SST");

		expect(response.body.data.question.audios.length).toEqual(3);
		expect(response.body.data.question.audios[0].id).toEqual(1);
		expect(response.body.data.question.audios[0].audioUrl).toEqual(
			"https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-GB_Amy_1722755742193.m4a"
		);

		expect(response.body.data.question.audios[0].speaker).toEqual("Amy");
		expect(response.body.data.question.audios[0].language).toEqual("UK");
		expect(response.body.data.question.audios[1].id).toEqual(2);
		expect(response.body.data.question.audios[1].audioUrl).toEqual(
			"https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-US_John_1722755742194.m4a"
		);

		expect(response.body.data.question.audios[1].speaker).toEqual("John");
		expect(response.body.data.question.audios[1].language).toEqual("US");
		expect(response.body.data.question.audios[2].id).toEqual(3);
		expect(response.body.data.question.audios[2].audioUrl).toEqual(
			"https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-GB_Emma_1722755742195.m4a"
		);
		expect(response.body.data.question.audios[2].speaker).toEqual("Emma");
		expect(response.body.data.question.audios[2].language).toEqual("UK");
	});

	it("should return details of RO question by id", async () => {
		const response = await request(app).get("/api/question/2");

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("question");
		expect(typeof response.body.data.question).toBe("object");
		expect(response.body).toHaveProperty(
			"message",
			"Question details retrieved successfully."
		);

		expect(response.body.data.question.id).toEqual(2);
		expect(response.body.data.question.title).toEqual("Argument Analysis");
		expect(response.body.data.question.type).toEqual("RO");

		expect(response.body.data.question.paragraphs.length).toEqual(3);
		expect(response.body.data.question.paragraphs[0].id).toEqual(1);
		expect(response.body.data.question.paragraphs[0].text).toEqual(
			"They state a claim and use evidence or data as reasons to convince us their argument is valid."
		);

		expect(response.body.data.question.paragraphs[0].order).toEqual(1);
		expect(response.body.data.question.paragraphs[1].id).toEqual(2);
		expect(response.body.data.question.paragraphs[1].text).toEqual(
			"Logical reasoning is pervasive."
		);

		expect(response.body.data.question.paragraphs[1].order).toEqual(2);
		expect(response.body.data.question.paragraphs[2].id).toEqual(3);
		expect(response.body.data.question.paragraphs[2].text).toEqual(
			"Then they organize their claims and reasons for easy audience comprehension."
		);
		expect(response.body.data.question.paragraphs[2].order).toEqual(3);
	});

	it("should return details of RMMCQ question by id", async () => {
		const response = await request(app).get("/api/question/3");

		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
		expect(response.body.data).toHaveProperty("question");
		expect(typeof response.body.data.question).toBe("object");
		expect(response.body).toHaveProperty(
			"message",
			"Question details retrieved successfully."
		);

		expect(response.body.data.question.id).toEqual(3);
		expect(response.body.data.question.title).toEqual("Writing Technology");
		expect(response.body.data.question.type).toEqual("RMMCQ");
		expect(response.body.data.question.passage).toEqual(
			"Writing technology has revolutionized the way we communicate and express our thoughts. From the invention of the printing press to the advent of word processors and now to AI-powered writing assistants, each advancement has brought us closer to a world where ideas can be shared more efficiently and effectively."
		);

		expect(response.body.data.question.options.length).toEqual(5);
		expect(response.body.data.question.options[0].id).toEqual(1);
		expect(response.body.data.question.options[0].text).toEqual(
			"Typewriters made editing easier and faster."
		);

		expect(response.body.data.question.options[1].id).toEqual(2);
		expect(response.body.data.question.options[1].text).toEqual(
			"AI writing assistants improve clarity and effectiveness in communication."
		);

		expect(response.body.data.question.options[2].id).toEqual(3);
		expect(response.body.data.question.options[2].text).toEqual(
			"AI-generated text creates new content, lessening human input in writing."
		);

		expect(response.body.data.question.options[3].id).toEqual(4);
		expect(response.body.data.question.options[3].text).toEqual(
			"Future writing tech may suggest personal styles and understand context better."
		);

		expect(response.body.data.question.options[4].id).toEqual(5);
		expect(response.body.data.question.options[4].text).toEqual(
			"The printing press made books more accessible, revolutionizing communication."
		);
	});

	it("should return 404 for a non-existent question ID", async () => {
		const response = await request(app).get("/api/question/999");

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("success", false);
		expect(response.body).toHaveProperty("message", "No question found!");
	});
});
