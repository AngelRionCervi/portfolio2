//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";
import gState from "../state";

createComp("app-square", ({ html, css, self, queryAll, onAttached, query, createState }: any) => {
    //const { state, setState } = createState({ currentPage: 1 });

    const getEndSize = () => {
        const size = window.innerWidth/7 + window.innerHeight/7;
        return size > 500 ? size : 500;
    }

    const initContainerSquareSize = 0;
    const initSquareSize = 75;
    const endSquareSize = getEndSize();
    const borderWidth = 20;
    const finalShift = 25;
    const switchPeak = endSquareSize / 2;
    const endContainerSquareSize = endSquareSize + finalShift * 2;

    let transitioning = false;

    const calcNewCenter = (size: number) => {
        return {
            x: window.innerWidth / 2 - size / 2,
            y: window.innerHeight / 2 - size / 2,
        };
    };

    const initPos = calcNewCenter(initSquareSize);
    const squareContainer = css`
        position: absolute;
        z-index: 2;
        background-color: white;
        box-shadow: inset 0px 0px 0px ${borderWidth}px black;
    `;

    const mainContainer = css`
        position: absolute;
        z-index: 1;
        box-shadow: inset 0px 0px 0px ${borderWidth}px black;
        top: ${calcNewCenter(initContainerSquareSize).y}px;
        left: ${calcNewCenter(initContainerSquareSize).x}px;
        width: ${initContainerSquareSize}px;
        height: ${initContainerSquareSize}px;
        filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
    `;

    const squareAnimation = () => {
        const containerSquare = query(`.${mainContainer}`);
        const squareEls = queryAll(`.${squareContainer}`);
        anime({
            targets: squareEls,
            rotate: [{ value: "1turn", duration: 400, easing: "easeInQuad" }],
            top: [
                { value: calcNewCenter(initSquareSize).y + "px", duration: 400, easing: "easeInQuad" },
                { value: calcNewCenter(endSquareSize).y + "px", duration: 400, easing: "easeInQuad" },
            ],
            width: [{ value: endSquareSize, duration: 400, delay: 400, easing: "easeInQuad" }],
            height: [{ value: endSquareSize, duration: 400, delay: 400, easing: "easeInQuad" }],
            left: [{ value: calcNewCenter(endSquareSize).x + "px", duration: 400, delay: 400, easing: "easeInQuad" }],
            complete: () => {
                const lastAnims = [...squareEls].map((square: any, index: number) => {
                    const shift = index === 0 ? finalShift : -finalShift;
                    return new Promise((resolve) => {
                        anime({
                            targets: square,
                            translateX: [{ value: shift, duration: 250, easing: "easeInQuad" }],
                            translateY: [{ value: shift, duration: 250, easing: "easeInQuad" }],
                            complete: resolve,
                        });
                    });
                });
                Promise.all(lastAnims).then(() => {
                    gState.setGlobal("openAnimationDone", true);
                    anime({
                        targets: containerSquare,
                        width: [{ value: endContainerSquareSize, duration: 500, easing: "linear" }],
                        height: [{ value: endContainerSquareSize+1, duration: 500, easing: "linear" }],
                        top: [
                            { value: calcNewCenter(endContainerSquareSize).y + "px", duration: 500, easing: "linear" },
                        ],
                        left: [
                            { value: calcNewCenter(endContainerSquareSize).x + "px", duration: 500, easing: "linear" },
                        ],
                    });
                });
            },
        });
    };

    onAttached(() => {
        squareAnimation();
    });

    const switchPage = (page: number) => {
        if (transitioning) return;
        transitioning = true;
        const getNewPos = (index: number, back: boolean = false) => {
            if (!back) {
                return index === 0 ? switchPeak : -switchPeak;
            }
            return index === 0 ? finalShift : -finalShift;
        };
        const squareEls = queryAll(`.${squareContainer}`);
        const firstDecal = [...squareEls].map((square: any, index: number) => {
            const shift = getNewPos(index);
            return new Promise((resolve) => {
                anime({
                    targets: square,
                    translateX: [{ value: shift, duration: 250, easing: "easeInQuad" }],
                    translateY: [{ value: shift, duration: 250, easing: "easeInQuad" }],
                    complete: resolve,
                });
            });
        });
        Promise.all(firstDecal).then(() => {
            squareEls[0].style.zIndex = page === 1 ? "1" : "2";
            squareEls[1].style.zIndex = page === 1 ? "2" : "1";
            squareEls.forEach((square: any, index: number) => {
                const shift = getNewPos(index, true);
                anime({
                    targets: square,
                    translateX: [{ value: shift, duration: 250, easing: "easeInQuad" }],
                    translateY: [{ value: shift, duration: 250, easing: "easeInQuad" }],
                    complete: () => (transitioning = false),
                });
            });
        });
    };

    return () =>
        html`<div class=${mainContainer}></div>
            <square-2
                style="display: flex; align-items: center;
    justify-content: center; width: ${initSquareSize}px; height: ${initSquareSize}px; left: ${initPos.x}px; top: ${-initSquareSize}px; background-color: #D7A97F;"
                class=${squareContainer}
                .props=${{ switchToPage1: () => switchPage(1) }}
            ></square-2>
            <square-1
                style="display: flex; align-items: center;
    justify-content: center; width: ${initSquareSize}px; height: ${initSquareSize}px; left: ${initPos.x}px; top: ${-initSquareSize}px; background-color: #8492C2;"
                class=${squareContainer}
                .props=${{ switchToPage2: () => switchPage(2) }}
            ></square-1>`;
});
