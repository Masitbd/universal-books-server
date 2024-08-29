const request = require('supertest');
const { MongoClient } = require('mongodb');
const {app, server} = require('../index'); // Ensure your app is exported correctly

let client;

beforeAll(async () => {
    // Connect to the MongoDB instance before running tests
    const url = process.env.MONGO_URI || `mongodb+srv://wareHouseManagement:STd17iIFGcLgGMEa@cluster0.x3xvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected successfully to server'); // This should now only log when the connection is successful
});

afterAll(async () => {
    // Close the MongoDB connection after running all tests
    await client.close();
    console.log('Disconnected from server');

    // Close the server to ensure Jest exits cleanly
    if (server) {
        server.close(() => {
            console.log('Server closed');
        });
    }
});
  

describe('API Tests', () => {
    test('GET /books - should return a list of books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /book/:id - should return a single book', async () => {
        // Use a valid book ID here. You can insert a book first and use its ID.
        const bookId = '66cff8dc281132fd5118ab01'; // Replace with a valid ID
        const response = await request(app).get(`/book/${bookId}`);
        
        if (response.statusCode === 200) {
            expect(response.body.status).toBe(true);
            expect(response.body.data).toHaveProperty('_id', bookId);
        } else {
            // If not 200, you may need to handle cases where book doesn't exist
            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBeDefined();
        }
    });

    // More tests for POST, PATCH, DELETE, etc. can be added similarly
});
