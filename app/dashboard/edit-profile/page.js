import getAPIServer from "@/app/APIServer";
import EditProfile from "../../component/EditProfile";
import { cookies } from "next/headers";

const EditProfilePage = async () => {
    const cookieStore = await cookies();
    const userData = cookieStore.get("userData")?.value;
    console.log('prfile : ', userData.id)
    const data = await getAPIServer(`api/auth/editprofile/${userData.id}`);

    return (
        <>
            <EditProfile data={data} />
        </>
    )
}

export default EditProfilePage;