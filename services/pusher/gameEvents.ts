import { HttpError } from "../../classes";
import { pusher } from ".";

export const pusherTrigger = async (chanel: string, event: string, message: string | Object): Promise<void> => {

    try {
        await pusher.trigger(chanel, event, message);
    } catch (error) {
        throw new HttpError(400, "Error on trigger with pusher");
    }
};
