const request = require('supertest');
const http = require('http');
const { getAllEmployees } = require('../controllers');
const { app } = require('../index');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllEmployees: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all employees', () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockEmployees);

    let result = getAllEmployees();
    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET /employees should get all employees', async () => {
    const res = await request(server).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });

  it('GET /employees/details/:id should return employee', async () => {
    const res = await request(server).get('/employees/details/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});