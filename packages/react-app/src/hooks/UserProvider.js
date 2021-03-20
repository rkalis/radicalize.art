import { useMemo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import BurnerProvider from "burner-provider";
import { INFURA_ID } from "../constants";

/*
  ~ What it does? ~

  Gets user provider

  ~ How can I use? ~

  const userProvider = useUserProvider(injectedProvider, localProvider);

  ~ Features ~

  - Specify the injected provider from Metamask
  - Specify the local provider
  - Usage examples:
    const address = useUserAddress(userProvider);
    const tx = Transactor(userProvider, gasPrice)
*/

const useUserProvider = (injectedProvider, localProvider) =>
useMemo(() => {
  if (injectedProvider) {
    console.log("🦊 Using injected provider");
    return injectedProvider;
  }
  return undefined;

}, [injectedProvider, localProvider]);

export default useUserProvider;
