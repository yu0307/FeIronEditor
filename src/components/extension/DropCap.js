import { Node } from 'tiptap'
import { toggleWrap } from 'tiptap-commands'
export default class DropCap extends Node {

    get name() {
        return 'DropCap'
    }

     get schema() { 
        return {//Node Specs https://prosemirror.net/docs/ref/#model.NodeSpec
            content: 'block*',
            group: "block",
            toDOM: () => {//https://prosemirror.net/docs/ref/#model.DOMOutputSpec
                return ["p", {
                    class: 'dropCap',
                },0];
            },
            parseDOM: [//https://prosemirror.net/docs/ref/#model.ParseRule
                {
                    tag:'p[class="dropCap"]'
                }
            ]
        }
    }
    commands({ type, schema }) {
        return () => toggleWrap(type, schema.nodes.paragraph);
    }
}