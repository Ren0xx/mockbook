import { TextField, Button } from "@mui/material";
import styles from "@/styles/commentform.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { api } from "@/utils/api";
const validationSchema = yup.object({
    content: yup
        .string()
        .min(1, "Cannot be empty")
        .max(150, "Can't be more than 150 characters")
        .required("This field is required"),
});
type CommentFormProps = {
    postId: string;
    refetchPost: () => void;
};
export default function CommentForm(props: CommentFormProps) {
    const createComment = api.comment.create.useMutation({
        onSuccess: () => {
            void props.refetchPost();
        },
    });
    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            createComment.mutate({
                postId: props.postId,
                content: values.content,
            });
            resetForm();
        },
    });
    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <TextField
                id='content'
                label='Add a comment...'
                multiline
                maxRows={4}
                variant='filled'
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
            />
            <Button
                type='submit'
                variant='contained'
                size='small'
                sx={{ width: 100 }}>
                Post
            </Button>
        </form>
    );
}
