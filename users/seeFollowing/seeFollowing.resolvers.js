import client from '../../client';

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const id = await client.user.findUnique(
        { where: username },
        { select: { id: true } }
      );
      if (!id) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }

      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: 1,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return { ok: true, following: following };
    },
  },
};
