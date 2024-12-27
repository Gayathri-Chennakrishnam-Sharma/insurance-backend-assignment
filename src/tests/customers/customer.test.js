const request = require('supertest');
const app = require('../../../server');


jest.mock('../../db/models/customer', () => ({
    ...jest.requireActual('../../db/models/customer'),
    create: jest.fn(),
    findByPk: jest.fn(),
    hasMany: jest.fn(), 
  }));

const { create, findByPk } = require('../../db/models/customer');

describe('Customer API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  
  test('POST /customers - should create a new customer', async () => {
    const newCustomer = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    };

    create.mockResolvedValue(newCustomer);

    const response = await request(app)
      .post('/api/customers')
      .send(newCustomer);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('john.doe@example.com');
  });

 
  test('GET /customers/:id - should get customer details', async () => {
    const customerId = 1;
    const customer = {
      id: customerId,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    };

    findByPk.mockResolvedValue(customer);

    const response = await request(app).get(`/api/customers/${customerId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(customerId);
    expect(response.body.name).toBe('John Doe');
  });
});
