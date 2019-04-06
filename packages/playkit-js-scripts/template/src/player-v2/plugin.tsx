import { h, render } from "preact";


(function(mw, $) {
  mw.kalturaPluginWrapper(function() {
    mw.PluginManager.add("{{plugin_name}}", mw.KBaseComponent.extend({}));
  });
})((window as any).mw, (window as any).jQuery);
