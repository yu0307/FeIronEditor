<script>
import events from './FEvents'

export default {

  props: {
    editor: {
      default: null,
      type: Object,
    },
    targetEl:null
  },

  data() {
    return {

    }
  },

  watch: {
    editor: {
      immediate: true,
      handler(editor) {
        if (editor) {
          this.$nextTick(() => {
            editor.registerPlugin(FEvents({
              editor,
              element: targetEl,
              root: this.$el
            }))
          })
        }
      },
    },
  },
  beforeDestroy() {
    this.editor.unregisterPlugin('FEvents')
  },

}

</script>