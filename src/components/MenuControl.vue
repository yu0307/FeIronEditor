<template>
    <div class="MedMenus" :class="[FloatMenuActived ? 'floatIsActive' : '']">
        <menuoptions
            :editor="editor"
            v-show="FloatMenuActived"
            ref="menuOptions"
            :style="`top: ${FloatMenuActive.top?FloatMenuActive.top:FloatMenuActive.ControlTop}px`"
            :menu="FloatMenuActive"
        />

        <editor-menu-bubble
            :editor="editor"
            :keep-in-bounds="true"
            v-slot="{ commands, isActive, getMarkAttrs, menu }"
        >
            <div
                class="menububble"
                :class="{ 'is-active': menu.isActive }"
                :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
            >
                <div class="subCtrl animated zoomIn" v-show="isSubCtrlVisible">
                    <div v-show="subCtrlName=='link'">
                        <form
                            class="menububble__form"
                            @submit.prevent="setLinkUrl(commands.link, linkUrl)"
                        >
                            <input
                                class="menububble__input"
                                type="text"
                                v-model="linkUrl"
                                placeholder="https://"
                                ref="linkInput"
                                @keydown.esc="toggleSubCtrl(false)"
                            />
                            <button
                                class="menububble__button"
                                @click="setLinkUrl(commands.link, null)"
                                type="button"
                            >
                                <i class="far fa-times-circle"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="bubbleMainCtrls animated zoomIn" v-show="!isSubCtrlVisible">
                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                    >
                        <div class="btn-inner">
                            <i class="fas fa-bold"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                    >
                        <div class="btn-inner">
                            <i class="fas fa-italic"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                    >
                        <div class="btn-inner">
                            <i class="fas fa-underline"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.link() }"
                        @click="commands.link"
                    >
                        <div class="btn-inner">
                            <i class="fas fa-link"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code"
                    >
                        <div class="btn-inner seperatLeft">
                            <i class="fas fa-code"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                    >
                        <div class="btn-inner">
                            <i class="fas fa-list-ul"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                    >
                        <div class="btn-inner">
                            <i class="fas fa-quote-right"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                    >
                        <div class="btn-inner seperatLeft">
                            <i class="fas fa-heading fa-lg"></i>
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                    >
                        <div class="btn-inner">
                            <i class="fas fa-heading"></i>
                        </div>
                    </div>
                </div>
            </div>
        </editor-menu-bubble>
    </div>
</template>

<script>
import { EditorMenuBubble } from "tiptap";
import menuoptions from "./menuOptions";
export default {
    data() {
        return {
            menuIsActive: false,
            focusedLocation: 0,
            linkUrl: null,
            isSubCtrlVisible: false,
            subCtrlName:null
        };
    },
    components: {
        menuoptions,
        EditorMenuBubble
    },
    computed: {
        FloatMenuActived() {
            return (
                this.FloatMenuActive.activation ||
                this.menuIsActive ||
                this.editor.focused
            );
        }
    },
    props: {
        editor: {
            required: true
        },
        FloatMenuActive: {
            required: false,
            default: {
                activation: false,
                top: 0,
                ControlTop: 0
            }
        }
    },
    methods: {
        toggleSubCtrl(tarVal = null) {
            this.isSubCtrlVisible =
                tarVal === null ? !this.isSubCtrlVisible : tarVal;
        },
        setLinkUrl(command, url) {
            command({ href: url });
        }
    },
    mounted() {
        this.$el.addEventListener("mouseover", () => {
            this.menuIsActive = true;
        });
        this.$el.addEventListener("mouseleave", () => {
            this.menuIsActive = false;
            this.$refs.menuOptions.hideControl();
        });
    }
};
</script>

<style lang='scss'>
.MedMenus {
    .menububble {
        visibility: hidden;
        position: absolute;
        display: flex;
        transform: translateX(-50%);
        z-index: 1001;
        margin-left: 10px;
        .bubbleMainCtrls {
            display: inline-flex;
        }
        &.is-active {
            visibility: visible;
        }
        .animated {
            animation-duration: 0.2s !important;
            transition: 0.2s !important;
        }
        .menububble__button {
            padding: 5px 0px;
            background: #212121;
            color: snow;
            border: none;
            border-radius: inherit;
            min-width: 40px;
            cursor: pointer;
            animation-duration: 0.2s !important;
            transition: 0.2s !important;
            .btn-inner {
                padding: 5px 10px;
                text-align: center;
            }
            .seperatLeft {
                animation-duration: 0s !important;
                transition: 0s !important;
                border-left: 1px solid #737373;
            }
            .seperatRight {
                animation-duration: 0s !important;
                transition: 0s !important;
                border-right: 1px solid #737373;
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