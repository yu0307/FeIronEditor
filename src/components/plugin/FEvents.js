import { Plugin, PluginKey } from 'prosemirror-state'

class FEvents {

    constructor({ options, editorView }) {
        this.options = {
            ...{
                element: null,
                onUpdate: () => false,
            },
            ...options,
        }
        this.editorView = editorView

        this.options.element.querySelector('.ctrl-item').addEventListener('mouseover', (e)=>{
            console.log('hovering!');
            console.log(e);
            this.options.root.$emit('eventFired');
        });

    }
}

export default function (options) {
    return new Plugin({
        key: new PluginKey('FEvents'),
        view(editorView) {
            return new FEvents({ editorView, options })
        },
    })
}
