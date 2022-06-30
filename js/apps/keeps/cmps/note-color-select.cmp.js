export default {
    template: `
    <div class="note-colors-palette-container">
        <div class="note-colors-palette white" @click="onChangeNoteColor('ffffff')"></div>
        <div class="note-colors-palette peach" @click="onChangeNoteColor('f28b82')"></div>
        <div class="note-colors-palette orange" @click="onChangeNoteColor('fbbc04')"></div>
        <div class="note-colors-palette yellow" @click="onChangeNoteColor('fff475')"></div>
        <div class="note-colors-palette green" @click="onChangeNoteColor('ccff90')"></div>
        <div class="note-colors-palette teal" @click="onChangeNoteColor('a7ffeb')"></div>
        <div class="note-colors-palette light-blue" @click="onChangeNoteColor('cbf0f8')"></div>
        <div class="note-colors-palette dark-blue" @click="onChangeNoteColor('aecbfa')"></div>
        <div class="note-colors-palette purple" @click="onChangeNoteColor('d7aefb')"></div>
        <div class="note-colors-palette pink" @click="onChangeNoteColor('fdcfe8')"></div>
        <div class="note-colors-palette grey" @click="onChangeNoteColor('e8eaed')"></div>
    </div>
`,
    data() {
        return {};
    },
    created() {},
    methods: {
        onChangeNoteColor(color) {
            this.$emit('colorPicked', color)
        }
    },
    computed: {},
    unmounted() {},
};