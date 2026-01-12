// src/screens/home/index.tsx
import { HomeGuestView } from "./HomeGuestView";
import { HomeLoggedView } from "./HomeLoggedView";
import { useHomeViewModel } from "./HomeViewModel";
export default function HomeScreen() {
  const { isLogged } = useHomeViewModel();

  return isLogged ? <HomeLoggedView /> : <HomeGuestView />;
}
