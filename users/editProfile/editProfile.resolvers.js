import bcrypt from 'bcrypt';
import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          password,
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let uglyPassword;
        if (password) {
          uglyPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            ...(username && { username }),
            ...(password && { password: uglyPassword }),
            ...(email && { email }),
            ...(name && { name }),
            ...(location && { location }),
            ...(avatarURL && { avataURL }),
            ...(githubUsername && { githubUsername }),
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: 'fail to edit profile.',
          };
        }
      }
    ),
  },
};
