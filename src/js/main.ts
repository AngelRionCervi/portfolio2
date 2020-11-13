//@ts-ignore
import { createComp, store, addGlobalCSS } from "vengarl";
import appBackground from "./components/background";
import appSquare from "./components/squaresContainer";

createComp("app-root", ({ html, scopedComp }: any) => {
    
    scopedComp({
        "app-background": appBackground,
        "app-square": appSquare,
    })

    return () => html`<app-background></app-background><app-square></app-square>`;
}, true);
