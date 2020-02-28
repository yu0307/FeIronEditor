<template>
    <div id="FeIronEditor">
        <menuctrl
            :editor="editor"
            :FloatMenuActive="FloatingMenu"
        >

        </menuctrl>
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
    Placeholder
} from "tiptap-extensions";
import h1 from "./Header1";
import doc from "./Doc";
import menuctrl from "./MenuControl";
export default {
    components: {
        EditorContent,
        menuctrl
    },
    data() {
        return {
            editor: new Editor({
                autoFocus: true,
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
                            if (node.type.name === "header1") {
                                return "Title ...";
                            }
                            return "Write something ...";
                        }
                    })
                ],
                onBlur: () => {
                    this.FloatingMenu.activation= false; 
                },
            }),
            FloatingMenu: {
                activation:false,
                top:0
            }
        };
    },
    mounted(){
        
        this.$el.addEventListener('mouseleave',()=>{
            this.FloatingMenu.activation= this.editor.focused || false;  
            if(this.editor.focused){
                this.FloatingMenu.top=null;
            }
        });


        this.$el.querySelector('#FeIronEditorArea').addEventListener('mouseover',(e)=>{
            this.FloatingMenu.activation=true;
            if(e.target.parentElement.classList.contains('ProseMirror')){
                this.ComputeLocation(e.target);
            }
        },true);
    },
    watch:{
        FloatingMenu:{
            deep:true,
            handler(newV){
                return newV;
            }
        }
    },
    methods:{
        ComputeLocation(target){
            this.FloatingMenu.top=target.getBoundingClientRect().top-7;
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
        }
    }
}
</style>