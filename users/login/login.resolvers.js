import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await client.user.findFirst({
          where: { email },
        });
        if (!user) {
          return {
            ok: false,
            error: 'User not found.',
          };
        }
        const canAuth = await bcrypt.compare(password, user.password);
        if (!canAuth) {
          return {
            ok: false,
            error: 'Invalid password.',
          };
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
