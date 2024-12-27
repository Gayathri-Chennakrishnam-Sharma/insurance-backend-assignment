const request = require('supertest');
const app = require('../../../server');


jest.mock('../../db/models/claim', () => ({
    ...jest.requireActual('../../db/models/claim'),
    create: jest.fn(),
    update: jest.fn(),
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
  }));


const { create, update } = require('../../db/models/claim');

describe('Claim API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /claims - should file a new claim', async () => {
    const policyId = 1;
    const newClaim = {
      claimAmount: 5000,
      claimNumber: "POL10001",
    };

    create.mockResolvedValue(newClaim); 

    const response = await request(app)
      .post(`/api/claims/${policyId}`)
      .send(newClaim);

    expect(response.status).toBe(201);
    expect(response.body.claimAmount).toBe(5000);
    expect(response.body.claimNumber).toBe("POL10001");
  });

  test('PUT /claims/:id - should approve a claim', async () => {
    const claimId = 1;
    const updatedClaim = { status: 'APPROVED' };

    update.mockResolvedValue([1, [updatedClaim]]);

    const response = await request(app).put(`/api/claims/${claimId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('APPROVED');
  });

  test('PUT /claims/:id - should reject a claim', async () => {
    const claimId = 1;
    const updatedClaim = { status: 'REJECTED' };

    update.mockResolvedValue([1, [updatedClaim]]); 

    const response = await request(app).put(`/api/claims/${claimId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('REJECTED');
  });
});
