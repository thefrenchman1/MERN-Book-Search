const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const AuthenticationError = new GraphQLError('Authentication Error.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

const authMiddleware = function ({ req }) {
  let token = req.query.token || req.headers.authorization || req.body.token;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
    throw new GraphQLError('Invalid token', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  return req;
};

const signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  AuthenticationError,
  authMiddleware,
  signToken,
};
