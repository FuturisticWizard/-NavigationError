# -NavigationError

The error is that the span (IndicatorRef) used for animation does not work on the big screen, in the console you can see  when click on the menuItem: 
```
currentButton.offsetWidth2 0
Navbar.tsx:106 currentButton.offsetLeft 0
Navbar.tsx:107 actual span width: 0px
Navbar.tsx:111 width changed to : 0px
Navbar.tsx:112 left changed to : 0px
```
That currentButton.offsetWidth currentButton.offsetLeft on large screens is read as 0px, while on small screens the values are correct. 

I am a beginner and the navigation I have created does not always follow best practices. I am open to constructive criticism and would like to know where I went wrong and how I can fix it. 
