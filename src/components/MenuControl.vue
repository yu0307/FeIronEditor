<template>
    <div class="MedMenus" :class="[FloatMenuActived ? 'floatIsActive' : '']">
        <menuoptions
            :editor="editor"
            v-show="FloatMenuActived"
            ref="menuOptions"
            :style="`top: ${FloatMenuActive.top?FloatMenuActive.top:FloatMenuActive.ControlTop}px`"
            :menu="FloatMenuActive"
        />
    </div>
</template>

<script>
import menuoptions from "./menuOptions";

export default {
    data() {
        return {
            menuIsActive: false,
        };
    },
    components: {
        menuoptions
    },
    computed: {
        FloatMenuActived() {
            return (
                this.FloatMenuActive.activation
                || this.menuIsActive 
                || (this.editor && this.editor.ui.focusTracker.isFocused)
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
    z-index: 1000;
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

    .floating-menu {
        position: absolute;
        z-index: 1030;
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