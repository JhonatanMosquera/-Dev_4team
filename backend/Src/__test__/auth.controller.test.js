import request from 'supertest';
import express from 'express';
import { pool } from '../db.js'; 
import {
  getUsers,
  loginUser,
  createUser,
  logout,
} from '../controllers/auth.controllers.js'; 
import bcrypt from 'bcrypt'; // Import bcrypt

const app = express();
app.use(express.json());
app.get('/users', getUsers);
app.post('/login', loginUser);
app.post('/users', createUser);
app.post('/logout', logout);

jest.mock('../db.js');
jest.mock('bcrypt', () => ({
  hash: jest.fn(), // Mock the hash function
  compare: jest.fn(), // Mock the compare function if needed
}));
jest.mock('../libs/jwt.js', () => ({
  generateToken: jest.fn(() => 'mockedToken'),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ];
      pool.query.mockResolvedValueOnce({ rows: mockUsers });

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });

    it('should return 500 if there is a server error', async () => {
      pool.query.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).get('/users');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error interno del servidor' });
    });
  });

  describe('loginUser', () => {
    it('should return 404 if user is not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // User not found

      const response = await request(app).post('/login').send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Usuario no encontrado' });
    });
  });

  describe('createUser', () => {
    it('should return 409 if the email already exists', async () => {
      const newUser = { name: 'User', email: 'user@example.com', password: 'password123' };
      bcrypt.hash.mockResolvedValueOnce('hashedPassword');
      pool.query.mockRejectedValueOnce({ code: '23505' }); // Duplicate error code

      const response = await request(app).post('/users').send(newUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: 'email already exists' });
    });

    it('should return 500 if there is a server error', async () => {
      const newUser = { name: 'User', email: 'user@example.com', password: 'password123' };
      bcrypt.hash.mockResolvedValueOnce('hashedPassword');
      pool.query.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).post('/users').send(newUser);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'internal server error' });
    });
  });

  describe('logout', () => {
    it('should log out a user', async () => {
      const response = await request(app).post('/logout');

      expect(response.status).toBe(200);
    });
  });
});


