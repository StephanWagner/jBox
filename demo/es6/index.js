
import jBox from 'jbox';
import 'jbox/dist/jBox.all.css';

// Tooltip

new jBox('Tooltip', {
  attach: '.jbox-tooltip',
  theme: 'TooltipBorder',
  pointer: 'top:15',
  content: 'My tooltip',
  // animation: 'move' // TODO
});

