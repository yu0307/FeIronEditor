<template>
    <div 
        
        class="component-ctrl"
        :style="`top: ${menu.top}px`"
    >
        <div class="menublock" v-show="menu.isActive">
            <div class="ctrl animated fadeIn " >
                <span class="ctr-add fa-stack fa-1x animated infinite float" @click="toggleCtrl">
                    <i class="far fa-circle fa-stack-2x"></i>
                    <i class="fas fa-plus fa-stack-1x" :class="{'fa-rotate-45':control_visible}"></i>
                </span>
            </div>
            <div class="ctrl ctrl-items" v-show="control_visible">
                <ul>
                    <li class="ctrl-item">
                        <span class="fa-stack fa-1x animated zoomIn">
                            <i class="far fa-circle fa-stack-2x"></i>
                            <i class="fas fa-camera-retro fa-stack-1x"></i>
                        </span>
                    </li>
                    <li class="ctrl-item">
                        <span class="fa-stack fa-1x animated zoomIn">
                            <i class="far fa-circle fa-stack-2x"></i>
                            <i class="fas fa-ellipsis-h fa-stack-1x"></i>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            control_visible:false
        }
    },
    props:{
        menu:{
            required:true
        }
    },
    methods:{
        toggleCtrl(){
            this.control_visible=!this.control_visible;
        },
        hideControl(){
            this.control_visible=false;
        }
    }
}
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
.float{
    animation-name: float;
}
.fa-rotate-45 {
    transform: rotate(45deg);
}
.component-ctrl{
    position: absolute;
    left: 10px;
    .menublock{
        bottom: 5px;
        position: relative;
    }
    .ctr-add{
        cursor: pointer;
        animation-duration: 3s;
        animation-delay: 1s;
        top: 2px;
    }
    i{
        height: 26px;
        transition-duration: 0.3s;
    }
    .ctrl{
        display: inline-block;
        vertical-align: middle;
        &.ctrl-items{
            position: relative;
            z-index: 1000;
            margin-left: 15px;
        }
        .ctrl-item{
            display: inline-block;
            cursor: pointer;
            min-width: 15px;
            .fa-stack{
                animation-duration: 0.2s;
                i{
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>