import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" className={''}>
            <Head />
            <body className={'bg-denim-200 dark:bg-gray-500'}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
