<template>
    <div id="FeIronEditor" @mouseleave="hideFloat" @mouseover.capture="moveFloat">
        <menuctrl :editor="editor_instance" :FloatMenuActive="FloatingMenu" ref="menuCtrl"></menuctrl>
        <div 
            class="EditorWrapper" 
            @keydown.shift.tab.capture.stop.prevent="editor_instance.execute( 'outdent' )"
            @keydown.tab.exact.prevent="editor_instance.execute( 'indent' )"
        >
            <ckeditor
                ref="ckEditor"
                :editor="editor"
                v-model="editorData"
                :config="editorConfig"
                @ready="EditorReady"
                @blur="onEditorBlur"
                id="FeIronEditorArea"
            ></ckeditor>
        </div>
    </div>
</template>

<script>
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

import CKEditor from "@ckeditor/ckeditor5-vue";
import ballooneditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";

import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import code from "@ckeditor/ckeditor5-basic-styles/src/code/codeediting";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import blockquote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import codeblock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import heading from "@ckeditor/ckeditor5-heading/src/heading";
import HeadingButtonsUI from "@ckeditor/ckeditor5-heading/src/headingbuttonsui";
import Indentediting from "@ckeditor/ckeditor5-indent/src/indentediting";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import automediaembed from "@ckeditor/ckeditor5-media-embed/src/automediaembed";
import autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import autosave from "@ckeditor/ckeditor5-autosave/src/autosave";
import horizontalline from "@ckeditor/ckeditor5-horizontal-line/src/horizontallineediting";
import image from "@ckeditor/ckeditor5-image/src/image";
import imagestyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import imagecaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import List from "@ckeditor/ckeditor5-list/src/list";
import Title from "@ckeditor/ckeditor5-heading/src/title";
import menuctrl from "./MenuControl";

export default {
    components: {
        ckeditor: CKEditor.component,
        menuctrl
    },
    data() {
        return {
            editor: ballooneditor,
            editor_instance: null,
            editorData: "Start with a Title ...",
            editorConfig: {
                tabSpaces: 4,
                plugins: [
                    EssentialsPlugin,
                    BoldPlugin,
                    code,
                    underline,
                    ItalicPlugin,
                    LinkPlugin,
                    Alignment,
                    blockquote,
                    codeblock,
                    HeadingButtonsUI,
                    List,
                    Indentediting,
                    IndentBlock,
                    heading,
                    Title,
                    ParagraphPlugin,
                    autoformat,
                    autosave,
                    automediaembed,
                    horizontalline,
                    image,
                    imagestyle,
                    imagecaption
                ],
                toolbar: {
                    items: [
                        "bold",
                        "italic",
                        "link",
                        "|",
                        "alignment",
                        "heading1",
                        "heading2",
                        "blockquote",
                        "|",
                        "bulletedList",
                        "codeblock"
                    ]
                },
                alignment: {
                    options: ["left", "center", "right"]
                },
                image: {
                    toolbar: [
                        "imageTextAlternative",
                        "|",
                        "imageStyle:alignLeft",
                        "imageStyle:full",
                        "imageStyle:alignRight"
                    ],

                    styles: [
                        "full",
                        "side",
                        "alignCenter",
                        "alignLeft",
                        "alignRight"
                    ]
                },
                heading: {
                    options: [
                        {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph"
                        },
                        {
                            model: "heading1",
                            view: "h2",
                            title: "Heading 1",
                            class: "ck-heading_heading1"
                        },
                        {
                            model: "heading2",
                            view: "h3",
                            title: "Heading 2",
                            class: "ck-heading_heading2"
                        },
                        {
                            model: "heading3",
                            view: "h4",
                            title: "Heading 3",
                            class: "ck-heading_heading3"
                        }
                    ]
                }
            },
            FloatingMenu: {
                activation: false,
                top: 0,
                ControlTop: 0
            }
        };
    },
    watch: {
        FloatingMenu: {
            deep: true,
            handler(newV) {
                return newV;
            }
        }
    },
    methods: {
        ComputeLocation(target) {
            return target.offsetTop + target.getBoundingClientRect().height / 2;
        },
        hideFloat() {
            this.FloatingMenu.activation =
                this.editor_instance.ui.focusTracker.isFocused || false;
            if (this.editor_instance.ui.focusTracker.isFocused) {
                this.FloatingMenu.top = null;
            }
        },
        moveFloat(e) {
            if (e.target.parentElement.classList.contains("ck-content")) {
                this.FloatingMenu.activation = true;
                this.FloatingMenu.top = this.ComputeLocation(e.target);
            }
        },
        setFloatLocation(node = null) {
            node = node ? node : document.getSelection().anchorNode;
            this.FloatingMenu.top = this.FloatingMenu.ControlTop = this.ComputeLocation(
                node.nodeType == 3 ? node.parentNode : node
            );
        },
        onEditorBlur() {
            this.FloatingMenu.activation = false;
            this.FloatingMenu.ControlTop = this.FloatingMenu.top;
        },
        EditorReady() {
            this.editor_instance = this.$refs.ckEditor.instance;

            CKEditorInspector.attach(this.editor_instance);
            this.editor_instance.sourceElement.addEventListener("keyup", e => {
                if (
                    e.key == "Enter" ||
                    e.key == "ArrowDown" ||
                    e.key == "ArrowUp" ||
                    e.key == "ArrowLeft" ||
                    e.key == "ArrowRight"
                ) {
                    this.setFloatLocation();
                }
            });
            this.editor_instance.sourceElement.addEventListener("click", e => {
                this.setFloatLocation(e.target);
            });
        }
    },
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
    #FeIronEditorArea.ck-content {
        position: relative;
        border: 1px solid transparent;
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
            &:focus {
                border: 1px dotted rgb(195, 195, 195);
                outline: inherit;
            }
        }
        &:focus-within,
        &:focus {
            outline: inherit;
        }
        &.ck-focused {
            border: 1px solid transparent;
            box-shadow: none;
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
        ol {
            margin-left: 8px;
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
    }
}
.ck.ck-balloon-panel {
    &,
    & .ck-toolbar {
        background: #212121;
        color: snow;
        border-radius: 5px !important;
        button,
        .ck-dropdown__button {
            &,
            &:hover {
                cursor: pointer;
                background: #212121 !important;
                color: snow;
            }
        }
    }
    .ck-toolbar__separator {
        margin-top: 8px !important;
        margin-bottom: 8px !important;
    }
    &:before,
    &:after {
        border: none;
        border-style: none !important;
    }
}
</style>