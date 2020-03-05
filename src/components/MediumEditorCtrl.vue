<template>
    <div id="FeIronEditor">
        <ckeditor
            id="FeIronEditorArea"
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
        ></ckeditor>
    </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";

export default {
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            editor: ClassicEditor,
            editorData: "<p>Content of the editor.</p>",
            editorConfig: {
                plugins: [
                    EssentialsPlugin,
                    BoldPlugin,
                    ItalicPlugin,
                    LinkPlugin,
                    ParagraphPlugin
                ],

                toolbar: {
                    items: ["bold", "italic", "link", "undo", "redo"]
                }
            }
        };
    },
    mounted() {},
    watch: {},
    methods: {},
    beforeDestroy() {}
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