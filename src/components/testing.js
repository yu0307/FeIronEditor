import { Doc } from 'tiptap'

export default class testingDoc extends Doc {

    get schema() {
        return {
            content: 'block+',
        }
    }

}