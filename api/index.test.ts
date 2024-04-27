import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

describe('GET /', () => {
  it('should return Hello World!', async () => {
    const response = await request(app).get('/');
    expect(response.text).toEqual('Hello World!');
    expect(response.statusCode).toBe(200);
  });
});