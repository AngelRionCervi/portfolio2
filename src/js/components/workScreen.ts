//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";
import gState from "../state";

createComp("work-screen", ({ html, css, createState, useGlobal, cx }: any) => {
    const { state, setState } = createState({ workScreenOpened: useGlobal("workScreenOpened") });

    const mainContainer = css`
        width: calc(100% - 4vh - 4vw);
        height: calc(100% - 4vh - 4vw);
        opacity: 0;
        transition: opacity 100ms linear;
    `;

    const opacity1 = css`opacity: 1;`;
    const opacity0 = css`opacity: 0;`;

    const getContentOpacity = () => {
        return state.workScreenOpened ? opacity1 : opacity0;
    }

    return () => html`<div class=${cx(mainContainer, getContentOpacity())}>hi</div>`;
});
