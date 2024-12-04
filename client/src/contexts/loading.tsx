"use client";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { createContext, PropsWithChildren, ReactNode, useContext, useState } from "react";

type LoadingProps = {
  loading: boolean;
  setLoading: (l: boolean) => any;
};

export const LoadingContext = createContext<LoadingProps>({
  loading: false,
  setLoading: (l: boolean) => null,
});

type LoadingProviderProps = {} & PropsWithChildren;

export function LoadingProvider(props: LoadingProviderProps) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <Flex
          id="aoj-loading"
          position={"fixed"}
          top={"0"}
          left={"0"}
          w={"100%"}
          h={"100%"}
          zIndex={9999}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"progress"}
          backdropFilter={"blur(4px)"}
        >
          <Box transform={"scale(3)"}>
            <Spinner size="xl" />
          </Box>
        </Flex>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
}
export function useLoading() {
  const loadingCtx = useContext(LoadingContext);
  return loadingCtx;
}
