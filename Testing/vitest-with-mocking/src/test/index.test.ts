import {it, describe, expect, vi } from 'vitest';
import app from '../index';
import request from 'supertest';
import { db } from '../__mocks__/db';

vi.mock('../db');

describe("Tests for the sum endpoint", () => {
    it("should return the sum of two numbers", async () => {
        db.function.create.mockResolvedValue({
            id: 1,
            name: 'sum',
            a:
             1,
            b: 2,
            type: 'ADD',
            ans: 3,
        })
        vi.spyOn(db.function, 'create');
        const res = await request(app).post("/sum").send({
            a: 1,
            b: 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(1);
        expect(res.body.answer).toBe(3);
    });
    
    expect(db.function.create).toHaveBeenCalledWith({
        data: {
            id: expect.any(Number),
            name: 'sum',
            a: 1,
            b: 2,
            type: 'ADD',
            ans: 3
        }
    });

    it("should return the sum of two negative numbers", async () => {
        const res = await request(app).post("/sum").send({
            a: -1,
            b: -2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(-3);
    });

    it("should return the sum of two zero numbers", async () => {
        const res = await request(app).post("/sum").send({
            a: 0,
            b: 0
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(0);
    });
});

describe("Tests for the multiply endpoint", () => {
    it("should return the product of two numbers", async () => {
        const res = await request(app).post("/multiply").send({
            a: 1,
            b: 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(2);
    });

    it("should return the product of two negative numbers", async () => {
        const res = await request(app).post("/multiply").send({
            a: -1,
            b: -2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(2);
    });

    it("should return the product of two zero numbers", async () => {
        const res = await request(app).post("/multiply").send({
            a: 0,
            b: 0
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(0);
    });
});