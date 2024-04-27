import request from 'supertest';
import express from 'express';
import { solveWaterJug } from './waterJug/waterJugController';


const mockRequest = (body: any): Request => ({
  body,
} as any);

const mockResponse = (): Response => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as any;
};

describe('solveWaterJug', () => {
  test('successfully finds a solution for X=3, Y=5, Z=4', () => {
    const req = mockRequest({ x_capacity: 3, y_capacity: 5, z_amount_wanted: 4 });
    const res = mockResponse();
    solveWaterJug(req, res);

    expect(res.json).toHaveBeenCalledWith({
      solution: expect.arrayContaining([
        expect.objectContaining({ step: expect.any(Number), action: expect.any(String) })
      ])
    });
  });

  test('returns no solution if Z cannot be measured with X and Y', () => {
    const req = mockRequest({ x_capacity: 2, y_capacity: 6, z_amount_wanted: 5 });
    const res = mockResponse();
    solveWaterJug(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No solution possible." });
  });

  test('returns an error for non-positive inputs', () => {
    const req = mockRequest({ x_capacity: -1, y_capacity: 5, z_amount_wanted: 3 });
    const res = mockResponse();
    solveWaterJug(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All inputs must be positive integers." });
  });

  test('validates that all inputs are integers', () => {
    const req = mockRequest({ x_capacity: "three", y_capacity: 5, z_amount_wanted: 3 });
    const res = mockResponse();
    solveWaterJug(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All inputs must be positive integers." });
  });

  test('handles a valid scenario with a known solution', () => {
    const req = mockRequest({ x_capacity: 7, y_capacity: 11, z_amount_wanted: 2 });
    const res = mockResponse();
    solveWaterJug(req, res);

    expect(res.json).toHaveBeenCalledWith({
      solution: expect.any(Array)  // You would include the specific steps expected if known
    });
  });
});