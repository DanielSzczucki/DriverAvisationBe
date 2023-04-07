import { SMSAPI, MessageResponse } from "smsapi";
import { config } from "./config";

export const smsApiController = async (
  driverNumber: string,
  message: string
) => {
  try {
    const smsapi = new SMSAPI(config.smsApiToken);

    const smsApiResponse: MessageResponse = await smsapi.sms.sendSms(
      driverNumber,
      message
    );
    console.log(smsApiResponse);

    return smsApiResponse.list[0].status;
  } catch (e) {
    console.log(e);
  }
};
