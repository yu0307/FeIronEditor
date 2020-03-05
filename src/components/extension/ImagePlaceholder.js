import { Node } from 'tiptap'
import { Plugin } from "prosemirror-state"
import { Decoration, DecorationSet } from "prosemirror-view"

let placeholderPlugin = new Plugin({
    state: {
        init() { return DecorationSet.empty },
        apply(tr, set) {
            // Adjust decoration positions to changes made by the transaction
            set = set.map(tr.mapping, tr.doc)
            // See if the transaction adds or removes any placeholders
            let action = tr.getMeta(this)
            if (action && action.add) {
                let widget = document.createElement("placeholder")
                let deco = Decoration.widget(action.add.pos, widget, { id: action.add.id })
                set = set.add(tr.doc, [deco])
            } else if (action && action.remove) {
                set = set.remove(set.find(null, null,
                    spec => spec.id == action.remove.id))
            }
            return set
        }
    },
    props: {
        decorations(state) { return this.getState(state) }
    }
})

export default class ImagePlaceholder extends Node {

    get name() {
        return 'imageplaceholder';
    }
    get schema() {
        return {
            inline: true,
            attrs: {
                src: {
                    default:'/placeholder.png'
                },
                alt: {
                    default: null,
                },
                title: {
                    default: null,
                },
                isEmpty: {
                    default: true,
                }
            },
            group: 'inline',
            draggable: true,
            parseDOM: [
                {
                    tag: 'img[src]',
                    getAttrs: dom => ({
                        src: dom.getAttribute('src'),
                        title: dom.getAttribute('title'),
                        alt: dom.getAttribute('alt'),
                        isEmpty: dom.getAttribute('isEmpty')
                    }),
                },
            ],
            toDOM: node => ['img', node.attrs],
        }
    }

    commands({ type }) {
        return attrs => (state, dispatch) => {
            let id = {};
            const { selection } = state;
            let transaction = state.tr;
            if (!transaction.selection.empty) transaction.deleteSelection();
            const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
            const node = type.create(attrs);
            transaction.insert(position, node);
            transaction.setMeta(placeholderPlugin, { add: { id, pos: position } })
            
            dispatch(transaction);
            return { state, placeholderPlugin, position,id };
        }
    }

    get update() {
        return view => {
            view.updateState(view.state)
        }
    }

}