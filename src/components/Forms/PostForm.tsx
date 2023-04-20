import { TextField, Button } from "@mui/material";
import styles from "@/styles/postform.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { api } from "@/utils/api";
const validationSchema = yup.object({
    title: yup
        .string()
        .min(1, "Can't be empty")
        .max(25, "Can't be more than 25 characters")
        .required("This field is required"),
    content: yup
        .string()
        .min(1, "Cannot be empty")
        .max(250, "Can't be more than 250 characters")
        .required("This field is required"),
});
type PostFormProps = {
    refetchPosts: () => void;
};
export default function PostForm(props: PostFormProps) {
    const createPost = api.post.create.useMutation({
        onSuccess: () => {
            void props.refetchPosts();
        },
    });
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            createPost.mutate(values);
            resetForm();
        },
    });
    return (
        <form className={styles.container} onSubmit={formik.handleSubmit}>
            <TextField
                id='title'
                label='Title'
                variant='outlined'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
                id='content'
                label='Content'
                multiline
                maxRows={4}
                variant='filled'
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
            />
            <Button type='submit' variant='contained'>
                Add post
            </Button>
        </form>
    );
}
