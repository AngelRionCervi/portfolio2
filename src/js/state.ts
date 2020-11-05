//@ts-ignore
import { store } from "vengarl";

store.createGlobalState({ openAnimationDone: false, workScreenOpened: false });

export default store.getGlobalState();
