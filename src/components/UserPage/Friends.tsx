import { type RouterOutputs } from "@/utils/api";
type User = RouterOutputs["user"]["deleteOne"];
type UserProps = {
    friends: User[] | undefined;
};
export default function Friends(props: UserProps) {
    return <div>Friends</div>;
}
