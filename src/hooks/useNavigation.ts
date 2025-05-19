import { usePathname, useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();
  const pathName = usePathname();

  const goTo = (href: string) => {
    router.push(href);
    router.refresh();
  };

  return { goTo, pathName };
};

export default useNavigation;
