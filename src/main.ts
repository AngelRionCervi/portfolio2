import { test } from "./test";
import { html, render } from "lit-html";

// Define a template
const myTemplate = (name: any) => html`<p>Hello ${name}</p>`;

// Render the template to the document
render(myTemplate('World'), document.body);