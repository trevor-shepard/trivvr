import React, {useEffect} from 'react'
import { subscribeToTrivias } from 'store/slices/triviaSlice';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { subscribeToUser } from 'store/slices/userSlice';
function Subscribe(){
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const uid = user.uid as string

    useEffect(() => {

        subscribeToUser(dispatch, uid )
        subscribeToTrivias(dispatch, uid) 
        
    }, [dispatch, uid])
    return <></> 
}

 export default Subscribe