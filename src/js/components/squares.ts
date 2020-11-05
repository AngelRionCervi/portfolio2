//@ts-ignore
import { createComp, addGlobalCSS } from "vengarl";
//@ts-ignore
import anime from "animejs";
import gState from "../state";

addGlobalCSS`
    a {
        color: black;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`;

createComp("square-1", ({ html, css, createState, useGlobal, cx, props, onAttached }: any) => {
    // BUG : state key "openAnimationDone" must have the same name as the string used in useGlobal
    const { state, setState } = createState({ openAnimationDone: useGlobal("openAnimationDone") });

    const baseContainerStyle = css`
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        grid-template-areas:
            "topl a topr"
            "b center c"
            "bottoml d bottomr";
        width: 80%;
        height: 80%;
        transition: opacity 100ms linear;
    `;

    const getContainerOpa = () => {
        const isOpenAnOver = gState.getGlobal("openAnimationDone");
        return css`
            opacity: ${isOpenAnOver ? 1 : 0};
        `;
    };

    const hiText = css`
        grid-area: topl;
        margin: 0;
        font-size: 4em;
    `;

    const pageNumber = css`
        grid-area: topr;
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
    `;

    const workIcon = css`
        width: 35px;
        height: 35px;
        background-color: black;
        border-radius: 50%;
        grid-area: bottoml;
        align-self: end;
    `;

    const circleArrowPos = css`
        grid-area: bottomr;
        align-self: end;
        justify-self: right;
    `;

    onAttached(() => {
        console.log(props());
    });

    return () =>
        html`<div class=${cx(baseContainerStyle, getContainerOpa())}>
            <p class=${hiText}>Hi</p>
            <p class=${pageNumber}>001</p>
            <p class=${centerText}>
                My name is Angel Rion - Cervi <br /><br />
                I like to build and design website
            </p>
            <div class=${workIcon} @click=${() => props()?.toggleWorkScreen()}></div>
            <circle-arrow
                orientation="bottom-right"
                circleSize="20"
                .props=${{ click: props()?.switchToPage2 }}
                class=${circleArrowPos}
            ></circle-arrow>
        </div>`;
});

createComp("square-2", ({ html, css, props, onAttached, cx, createState, useGlobal }: any) => {
    const { state, setState } = createState({ openAnimationDone: useGlobal("openAnimationDone") });

    const baseContainerStyle = css`
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        grid-template-areas:
            "topl a topr"
            "b center c"
            "bottom bottom bottom";
        width: 80%;
        height: 80%;
        transition: opacity 200ms linear;
    `;

    const pageNumber = css`
        grid-area: topr;
        text-align: right;
        font-size: 0.8em;
        margin-bottom: 0;
        margin-top: 1px;
    `;

    const getContainerOpa = () => {
        const isOpenAnOver = gState.getGlobal("openAnimationDone");
        return css`
            opacity: ${isOpenAnOver ? 1 : 0};
        `;
    };

    const circleArrowPos = css`
        grid-area: topl;
        align-self: start;
        justify-self: left;
    `;

    const centerText = css`
        margin: 0;
        grid-area: center;
        font-size: 1em;
        display: flex;
        align-self: center;
    `;

    const bottomLinks = css`
        margin: 0;
        grid-area: bottom;
        font-size: 1em;
        align-self: end;
        color: black;
        text-align: center;
    `;

    onAttached(() => {
        console.log(props());
    });

    return () =>
        html`<div class=${cx(baseContainerStyle, getContainerOpa())}>
            <circle-arrow
                orientation="top-left"
                circleSize="20"
                .props=${{ click: props()?.switchToPage1 }}
                class=${circleArrowPos}
            ></circle-arrow>
            <p class=${pageNumber}>002</p>
            <p class=${centerText}>
                Dont hesitate to contact me for work <br /><br />
                or just to chat !
            </p>
            <p class=${bottomLinks}>
                <a href="#">Linkedin</a>
                &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;
                a.rioncervi@gmail.com
                &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;
                <a href="#">Twitter</a>
            </p>
        </div>`;
});
