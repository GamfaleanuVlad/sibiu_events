import { useRouter } from 'next/router';
import BurgerMenu from './BurgerMenu';


export default function AccountMenu() {
  const router = useRouter();
  
  
  const menuItems = [
    {
      label:'Map',
      onClick : () => void router.push("/")
    },
    {
      label:'Find event',
      onClick : () => void router.push("/find_event")
    },
    {
      label:'Create event',
      onClick : () => void router.push("/create_event")
    },
    {
      label:'Add review',
      onClick : () => void router.push("/review/{id}")
    },
    {
      label:'About',
      onClick : () => void router.push("/about")
    },
    {
      label:'Support',
      onClick : () => void router.push("/support")
    },

  ];
  return (
    <>
      <BurgerMenu menuItems={menuItems} />
    </>
  );
}