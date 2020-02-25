<template>

  <editorctrl>
    
  </editorctrl>

</template>

<script>
import editorctrl from './components/MediumEditorCtrl';
export default {
    name: "BaseEditor",
    components: {
        editorctrl
    }
};
</script>

<style lang="scss">
* {
    transition: 0.5s;
}
body {
    padding: 20px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
    position: relative;
    padding: 20px;
    img {
        display: inline-block;
        max-height: 100px;
    }
}
</style>
