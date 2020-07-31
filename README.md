![SU Hackathon 2020](.info/template_small.png)


# Welcome to the 2020 Stellenbosch University Hackathon

For this year's challenge we want you to build solutions that can help small businesses to function effectively in the new normal post-COVID. Think outside the box, i.e. don't just emulate existing solutions, but rather try to think of the challenges that small businesses face that no one is solving yet.

This year the entire event will be run remotely on MS Teams. As always business & technology mentors will be available from the sponsors to assist you. Please make use of their expertise.

The event officially starts at 6pm on Friday the 31st of July and ends at 12pm on Sunday the 2nd of August, meaning you'll have 42 hours to complete your solution.

At 12pm on the Sunday, you will pitch your solution to a panel of judges via a MS Team video call.

The rest of this guide sets out everything you need to know about the event.

1. [Judging Criteria](#1-judging-criteria)
2. [Pitching Tips](#2-pitching-tips)
3. [Starter Kit](#3-starter-kit)
4. [Additional Info](#4-additional-info)


## 1. Judging Criteria

The judges will subjectively evaluate all the pitches using the following criteria.

Criteria | Description
-------- | -----------
**Concept** | Did the group come up with a good solution to the initial problem or challenge? Did they understand and research the problem? Do they understand their end user's needs?
**Creativity** | How creative has the group been in solving the challenge? Did they come up with a radical approach, or did they follow existing patterns and solutions? Is this a differentiated idea in some way?
**Execution** | Does the hack work? Is the hack testable and can the group show the minimum viable product? The hack does not have to be perfect or production ready, but does the idea come to life with their demo?
**Design** | Did the group think about the user interface (UI) and user experience (UX)? How well designed is their demo? How are the graphics, or how is the human-computer interaction? Is it easy to use or does it require a lot of training to master?
**Business Model / Impact** | Is the idea feasible, does it have economic and societal value, and is it sustainable? Will this be a viable business if the team develops the idea further?

**Note:** All decisions are final and will not be open to discussion.


## 2. Pitching Tips

From previous events we'd like to offer you the following tips:

* You'll have 7 minutes to pitch your solution to the judges, in that time it is your responsibility to give them enough info as per the above criteria to evaluate your solution.

* The judges will have 3 minutes to ask you clarifying questions, be brief and to the point in your answers.

* Don't just focus on your tech solution. Think though the business case of your solution, is it viable? will people use it? who is my target audience?

* Don't code until the last minute, rather reduce your scope to make time to practice your presentation.

* A pitching workshop will be held before the event, please do make use of this to develop your skills.


## 3. Starter Kit

At most hackathons a lot of time is wasted in the initial stages setting up projects and making technology choices. To make things a bit easier this year we're providing you with a starter kit to get you up and running as quickly as possible.

**Note:** It is not mandatory to use this guide. If you have your own project template or want to build your solution in your own way or programming language, then please feel free to do so.


### 3.1. Overview

You can follow the rest of this guide to setup a basic cloud hosted web app. We'll be building a simple sales dashboard as a single page web applicaiton that will communicate with Node JS backend and a Postgres database. The entire project will be hosted on [Heroku](https://heroku.com), and be automatically deployed to the cloud everytime you check in your source code to the master branch of the project in GitHub.

### 3.2. Getting Started

1. Install the latest versions of the following software on your computer:
   * [Google Chrome](https://www.google.com/chrome)
   * [NodeJS](https://nodejs.org/en/)
   * [Git](https://git-scm.com/)
   * [VS Code](https://code.visualstudio.com)

2. Sign up for a [Heroku account](https://signup.heroku.com/) (if you don't have one already).

3. Fork this repository on GitHub by click the green "Use this template" button at the top of the page and following the prompts.

4. Once done your repository copy will be setup in Github, click the green "Code" button and copy the repository URL

5. Clone the repository to your computer using git in a new terminal window, replacing the url with the one you copied, e.g.:
```sh
git clone https://github.com/<your-account-name>/<your-app-name>.git
```

6. Step into the folder then install the project dependencies using npm.
```
cd <your-app-name>

npm install
```

### 3.3. Create Hosted App Environment

1. Log in to the [Heroku App Dashboard](https://dashboard.heroku.com/apps/).

2. Select "Create New App" using the following settings:
   * App Name = your-app-name
   * Region = Europe
   * Pipeline = no

3. Set the deployment method to GitHub and connect your GitHub account to automate deployment.

4. Link the project repository to your Heroku account.

5. Enable automatic deploys.

### 3.4. Provision Postgres DB

1. In the Heroku dashboard for your app, navigate to the "Resources" tab and select "Find more add-ons".

2. Select "Heroku Postgres"

3. Click "Install Heroku Postgres" using the following settings:
   * Add-on plan = Hobby Dev-free
   * App to provision = your-app-name

4. Click "Provision Add-on"

5. Open the Heroku Postgres link in the "Resources" tab.

6. Select the "Settings" tab

7. Click "View Credentials"

8. Copy the URI value

9. Create a file named ".env" in the root of your project directory and paste the URI in the file, prefixed with the variable name "DATABASE_URL=", e.g.
```
DATABASE_URL=postgres://username:password@server.eu-west-1.compute.amazonaws.com:5432/test
```

### 3.5. Test & Deploy

1. Open the project folder in VS Code, change the app title in the app/web/index.html file to the name of your project.
```html
<title>My Project Name</title>
```

2. Commit the change in VS Code's source control tab.

3. Push the change to the repository on GitHub.

4. The app should automatically deploy within 5-minutes.

5. Open the app in a browser:
```
https://<your-app-name>.herokuapp.com/
```

6. If needed, you can also manually redeploy the app by selecting "Deploy Branch" at the bottom of the "Deploy" tab in the [Heroku App Dashboard](https://dashboard.heroku.com/apps/)

### 3.6. Local Development

1. Simply press F5 on your keyboard within VS code to run the app locally.

2. This will launch the app automatially using the Heroku CLI on http://localhost:8080 which you can open in a web browser.


## 4. Additional Info

This project is a quick start and by no means a definitive source of information. Play around with it and make it your own.

For interest, the following additional resources may be of use to you:

### 4.1. Heroku

To learn more about Heroku, refer to their [documentation](https://devcenter.heroku.com/categories/reference).

Heroku also has support for 3rd party databases through it's [addon catalogue](https://elements.heroku.com/addons). The NodeJS [getting started guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs) will take you through a tutorial to connect to a Postgres database.

### 4.2. Postgres DB

Postgres is a simple SQL database, to learn more about the query syntax refer to their [documentation](https://www.postgresql.org/docs/12/queries-overview.html)

### 4.3. Bootstrap 4 - UI Framework

[Bootstrap](https://getbootstrap.com/) is a simple open source responsive UI framework for web applications. It has many predefined components and templates. Use the following links to learn more.

* [Components](https://getbootstrap.com/docs/4.5/components/)
* [Template Examples](https://getbootstrap.com/docs/4.5/examples/)
* [Full Tutorial - W3schools](https://www.w3schools.com/bootstrap4/default.asp)
* [ChartJS](https://www.chartjs.org/)
* [Feather Icons Library](https://github.com/feathericons/feather)
* [Feather Icons Catalogue](https://feathericons.com/)

### 4.4. Modern Web APIs

The web has in recent years evolved to a point where it can compete head-on and with native applications like you would find on a desktop or smartphone. Web applications has the benefit of allowing you no longer have to build separate Android, iOS and desktop versions of you app. Apps like Slack and VS Code for instance is completely built on web technologies.

The following links provide some examples of how you can leverage these modern web APIs:

* [PWA - Installable Web Apps](https://web.dev/progressive-web-apps/)
* [WebRTC - Video Chat](https://codelabs.developers.google.com/codelabs/webrtc-web/)
* [Web Payments](https://web.dev/payments/)
* [Google Code Labs](https://codelabs.developers.google.com/)

### 4.5. Mobile Phone Emulation - Chrome

Google Chrome has an debugging tool that allows you to view a web app being served from localhost of your computer directly on your mobile phone. This is useful to trace local issues such as errors that might occur on mobile browsers due to a lower level of browser support than the browswer version running on your computer. The following [article](https://developers.google.com/web/tools/chrome-devtools/remote-debugging) will get you started.
