export const noteText = {
    template: `
        <section>
            <h4>{{note.info.title}}</h4>
            <p>{{note.info.txt}}</p>
        </section>
    `,
    props: ['note'],
}

export const noteImg = {
    template: `
        <section>
            <h4>{{note.info.title}}</h4>
            <img :src="note.info.img" alt="">
        </section>
    `,
    props: ['note'],
}