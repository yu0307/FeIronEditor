import { Node } from 'tiptap'

export default class Header1 extends Node {

    get name() {
        return 'header1'
    }

    get schema() {
        return {
            content: 'inline*',
            parseDOM: [{
                tag: 'h1',
            }],
            toDOM: () => ['h1', 0],
        }
    }

}