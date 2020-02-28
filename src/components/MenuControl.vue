<template>
  <div class="MedMenus">
        <editor-floating-menu 
            :editor="editor" 
            v-slot="{ commands, isActive, menu }"
            v-show="FloatMenuActived"
        >
            <menuoptions 
                ref="menuOptions"
                :style="`top: ${FloatMenuActive.top?FloatMenuActive.top:menu.top}px`"
                :menu="menu"
                @UpdateMenuLocation="updateFloatLocation"
            />
        </editor-floating-menu>

        <editor-menu-bubble
            :editor="editor"
            :keep-in-bounds="true"
            v-slot="{ commands, isActive, menu }"
        >
            <div
                class="menububble"
                :class="{ 'is-active': menu.isActive }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
            >
                <button
                    class="menububble__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                >
                    Bold
                </button>

                <button
                    class="menububble__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                >
                    Italic
                </button>

                <button
                    class="menububble__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                >
                    Code
                </button>
            </div>
        </editor-menu-bubble>
  </div>
</template>

<script>
import { EditorMenuBubble  } from "tiptap";
import menuoptions from "./menuOptions";
import EditorFloatingMenu from "./floatMenuCtrl";
export default {
    data(){
        return {
            menuIsActive:false
        }
    },
    components: {
        EditorFloatingMenu,
        menuoptions,
        EditorMenuBubble 
    },
    computed:{
        FloatMenuActived(){
            return this.FloatMenuActive.activation || this.menuIsActive;
        }
    },
    props:{
        editor:{
            required:true
        },
        FloatMenuActive:{
            required:false,
            default:{
                activation:false,
                top:0
            }
        }
    },
    methods:{
        updateFloatLocation(location){
            this.FloatMenuActive.top=location;
        }
    },
    mounted(){
        
        this.$el.addEventListener('mouseover',()=>{
            this.menuIsActive=true;
        });
        this.$el.addEventListener('mouseleave',()=>{
            this.menuIsActive=false;
            this.$refs.menuOptions.hideControl();
        });
    }
}
</script>

<style lang='scss'>
    .MedMenus{
        .menububble{
            visibility: hidden;
            position: absolute;
            display:flex;
            transform: translateX(-50%);
            z-index: 1001;
            &.is-active{
                visibility:visible;
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