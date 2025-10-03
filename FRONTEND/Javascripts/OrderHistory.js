import {renderOrderTableHTML} from "./AdminPanel.js";
import { API_ENDPOINTS } from "./CONFIGJS.js";

document.addEventListener("DOMContentLoaded", () => {
  renderOrderTableHTML();
})

setInterval( () => {
  renderOrderTableHTML(); 
}, 60000); 
