import MoveCar from "@/lib/MoveCar";
import Loading from "@/lib/Loading";
import RangeCalculator from "@/lib/RangeCalculator";
import AutoHideHeader from "@/lib/AutoHideHeader";
import DrawerMenu from "@/lib/DrawerMenu";
import EdgeIECheck from "@/lib/EdgeIECheck";
import NavbarUnderline from "@/lib/NavbarUnderline";

const Main = () => {
  AutoHideHeader();
  NavbarUnderline();
  MoveCar();
  Loading();
  const rangeCalculator = new RangeCalculator();
  window.rangeCalculator = rangeCalculator;
  rangeCalculator.init();
  DrawerMenu();
  EdgeIECheck();
};

Main();
