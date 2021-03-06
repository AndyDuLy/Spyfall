## Spyfall

Real-time Web App hosted version of the popular card game, Spyfall. <br/>
Play with 3+ friends at: https://rt-spyfall.web.app/ <br/>

<br/> 

Looking to create and run some quick games with minimal hassle and setup? <br/>
This web app is perfect for you with no account registration required!


## Demo & How-to Use

After visiting the URL, you are greeted by the landing page, which offers quick access to either create or join a game room/lobby. <br/>
<img src="/RepoImages/LandingPage.png">

You are then redirected to the game room/lobby, where anyone can start or close the game and the current player lobby is updated in real time. <br/>
<img src="/RepoImages/GameLobby.png">

Once the game is started, a player is randomly assigned the role of 'Spy', with the non-spy players knowing the location! <br/>
Possible location set is also visible to all players. Once this round is over, simply end the game and start it again! <br/>
<img src="/RepoImages/InGame.png">


## Inspiration & Purpose

Despite all of us going separate ways for post-secondary education, we always got together when we were on break from school, and Spyfall was a game we commonly played. <br/>
We started off using the first mobile app we found on the app store, but found it super buggy, slow, and required us to make accounts when we just wanted to quickly setup and run a few games. <br/>
We joked about me just making my own interpretation of the game to fit our needs, but when I realized it could be done relatively easily with Firebase Realtime, I said "Why not?"


## Technical Stack

If you've made it this far, surely you're interested in knowing a bit more about the underlying tools and technologies I used! <br/>

Front-end was vanilla React, no framework or ui library thrown on top. <br/>
Mostly because it's what I'm most proficient with and I initially created this about a month out from when my friends and I were going to get together again and need the app. Just threw in some CSS to make it look a bit more appealing off a quick mockup I had developed and sitting in Figma for some time. <br/>

Back-end was all Google Cloud Platform. <br/>
Specifically Firebase's Realtime Database, and hosted through GCP's Cloud Hosting as the integration of everything was seamless. <br/>
I went with Realtime DB over Sockets mostly because of my interest in GCP and their suite of products.


<br/> <br/>

===== License ======

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

