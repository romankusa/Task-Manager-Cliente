import React from 'react';
import App from 'next/app'
import Head from 'next/head'

const Layout = ({ children, pagina }) => {

    return (
        <>
            <Head>
                <title>Task Manager | {pagina}</title>
                <link href="/static/css/App.css" rel="stylesheet" />
                <meta name="description" content="Administrador de tareas." />
                <link rel="icon" href="/static/img/taskicon.svg"></link>
            </Head>

            {children}
        </>
    )
}

export default Layout;