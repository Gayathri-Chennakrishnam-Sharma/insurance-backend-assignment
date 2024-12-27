const request = require('supertest');
const app = require('../../../server');


jest.mock('../../db/models/policy', () => ({
    ...jest.requireActual('../../db/models/policy'),
    create: jest.fn(),
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
}));


const { create } = require('../../db/models/policy');

describe('Policy API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /policies - should create a new policy for a customer', async () => {
    const customerId = 1;
    const newPolicy = {
      policyNumber: 'POL12345',
      coverageAmount: 100000,
      premium:5000
    };

    create.mockResolvedValue(newPolicy); 

    const response = await request(app)
      .post(`/api/policies/${customerId}`)
      .send(newPolicy);

    expect(response.status).toBe(201);
    expect(response.body.policyNumber).toBe('POL12345');
    expect(response.body.coverageAmount).toBe(100000);
    expect(response.body.premium).toBe(5000);
  });
});
