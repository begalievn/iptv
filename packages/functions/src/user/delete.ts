import { Util } from "@iptv/core/util";

export const main = Util.authHandler(async (event) => {
  const user = event.user;

  const response = await Util.deleteUser(user.id);

  return JSON.stringify(response);
}); 
