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
    Link
} from "tiptap-extensions";
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
                    new Italic()
                ],
                autoFocus:true,
                editorProps: {

                },
                content: "<p>This is just a boring paragraph</p>"
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