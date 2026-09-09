import getAPIServer from "@/app/APIServer";
import EditProfile from "../../component/EditProfile";
import { cookies } from "next/headers";

const EditProfilePage = async () => {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;

    return (
        <>
            <EditProfile userData={JSON.parse(userData)} />
        </>
    )
}

export default EditProfilePage;