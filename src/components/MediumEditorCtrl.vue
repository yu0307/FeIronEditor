<template>
    <div id="FeIronEditor">
        <imguploader :Editor="editor" />
        <menuctrl :editor="editor" :FloatMenuActive="FloatingMenu" ref="menuCtrl"></menuctrl>
        <editor-content :editor="editor" id="FeIronEditorArea" />
    </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
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
    Placeholder,
    HorizontalRule,
    Underline,
    Image,
} from "tiptap-extensions";
import menuctrl from "./MenuControl";
import DropCap from "./extension/DropCap";
import span from "./extension/span";
import ImagePlaceholder from './extension/ImagePlaceholder';
import imguploader from './ImageUploader';
// import testingDoc from "./testing";
export default {
    components: {
        EditorContent,
        menuctrl,
        imguploader
    },
    data() {
        return {
            editor: new Editor({
                autoFocus: true,
                extensions: [
                    new DropCap(),
                    new span(),
                    new Image(),
                    new ImagePlaceholder(),
                    // new testingDoc(),
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
                    new HorizontalRule(),
                    new Underline(),
                    new Placeholder({
                        showOnlyCurrent: false,
                        emptyNodeText: node => {
                            if (
                                node.type.name === "heading" 
                                && node.attrs!==undefined
                                && node.attrs.level==1) {
                                return "Title ...";
                            }
                            return "Write something ...";
                        }
                    })
                ],
                onBlur: () => {
                    this.FloatingMenu.activation = false;
                    this.FloatingMenu.ControlTop = this.FloatingMenu.top;
                    this.FloatingMenu.editorDom = null;
                }
            }),
            FloatingMenu: {
                activation: false,
                top: 0,
                ControlTop: 0,
                cursorDom: null,
                editorDom: null
            }
        };
    },
    mounted() {
        this.$el.addEventListener("mouseleave", () => {
            this.FloatingMenu.activation = this.editor.focused || false;
            if (this.editor.focused) {
                this.FloatingMenu.top = null;
            }
            this.FloatingMenu.cursorDom = null;
        });

        let EditorCtrl = this.$el.querySelector("#FeIronEditorArea");

        EditorCtrl.addEventListener(
            "mouseover",
            e => {
                this.FloatingMenu.activation = true;
                if (e.target.parentElement.classList.contains("ProseMirror")) {
                    this.FloatingMenu.top = this.ComputeLocation(e.target);
                    this.FloatingMenu.cursorDom = e.target;
                }
            },
            true
        );
    },
    watch: {
        FloatingMenu: {
            deep: true,
            handler(newV) {
                return newV;
            }
        },
        "editor.selection.from": {
            deep: true,
            handler() {
                if (this.editor.focused) {
                    let node = this.editor.view.domAtPos(
                        this.editor.state.selection.anchor
                    ).node;
                    if (node.nodeName == "#text") {
                        node = node.parentNode;
                    }
                    this.FloatingMenu.top = this.FloatingMenu.ControlTop = this.ComputeLocation(
                        node
                    );
                    this.FloatingMenu.editorDom = this.FloatingMenu.cursorDom = node;
                }
            }
        }
    },
    methods: {
        ComputeLocation(target) {
            return target.offsetTop + target.getBoundingClientRect().height / 2;
        }
    },
    beforeDestroy() {
        this.editor.destroy();
    }
};
</script>
<style lang="scss">
#FeIronEditor {
    * {
        transition: 0.3s;
    }
    h1 {
        font-size: 25px;
    }
    margin: 10px;
    padding-left: 35px;
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
            *.is-empty:before {
                content: attr(data-empty-text);
                float: left;
                color: #aaa;
                pointer-events: none;
                height: 0;
                font-style: italic;
            }
            a {
                cursor: pointer;
                text-decoration: underline;
                color: #294985;
            }
            ul {
                margin-left: 10px;
                list-style-type: circle;
            }
            hr {
                overflow: visible;
                content: "";
                background-color: #3c3c3c;
                display: block;
                height: 5px;
                width: 5px;
                border-radius: 50%;
                position: relative;
                box-sizing: content-box;
                line-height: 0px;
                padding: 0px;
                border: none;
                margin: 10px auto;
                pointer-events: none;
                &:before {
                    content: "" !important;
                    background-color: #3c3c3c;
                    display: block;
                    height: 5px !important;
                    width: 5px;
                    border-radius: 50%;
                    position: absolute;
                    left: -25px;
                    -webkit-animation: dot-move-left 1s ease-out forwards;
                    animation: dot-move-left 1s ease-out forwards;
                }
                &:after {
                    content: "" !important;
                    background-color: #3c3c3c;
                    display: block;
                    height: 5px !important;
                    width: 5px;
                    border-radius: 50%;
                    position: absolute;
                    left: 25px;
                    -webkit-animation: dot-move-left 1s ease-out forwards;
                    animation: dot-move-left 1s ease-out forwards;
                }
            }
            .dropCap :first-child:first-letter {
                float: left;
                font-size: 50px;
                line-height: 40px;
                padding: 2px;
                text-transform: uppercase;
            }
        }
    }
}
</style>