//@ts-ignore
import { createComp, store, addGlobalCSS } from "vengarl";
import "./components/background";



createComp("app-root", ({ html }: any) => {
    
    return () => html`<app-background></app-background>`;
});
