import Login from "../component/Login";

const LoginPage = async ({ searchParams }) => {
    const data = await searchParams;
    return (
        <>
            <Login message={data.message} />
        </>
    )
}

export default LoginPage;