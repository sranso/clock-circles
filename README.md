### To run
Open index.html in Chrome (won't work in other browsers because input-datetime isn't compatible).

### To improve / do next
- [input time](http://caniuse.com/#feat=input-datetime) isn't widely supported, so we should replace it with something that is (I used it for ease of implementation)
- Resize the circles based on the height and width of the canvas
- Slowly transform the color of the circles as the time of day passes (e.g. start with a light yellow in the morning, and fade to a clear blue for the day, then a deep / dark blue for night); we could even update the color based on the local weather outside
- Instead of mutating the state, always return a new version of the state
- Reduce the size of the original alarm clock svg (or replace with a mini canvas drawing)
- Allow the user to turn off the alarm
- Add tests
- Add type checking (flow?)

