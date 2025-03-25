import { useSelector } from 'react-redux';

const useAuth = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user); // 유저 정보도 같이 가져올 수 있어

    return { isAuthenticated, user };
};

export default useAuth;
