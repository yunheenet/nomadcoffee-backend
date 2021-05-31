import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const id = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!id) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }

      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ take: 5, skip: (page - 1) * 5 });
      const totalFollowers = await client.user.count({
        where: { following: { some: username } },
      });
      return {
        ok: true,
        followers: followers,
        totalFollowers: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
