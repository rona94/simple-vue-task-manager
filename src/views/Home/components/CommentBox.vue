<template>
    <div class="comments">
        <div>
            <p class="comment-title">Comments</p>
            <template v-for="comment in comments" :key="comment.id">
                <div class="comment" v-if="comment.task_id == id">
                    <p class="comment__name">{{ comment.comment_by }}</p>
                    <div class="comment__comment" v-html="comment.comment" />
                </div>
            </template>
        </div>
        <form @submit.prevent="handleSubmit">
            <textarea name="comment" class="textarea"></textarea>
            <div>
                <button class="btn">Add Comment</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ["id"],
    computed: {
        ...mapGetters({comments: "getComments"})
    },
    methods: {
        ...mapActions(["fetchComments", "addComment"]),
        handleSubmit(e) {
            const { comment } = e.target

            const data = {
                task_id: this.id,
                comment_by: "Rona",
                comment: comment.value
            }

            comment.value = ""

            this.addComment(data)
            this.$nextTick(() => {
                setTimeout(() => {
                    this.fetchComments()
                }, 100)
            })
        }
    },
    mounted() {
        this.fetchComments()
    }
}
</script>

<style scoped>
.comments {
    border-top: 1px solid #eee;
}
.textarea {
    width: 100%;
    resize: none;
    height: 60px;
    margin-top: 10px;
}
.btn {
    width: 100%;
}
.comment {
    padding: 10px 10px;
}
.comment:not(:last-child) {
    border-bottom: 1px solid #eee;
}
.comment__name {
    font-weight: bold;
}
.comment-title {
    margin: 0;
    padding: 15px 10px 0; 
    font-weight: bold;
    font-size: 18px;
}
.comment__name,
.comment__comment {
    margin: 0;
    font-size: 14px;
}
.comment__comment {
    white-space: pre;
}
</style>