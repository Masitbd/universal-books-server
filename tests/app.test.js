const request = require('supertest');
const express = require('express');
const { MongoClient } = require('mongodb');
const app = require('../app'); // Make sure your app.js exports the app instance

describe('API Tests', () => {
    // You may want to connect to a test database or mock the database connection

    beforeAll(async () => {
        // Set up database connection if needed
    });

    afterAll(async () => {
        // Close database connection if needed
    });

    test('GET /books - should return a list of books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('GET /book/:id - should return a single book', async () => {
        const bookId = 'some-valid-book-id'; // Use a valid book ID for testing
        const response = await request(app).get(`/book/${bookId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toHaveProperty('_id', bookId);
    });

    // Add more tests for POST, PATCH, DELETE, etc.
});
