import React, { useEffect } from 'react'
import App from 'next/app'

import tokenAuth from '../redux/config/tokenAuth'

// Redux
import { Provider } from 'react-redux'
import store from '../store'

const MyApp = ({ Component, pageProps }) => {


    useEffect(() => {
        // reivsar si tenemos un token
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token)
        }
    }, [])

    return (
        <>
            <Provider store={store} >
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp;