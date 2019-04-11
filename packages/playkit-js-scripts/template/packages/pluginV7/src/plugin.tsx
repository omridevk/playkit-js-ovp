import { h, render } from "preact";

export class {className} extends KalturaPlayer.core.BasePlugin {
    static defaultConfig = {};
    static isValid(player: any) {
        return true;
    }
}

KalturaPlayer.core.registerPlugin("{pluginName}", {className});
