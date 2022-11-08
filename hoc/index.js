import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const index = (Component) => {
    return () => {
        const User = useSelector(state => state.user);
        const router = useRouter();
        return User?.token
            ?
            setTimeout(() => {
                router.replace('/');
            }, 0)
            :
            <Component />
    }
}

export default index;