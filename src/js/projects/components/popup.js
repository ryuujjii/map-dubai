import ViewPopup from "@/projects/components/popup/viewPopup";
import projectPopup from "@/projects/components/projectPopup";
import tabPayment from "@/projects/components/popup/tabPayment";



export default function popup(params) {
  new ViewPopup();
  projectPopup();
  tabPayment()
};
