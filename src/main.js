import { Block, Tune } from './web-components/dist/components.js';
import Store from './store';
import icon from './icon.svg?raw';

export default class Plugin {
    static get toolbox() {
        return {
            title: _PLUGIN_NAME_,
            icon: icon,
        };
    }

    registerWebComponents() {
        if(customElements.get( this.tuneComponentName ) === undefined) {
            customElements.define( this.tuneComponentName, Tune);
        }

        if(customElements.get( this.blockComponentName ) === undefined) {
            customElements.define( this.blockComponentName, Block);
        }
    }

    constructor({data, config, api }){
        this.tuneComponentName = `editorjs-${ _PLUGIN_NAME_.toLocaleLowerCase() }-tune`;
        this.blockComponentName = `editorjs-${ _PLUGIN_NAME_.toLocaleLowerCase() }-block`;
        this.registerWebComponents();

        this.store = Store({
            items: data?.items || [],
            settings: data?.settings || { allowDelete : false },
        });
    }

    renderSettings() {
        const component = document.createElement( this.tuneComponentName );
        component.setStore( this.store );
        return component;
    }

    render(){
        const component = document.createElement( this.blockComponentName );
        component.setStore( this.store );
        return component;
    }

    save(blockContent){
        console.log('upd');
        return this.store.get()
    }
}