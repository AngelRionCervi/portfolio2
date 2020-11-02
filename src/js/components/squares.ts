//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";
import gState from "../state";

createComp("square-1", ({ html, css, createState, useGlobal, cx, props, self, onAttached }: any) => {
    // BUG : state key "openAnimationDone" must have the same name as the string used in useGlobal
    const { state, setState } = createState({ openAnimationDone: useGlobal("openAnimationDone") });

    const baseContainerStyle = css`
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        grid-template-areas: "topr a topl"
                              "b center c"
                              "bottoml d bottomr";
        width: 80%;
        height: 80%;
    `;

    const getContainerOpa = () => {
        const isOpenAnOver = gState.getGlobal("openAnimationDone");
        return css`
            opacity: ${isOpenAnOver ? 1 : 0};
        `;
    };

    const hiText = css`
        grid-area: topr;
        margin: 0;
        font-size: 5.5em;
    `;

    const pageNumber = css`
        grid-area: topl;
        text-align: right;
        font-size: 0.8em;
        margin-bottom: 0;
        margin-top: 1px;
    `;

    const centerText = css`
        margin: 0;
        grid-area: center;
        font-size: 1em;
        display: flex;
        align-self: center;
    `

    onAttached(() => {
        console.log(props());
    });

    return () =>
        html`<div @click=${props()?.switchToPage2} class=${cx(baseContainerStyle, getContainerOpa())}>
            <p class=${hiText}>Hi</p>
            <p class=${pageNumber}>001</p>
            <p class=${centerText}>My name is Angel Rion - Cervi <br><br> I like to build and design website</p>
        </div>`;
});

createComp("square-2", ({ html, css, props, onAttached, cx, createState, useGlobal }: any) => {
    const { state, setState } = createState({ openAnimationDone: useGlobal("openAnimationDone") });

    const baseContainerStyle = css`
        display: flex;
        width: 80%;
        height: 80%;
    `;

    const getContainerOpa = () => {
        const isOpenAnOver = gState.getGlobal("openAnimationDone");
        return css`
            opacity: ${isOpenAnOver ? 1 : 0};
        `;
    };

    const hiText = css`
        margin: 0;
        font-size: 5em;
    `;

    onAttached(() => {
        console.log(props());
    });
    return () =>
        html`<div @click=${props()?.switchToPage1} class=${cx(baseContainerStyle, getContainerOpa())}>
            <p class=${hiText}>Hi</p>
        </div>`;
});
