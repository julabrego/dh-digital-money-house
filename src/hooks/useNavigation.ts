import { usePathname, useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();
  const pathName = usePathname();

  const onGoToLink = (href: string) => {
    router.push(href);
    router.refresh();
  };

  return { onGoToLink, pathName };
};

export default useNavigation;
