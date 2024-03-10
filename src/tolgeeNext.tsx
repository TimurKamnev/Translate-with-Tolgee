import { FormatIcu } from "@tolgee/format-icu";
import { useRouter } from "next/router";
import {
  NsFallback,
  Tolgee,
  TolgeeProvider,
  getFallbackArray,
  DevTools,
  useTolgeeSSR,
} from "@tolgee/react";


export const getServerLocales = async (
  locale: string | undefined,
  ns?: NsFallback
) => {
  const namespaces = ["", ...getFallbackArray(ns)];
  const result: Record<string, any> = {};

  if (locale) {
    for (const namespace of namespaces) {
      result[`${locale}`] = (await import(`../i18n/${locale}.json`)).default;
    }
  }

  return result;
};

type Props = {
  locales: any;
};

const tolgee = Tolgee()
  .use(FormatIcu())
  .use(DevTools())
  .init({
    availableLanguages: ["en", "ru"],
    defaultLanguage: "en"
  });

export const TolgeeNextProvider = ({
  locales,
  children,
}: React.PropsWithChildren<Props>) => {
  const router = useRouter();
  const tolgeeSSR = useTolgeeSSR(tolgee, router.locale, locales);

  return (
    <TolgeeProvider
      tolgee={tolgeeSSR}
      fallback="Loading..."
      options={{ useSuspense: true }}
    >
      {children}
    </TolgeeProvider>
  );
};
