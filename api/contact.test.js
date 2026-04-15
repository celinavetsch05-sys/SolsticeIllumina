jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-id' }),
    },
  })),
}));

const handler = require('./contact');

function makeReqRes(body, method = 'POST') {
  const req = { method, body };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
  return { req, res };
}

test('returns 405 for non-POST requests', async () => {
  const { req, res } = makeReqRes({}, 'GET');
  await handler(req, res);
  expect(res.statusCode).toBe(405);
  expect(res.body.error).toBeTruthy();
});

test('returns 400 if name is missing', async () => {
  const { req, res } = makeReqRes({ email: 'a@b.com', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test('returns 400 if email is missing', async () => {
  const { req, res } = makeReqRes({ name: 'Test', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test('returns 400 if message is missing', async () => {
  const { req, res } = makeReqRes({ name: 'Test', email: 'a@b.com' });
  await handler(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test('returns 200 with ok:true on success', async () => {
  const { req, res } = makeReqRes({ name: 'Test', email: 'a@b.com', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

test('project field is optional', async () => {
  const { req, res } = makeReqRes({ name: 'Test', email: 'a@b.com', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(200);
});
