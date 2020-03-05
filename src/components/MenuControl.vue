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
            @hide="hideSubCtrl"
        >
            <div
                class="menububble animated zoomIn"
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
                                @click="setLinkUrl(commands.link, linkUrl)"
                                type="button"
                            >
                                <i class="fas fa-check"></i>
                            </button>
                            <button
                                class="menububble__button"
                                @click="toggleSubCtrl(false)"
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
                        @click="showLinkMenu(getMarkAttrs('link'))"
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
                        :class="{ 'is-active': isActive.DropCap() }"
                        @click="commands.DropCap"
                    >
                        <div class="btn-inner seperatLeft">
                            <span class="fa-layers fa-fw ">
                                
                                <i class="fas fa-align-justify fa-lg"></i>
                                <i 
                                    class="fas fa-square"
                                    data-fa-transform="shrink-1 left-4 up-4"
                                    style="color:#212121"
                                >
                                </i>
                                <i 
                                    class="fas fa-font" 
                                    data-fa-transform="shrink-2 left-4 up-4"
                                >
                                </i>
                                
                                
                            </span>
                            
                        </div>
                    </div>

                    <div
                        class="menububble__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                    >
                        <div class="btn-inner">
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
            subCtrlName: null
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
            if (!this.isSubCtrlVisible) {
                this.linkUrl = null;
                this.subCtrlName = null;
            }
        },
        setLinkUrl(command, url) {
            command({ href: url });
            this.toggleSubCtrl(false);
        },
        hideSubCtrl() {
            this.toggleSubCtrl(false);
        },
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href;
            this.showSubCtrl("link");
            this.$nextTick(() => {
                this.$refs.linkInput.focus();
            });
        },
        showSubCtrl(name = null) {
            if (name) {
                this.subCtrlName = name;
                this.toggleSubCtrl(true);
            }
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
    input,
    button {
        &:focus-within,
        &:focus {
            outline: inherit !important;
        }
    }
    i {
        margin: 0px;
    }
    .menububble {
        visibility: hidden;
        position: absolute;
        display: flex;
        z-index: 1001;
        margin-left: 10px;
        transform: translateX(-50%);
        &,
        & * {
            transition: 0s !important;
        }
        &,
        & .animated {
            animation-duration: 0.3s !important;
        }
        .subCtrl {
            padding: 0px 0px 0px 10px;
            background: #212121;
            margin: 2px;
            border-radius: 5px;
        }
        .bubbleMainCtrls {
            display: inline-flex;
        }
        &.is-active {
            visibility: visible;
        }
        .menububble__input {
            font: inherit;
            border: none;
            background: transparent;
            color: #fff;
        }
        .menububble__form {
            display: flex;
            align-items: center;
        }
        .menububble__button {
            padding: 5px 0px;
            background: #212121;
            color: snow;
            border: none;
            border-radius: inherit;
            min-width: 40px;
            cursor: pointer;
            .btn-inner {
                padding: 5px 10px;
                text-align: center;
            }
            .seperatLeft {
                border-left: 1px solid #737373;
            }
            .seperatRight {
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