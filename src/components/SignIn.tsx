import { signIn } from "next-auth/react";
import Layout from "./Layout";
const SignIn: React.FC = () => {
    return (
        <Layout>
            <button onClick={() => void signIn()} className='btn-primary btn'>
                Sign In
            </button>
        </Layout>
    );
};
export default SignIn;
