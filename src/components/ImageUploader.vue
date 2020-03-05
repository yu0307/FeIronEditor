<template>
    <div class="img_upload">
        <input type="file" id="testFile" @change="checkInput" />
        <button @click.prevent="test">test</button>
    </div>
</template>

<script>
export default {
    name: "imguploader",
    props: {
        Editor: {
            required: true
        }
    },
    data() {
        return {};
    },
    methods: {
        checkInput(e) {
            if (e.target.files.length) {
                this.startImageUpload(this.Editor.view, e.target.files[0]);
            }
            this.Editor.view.focus();
        },
        // startImageUpload(view) {
        //     // let id = {};
        //     // let tr = view.state.tr;
        //     // if (!tr.selection.empty) tr.deleteSelection();
        //     // tr.setMeta(placeholderPlugin, {
        //     //     add: { id, pos: tr.selection.from }
        //     // });
        //     // view.dispatch(tr);
        // },
        test() {
            let rst = this.Editor.commands.imageplaceholder();
            
            setTimeout(() => {
                let found = rst.placeholderPlugin.getState(rst.state).find(null, null, spec => spec.id == rst.id);
                let pos= found.length ? found[0].from : null;
                if (rst.position == null) return;
                let view = this.Editor.view;
                view.dispatch(
                    view.state.tr.replaceWith(
                        pos,
                        pos,
                        this.Editor.schema.nodes.image.create({
                            src:
                                "https://png.pngtree.com/png-clipart/20190515/original/pngtree-beautiful-hologram-water-color-frame-png-image_3643167.jpg"
                        }).setMeta(rst.placeholderPlugin, {remove: {id:rst.id}})
                    )
                );
            }, 1000);

            // rst.dispatch(
            //     rst.transaction.replaceWith(
            //         rst.position,
            //         rst.position,
            //         this.Editor.schema.nodes.image.create({
            //             src: 'https://png.pngtree.com/png-clipart/20190515/original/pngtree-beautiful-hologram-water-color-frame-png-image_3643167.jpg'
            //             })
            //     )
            // );
        },
    }
};
</script>

<style>
</style>