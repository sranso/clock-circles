Sarah Ransohoff's front end code submission.

##To run
Open index.html in Chrome.

##Notes
- After speaking with Naz, I decided to use ES6 (without a transpiler) because [most browsers can handle it.](http://kangax.github.io/compat-table/es6/)
- I tested this in the latest version of Chrome.

##To improve / do next
- [input time](http://caniuse.com/#feat=input-datetime) isn't widely supported, so we should replace it with something that is (I used it for ease of implementation)
- Resize the circles based on the height and width of the canvas
- Slowly transform the color of the circles as the time of day passes (e.g. start with a light yellow in the morning, and fade to a clear blue for the day, then a deep / dark blue for night); we could even update the color based on the local weather outside
- I'm not sure why canvas delays rendering for the first second on the first load in Chrome (doesn't happen in Safari?)
- Instead of mutating the state, always return a new version of the state
- Reduce the size of the original alarm clock svg (or replace with a mini canvas drawing)
- Allow the user to turn off the alarm
- Add tests

