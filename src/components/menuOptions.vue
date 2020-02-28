<template>
    <div 
        class="component-ctrl"
    >
        <div class="menublock" >
            <div class="ctrl animated fadeIn " >
                <span class="ctr-add fa-stack fa-1x animated infinite float" @click.prevent="toggleCtrl">
                    <i class="far fa-circle fa-stack-2x"></i>
                    <i class="fas fa-plus fa-stack-1x" :class="{'fa-rotate-45':control_visible}"></i>
                </span>
            </div>
            <div class="ctrl ctrl-items" v-show="control_visible" >
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
    watch:{
        'menu.top':{
            deep:true,
            handler(NewV){
                this.$emit('UpdateMenuLocation',NewV);
                this.hideControl();
            }
        },
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
    margin-top: -5px;
    padding-left: 15px;
    padding-right: 5px;
    .menublock{
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
        transition-duration: 0.2s;
    }
    .ctrl{
        display: inline-block;
        vertical-align: middle;
        &.ctrl-items{
            position: relative;
            z-index: 1000;
            padding-left: 15px;
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