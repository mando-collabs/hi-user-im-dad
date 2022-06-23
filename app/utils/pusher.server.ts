import Pusher from "pusher";
import { getRequiredEnvVariable } from "~/utils/environment";

const pusherAppId = getRequiredEnvVariable("PUSHER_APP_ID");
const pusherAppKey = getRequiredEnvVariable("PUSHER_APP_KEY");
const pusherAppSecret = getRequiredEnvVariable("PUSHER_APP_SECRET");
const pusherAppCluster = getRequiredEnvVariable("PUSHER_APP_CLUSTER");

export const pusher = new Pusher({
  appId: pusherAppId,
  key: pusherAppKey,
  secret: pusherAppSecret,
  cluster: pusherAppCluster,
});
