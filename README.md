# API Documentation for LiiLab Assignment

## Installation Instructions

To set up the project, follow these steps:

1. Install the required Node packages:

```
npm install
```

2. Add a `.env` file in the root folder and include the following environment variables:

```
DATABASE_URL=your_postgresql_database_url
PORT=7869
```

3. Apply Prisma migrations to set up the database schema:

```
npx prisma migrate dev
```

## Base URL

```
http://localhost:7869
```

## Endpoints

### 1. Seed Data

**Endpoint**: `/seedData`  
**Method**: `GET`  
**Description**: Seeds initial data for 3 different types of questions.

**Request**:

```
GET http://localhost:7869/seedData
```

**Response**:

```json
{
	"success": true,
	"message": "Seed data inserted successfully!"
}
```

---

### 2. Get All Questions

**Endpoint**: `/api/question`  
**Method**: `GET`  
**Description**: Retrieves a list of all questions with pagination and filtering by type.

**Request Parameters**:

-   `page` (query): Page number (e.g., `1`)
-   `limit` (query): Number of items per page (e.g., `2`)
-   `type` (query): Type of question (e.g., `SST`)

**Request**:

```
GET http://localhost:7869/api/question?page=1&limit=2&type=SST
```

**Response**:

```json
{
    "success": true,
    "data": {
        "questions": [
            {
                "id": 1,
                "title": "Evolution of Medicare",
                "type": "SST",
                "createdAt": "2024-11-16T11:28:17.052Z"
            },
            ...
        ]
    },
    "message": "Questions retrieved successfully."
}
```

---

### 3. Get Question Details

**Endpoint**: `/api/question/{id}`  
**Method**: `GET`  
**Description**: Retrieves details of a specific question by its ID.

**Request**:

```
GET http://localhost:7869/api/question/1
```

**Response**:

```json
{
	"success": true,
	"data": {
		"question": {
			"id": 1,
			"title": "Evolution of Medicare",
			"type": "SST",
			"audios": [
				{
					"id": 1,
					"audioUrl": "https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-GB_Amy_1722755742193.m4a",
					"speaker": "Amy",
					"language": "UK",
					"createdAt": "2024-11-16T11:57:42.727Z"
				},
				{
					"id": 2,
					"audioUrl": "https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-US_John_1722755742194.m4a",
					"speaker": "John",
					"language": "US",
					"createdAt": "2024-11-16T11:57:42.727Z"
				},
				{
					"id": 3,
					"audioUrl": "https://sgp1.digitaloceanspaces.com/liilab/quizbit/media/en-GB_Emma_1722755742195.m4a",
					"speaker": "Emma",
					"language": "UK",
					"createdAt": "2024-11-16T11:57:42.727Z"
				}
			],
			"createdAt": "2024-11-16T11:57:42.808Z"
		}
	},
	"message": "Question details retrieved successfully."
}
```

---

### 4. Submit Answer

**Endpoint**: `/api/submission/{questionId}`  
**Method**: `POST`  
**Description**: Submits an answer to a question.

**Request Body**:

-   `text` (string): The answer text. Or,
-   `list` (number[]): The correct order of paragraphs for RO question or the selected options for RMMCQ question.

**Request**:

```
POST http://localhost:7869/api/submission/1

Body:
{
    "text": "The answer to the question."
}
```

**Response**:

```json
{
	"success": true,
	"message": "Answer submitted successfully."
}
```

---

### 5. Submission History

**Endpoint**: `/api/submission/history`  
**Method**: `GET`  
**Description**: Retrieves the history of all submitted answers.
**Request Parameters**:

-   `page` (query): Page number (e.g., `1`)
-   `limit` (query): Number of items per page (e.g., `2`)
-   `type` (query): Type of question (e.g., `SST`)

**Request**:

```
GET http://localhost:7869/api/submission/history?page=1&limit=2&type=SST
```

**Response**:

```json
{
	"success": true,
	"data": {
		"submissions": [
			{
				"id": 4,
				"type": "SST",
				"title": "Evolution of Medicare",
				"questionId": 1,
				"Score": {
					"content": {
						"score": 0,
						"maximumScore": 2
					},
					"form": {
						"score": 1,
						"maximumScore": 2
					},
					"grammar": {
						"score": 2,
						"maximumScore": 2
					},
					"vocabulary": {
						"score": 2,
						"maximumScore": 2
					},
					"spelling": {
						"score": 2,
						"maximumScore": 2
					}
				},
				"createdAt": "2024-11-16T12:01:48.342Z"
			}
		]
	},
	"message": "Submission history retrieved successfully."
}
```

## Notes

-   Ensure the server is running locally on port `7869` before making API requests.
-   Please call seed data api to get initial questions.
