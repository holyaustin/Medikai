import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import Footer from "../components/Footer"

//The Graph
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/25176/medikai-gnosis/v0.0.2", 
    // https://api.studio.thegraph.com/query/25176/medikai-gnosis/v0.0.2
    // https://api.studio.thegraph.com/query/25176/medikai/v0.0.1
})

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Component {...pageProps} />
                        <Footer />
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
