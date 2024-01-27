const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth.js');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        const user = await User.findOne({ _id: context.user._id });
        return user;
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Invalid email or password');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Invalid email or password');
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Failed to login');
      }
    },
    saveBook: async (parent, { book }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: book } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('User not logged in');
      } catch (error) {
        throw new Error('Failed to save book');
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('User not logged in');
      } catch (error) {
        throw new Error('Failed to remove book');
      }
    }
  }
};

module.exports = resolvers;