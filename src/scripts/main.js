import { draw } from './space.js';
import { navClickEvents, projectClickEvents } from './navigational.js';

window.onload = () =>{
            //setup clickevents
            navClickEvents();
            projectClickEvents()
            requestAnimationFrame(draw);
    }