/**
 * Aplenture/<my_app_name>
 * https://github.com/Aplenture/<my_app_name>
 * Copyright (c) 2023 Aplenture
 * License https://github.com/Aplenture/<my_app_name>/blob/main/LICENSE
 */

import * as FrontendJS from "frontendjs";
import { IndexViewController } from "./indexViewController";

export class RootViewController extends FrontendJS.ViewController {
    public readonly indexViewController = new IndexViewController();

    constructor(...classes: string[]) {
        super(...classes, 'root-view-controller');
    }

    public async load(): Promise<void> {
        // unload previous route
        FrontendJS.Router.onRouteChanged.on(() => super.unload(), { listener: this });
        FrontendJS.Router.onRouteChanged.on(() => this.removeAllChildren(), { listener: this });

        // add all routes
        FrontendJS.Router.addRoute('index', () => this.appendChild(this.indexViewController), { listener: this });

        // reload changed route
        FrontendJS.Router.onRouteChanged.on(() => super.load(), { listener: this });

        await super.load();
    }

    public async unload(): Promise<void> {
        FrontendJS.Router.onRouteChanged.off({ listener: this });

        await super.unload();
    }
}