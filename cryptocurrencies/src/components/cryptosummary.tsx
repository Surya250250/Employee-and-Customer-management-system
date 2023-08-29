import { Crypto } from "../types/crypto";

export type AppProps = {
    crypto: Crypto;
};

export default function Cryptosummary({ crypto }: AppProps): JSX.Element {
    return <p>{crypto.name + '$' + crypto.current_price}</p>;
}
