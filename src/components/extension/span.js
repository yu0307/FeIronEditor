import { toggleMark } from 'tiptap-commands'
import { Mark } from 'tiptap'

export default class span extends Mark {

    get name() {
        return 'span';
    }

    get schema() {
        return {
            toDOM: () => {
                return ['span', 0];
            },
            parseDOM: [{
                tag: 'span'
            }]
        }
    }
    commands({ type }) {
        return () => toggleMark(type);
    }
}
