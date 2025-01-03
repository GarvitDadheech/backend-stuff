import {it, describe, expect, vi } from 'vitest';
import app from '../index';
import request from 'supertest';

vi.mock('../db');

describe("Tests for the sum endpoint", () => {
    it("should return the sum of two numbers", async () => {
        const res = await request(app).post("/sum").send({
            a: 1,
            b: 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
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