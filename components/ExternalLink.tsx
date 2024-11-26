import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  const isExternal = href.startsWith("http") || href.startsWith("https");

  const linkHref: string | { pathname: string } = isExternal
    ? href
    : { pathname: href };

  return (
    <Link
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...rest}
      href={linkHref}
      onPress={async (event) => {
        if (Platform.OS !== "web" && isExternal) {
          event.preventDefault();
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
