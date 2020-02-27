<template>
    <div id="FeIronEditor">
        <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu }">
            <menuoptions
                :menu="menu" 
            />
        </editor-floating-menu>
        <editor-content 
            :editor="editor" 
            id="FeIronEditorArea" 
        />
    </div>
</template>

<script>

import { Editor, EditorContent, EditorFloatingMenu } from "tiptap";
import {
    Blockquote,
    BulletList,
    CodeBlock,
    HardBreak,
    Heading,
    ListItem,
    OrderedList,
    Bold,
    Code,
    Italic,
    Link,
    Placeholder 
} from "tiptap-extensions";
import h1 from './Header1';
import doc from './Doc';
import menuoptions from "./menuOptions";
export default {
    components: {
        EditorContent,
        EditorFloatingMenu,
        menuoptions
    },
    data() {
        return {
            editor: new Editor({
                autoFocus:true,
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new ListItem(),
                    new OrderedList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new h1(),
                    new doc(),
                    new Placeholder({
                        showOnlyCurrent: false,
                        emptyNodeText: node => {
                        if (node.type.name === 'header1') {
                            return 'Title ...'
                        }
                        return 'Write something ...'
                        },
                    }),

                ]
            }),
            FloatingMenu:null
        };
    },
    beforeDestroy() {
        this.editor.destroy();
    }
};
</script>
<style lang="scss">
#FeIronEditor {
    * {
        transition: 0.5s;
    }
    h1{
        font-size: 25px;
    }
    margin: 20px 20px 10px 50px;
    #FeIronEditorArea {
        .ProseMirror {
            & * {
                margin-bottom: 10px;
            }
            & > * {
                padding-left: 10px;
                border: 1px solid transparent;
                padding: 5px 0px;
                line-height: 30px;
                &:hover,
                &:focus-within,
                &:hover {
                    border: 1px dotted rgb(195, 195, 195);
                }
            }
            &:focus-within,
            &:focus {
                outline: inherit;
            }
            *.is-empty:before{
            content: attr(data-empty-text);
            float: left;
            color: #aaa;
            pointer-events: none;
            height: 0;
            font-style: italic;
            }
        }
    }
    .floating-menu {
        position: absolute;
        z-index: 1;
        margin-top: -0.25rem;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.2s, visibility 0.2s;
        &.is-active {
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>