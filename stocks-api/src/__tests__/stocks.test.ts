import request from 'supertest';
import express from 'express';
import stocksRouter from '../routes/v1/stocks';

const app = express();
app.use('/api/v1', stocksRouter);

describe('Stocks API', () => {
    it('should return a list of exchanges', async () => {
        const response = await request(app).get('/api/v1/exchanges');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(['London Stock Exchange', 'New York Stock Exchange', 'Nasdaq']);
    });

    it('should return stocks for London Stock Exchange', async () => {
        const response = await request(app).get('/api/v1/stocks/London Stock Exchange');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return stock details for a valid stock', async () => {
        const response = await request(app).get('/api/v1/stocks/London Stock Exchange/CRODA INTERNATIONAL PLC');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('code', 'CRDA');
    });

    it('should return 404 for an invalid stock', async () => {
        const response = await request(app).get('/api/v1/stocks/NASDAQ/INVALID');
        expect(response.status).toBe(404);
    });
});