import bcrypt from 'bcrypt';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, name, location, avataURL, githubUsername }
    ) => {
      //Check that the username / email aren't taken
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      if (existingUser) {
        console.log(existingUser);
        return { ok: false, error: 'Already exist username or email.' };
      }

      //Hash the password
      const uglyPassword = await bcrypt.hash(password, 10);
      const newUser = await client.user.create({
        data: {
          username,
          email,
          password: uglyPassword,
          name,
          location,
          avataURL,
          githubUsername,
        },
      });
      if (newUser) {
        console.log(newUser);
        return { ok: true };
      } else {
        return { ok: false, error: 'Sorry. fail to create an account.' };
      }
    },
  },
};
