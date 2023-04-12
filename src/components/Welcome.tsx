import { signIn } from "next-auth/react";

const Welcome: React.FC = () =>  {
    return <div>
        <button onClick={() => void signIn()} className='btn-primary btn'>
            Sign In
        </button>
    </div>;
}
export default Welcome;