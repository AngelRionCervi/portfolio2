//@ts-ignore
import { store } from "vengarl";

store.createGlobalState({ openAnimationDone: false });

export default store.getGlobalState();