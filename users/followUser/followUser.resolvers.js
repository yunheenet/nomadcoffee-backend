import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      let user = await client.user.findUnique({ where: username });
      if (!user) {
        return {
          ok: false,
          error: `${username} does not exist.`,
        };
      }

      user = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'update is failed.',
        };
      }
      return {
        ok: true,
      };
    }),
  },
};
