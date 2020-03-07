<template>
    <div class="component-ctrl">
        <div class="menublock wrap">
            <div class="ctrl animated fadeIn hoverhandle">
                <span
                    class="ctr-add fa-stack fa-1x animated infinite float"
                    @click.prevent="toggleCtrl"
                >
                    <i class="far fa-circle fa-stack-2x"></i>
                    <i class="fas fa-plus fa-stack-1x" :class="{'fa-rotate-45':control_visible}"></i>
                </span>
            </div>
            <div
                class="ctrl ctrl-items"
                v-show="control_visible"
                :class="[control_visible?'isActive':'']"
            >
                <ul>
                    <li class="ctrl-item blob">
                        <div class="item">
                            <span class="fa-stack fa-lg animated zoomIn">
                                <i class="far fa-circle fa-stack-2x"></i>
                                <i class="fas fa-camera-retro fa-stack-1x"></i>
                            </span>
                        </div>
                    </li>
                    <li class="ctrl-item blob">
                        <div 
                            class="item"
                            @click="editor.execute( 'horizontalLine' )"
                        >
                            <span class="fa-stack fa-lg animated zoomIn">
                                <i class="far fa-circle fa-stack-2x"></i>
                                <i class="fas fa-ellipsis-h fa-stack-1x"></i>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <svg>
            <defs>
                <filter id="filt">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="filt"
                    />
                    <feBlend in2="filt" in="SourceGraphic" result="mix" />
                </filter>
            </defs>
        </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {
            control_visible: false
        };
    },
    props: {
        menu: {
            required: true
        },
        editor: {
            required: true
        }
    },
    methods: {
        toggleCtrl() {
            this.control_visible = !this.control_visible;
        },
        hideControl() {
            this.control_visible = false;
        }
    }
};
</script>

<style lang="scss">
@keyframes float {
    0% {
        transform: translatey(0px);
    }
    50% {
        transform: translatey(-5px);
    }
    100% {
        transform: translatey(0px);
    }
}

@keyframes harlem {
    0% {
        transform: translate(0);
        -webkit-transform: translate(0);
        -moz-transform: translate(0);
        -o-transform: translate(0);
        -ms-transform: translate(0);
    }
    25% {
        transform: translate(5px, 5px);
        -webkit-transform: translate(5px, 5px);
        -moz-transform: translate(5px, 5px);
        -o-transform: translate(5px, 5px);
        -ms-transform: translate(5px, 5px);
    }
    50% {
        transform: translate(-5px, -5px);
        -webkit-transform: translate(-5px, -5px);
        -moz-transform: translate(-5px, -5px);
        -o-transform: translate(-5px, -5px);
        -ms-transform: translate(-5px, -5px);
    }
    75% {
        transform: translate(2px, 2px);
        -webkit-transform: translate(2px, 2px);
        -moz-transform: translate(2px, 2px);
        -o-transform: translate(2px, 2px);
        -ms-transform: translate(2px, 2px);
    }
    100% {
        transform: translate(0);
        -webkit-transform: translate(0);
        -moz-transform: translate(0);
        -o-transform: translate(0);
        -ms-transform: translate(0);
    }
}

.float {
    animation-name: float;
}

.fa-rotate-45 {
    transform: rotate(45deg);
}

.component-ctrl {
    position: absolute;
    width: 100%;
    left: 0px;
    margin-top: -5px;
    padding-left: 15px;
    padding-right: 5px;
    svg {
        position: absolute;
    }
    .wrap {
        filter: url("#filt");
        z-index: 1000;
        .blob {
            display: inline-block;
            cursor: pointer;
            border: none;
            outline: none;
            padding-left: 15px;
            z-index: 1050;
            box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.3) inset;
            top: 0px;
            left: 0px;
            .animated {
                animation-duration: 0.3s !important;
            }
            transition: all 0.3s ease-in-out !important;
            .item {
                background-color: #555;
                color: snow;
                border-radius: 50%;
                height: 38px;
                width: 38px;
                .fa-stack {
                    background-color: #555;
                    border-radius: 50%;
                    height: 38px;
                    width: 38px;
                    .svg-inline--fa.fa-stack-2x {
                        height: 2em;
                        width: 2em;
                    }
                }
            }
            &:hover {
                color: #f44336;
                animation: harlem 0.5s linear forwards !important;
            }
        }
        .hoverhandle {
            position: absolute;
            z-index: 1050;
            transition: transform 0.2s ease-in-out 0.2s !important;
        }
        & > .ctrl-items {
            position: absolute;
            z-index: 1000;
            padding-left: 35px;
            margin-top: -5px;
        }
    }

    .menublock {
        position: relative;
    }
    .ctr-add {
        cursor: pointer;
        animation-duration: 3s;
        animation-delay: 1s;
        top: 2px;
    }
    i {
        height: 26px;
        transition-duration: 0.2s;
    }
    svg.svg-inline--fa {
        transition-duration: 0.2s;
    }
}
</style>