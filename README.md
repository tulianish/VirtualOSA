Virtual Optical Serial Analyzer (OSA)
======================

[Virtual Optical Serial Analyser (OSA)](http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com) is a basic text command interface of legacy laboratory equipment. It is created using React and Flask framework. It provides basic controls to retrieve an OSA trace within specified limits and display the result on a graph.

## Youtube Demo

[![Youtube OSA) Demo](https://github.com/tulianish/VirtualOSA/blob/master/demo/youtube.png)](https://youtu.be/lz328tApYlQ)

## Table of content

- [Installation](#installation)
    - [React](#react)
    - [Flask](#flask)
- [Features](#features)
    - [Continous Feedback](#continous-feedback)
    - [Zoom, Pan, Read Values](#zoom-pan-read-values-from-the-chart)
    - [Plot Persistence](#plot-persistence)
    - [Command Line Interface](#command-line-interface)
    - [Communication Log](#communication-log)
- [REST Endpoints](#rest-endpoints)
- [Acknowledgements](#acknowledgements)
- [Links](#links)

## Installation

Clone this repository :
`git clone https://github.com/tulianish/VirtualOSA`

Make sure you have these installed :

- **NodeJS** - v12 or above (recommended)
- **npm** - v3 or above (recommended)
- **Python** - v3 or above (recommended)
- **pip** - v20 or above (recommended)

### React

* Navigate inside VirtualOSA/ directory to install all react dependencies

```
npm install
```

* Navigate inside VirtualOSA/ directory

```
npm start
```
React would start serving at `http://localhost:3000/`

### Flask

* Navigate inside VirtualOSA/flask_server directory

```
pip install -r requirements.txt
```

* Navigate inside VirtualOSA/flask_server directory

```
export FLASK_APP=server.py
flask run
```

Flask would start serving at `http://localhost:5000/api/cmd`

## Features

### Continous Feedback

It provides a continous feedback on the graph plot for successive TRACE calls.

![Upload the page tree file](https://github.com/tulianish/VirtualOSA/blob/master/demo/continous.gif)

### Zoom, Pan, Read Values from the chart

Afterwards, you have to execute the update script of the extension to create the required database structure:

![Zoom Pan Read](https://github.com/tulianish/VirtualOSA/blob/master/demo/zoompanread.gif)

### Command Line Interface

Provides a scrollable text area with communication log between instrument & user which could prove useful for debugging hardware issues in the laboratory

![Command Line Interface](https://github.com/tulianish/VirtualOSA/blob/master/demo/PingCommand.png)

### Plot Persistence

Plots successive plot overlaying one over the other with random color tones suited for viewing persistently.

![Plot Persistence](https://github.com/tulianish/VirtualOSA/blob/master/demo/Persistence.png)

![Plot Persistence](https://github.com/tulianish/VirtualOSA/blob/master/demo/PersistentPlots.png)

**Caution:** Plot persistence could cause the page to slow down. It is recommended not to use it beyond 3 plots.

### Communication Log

A log that stores all the communication between the user and the system. It handles all the click and command based functions.

![Communication Log](https://github.com/tulianish/VirtualOSA/blob/master/demo/CLI.png)

## REST Endpoints

|      Commands     | Description                                                                     | Endpoints                                                                          |
|:-----------------:|---------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| /cmd              | returns command prompt                                                          | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd               |
| /cmd/IDN          | returns device identification string                                            | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/IDN           |
| /cmd/LIM          | returns x-axis limits in m                                                      | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/LIM           |
| /cmd/LIM[min,max] | sets x-axis limits in nm                                                        | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/LIM/[min,max] |
| /cmd/ECHO/string  | Emulates query command and sends a string to API, will get the same string back | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/ECHO/string   |
| /cmd/PING         | Returns PONG                                                                    | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/PING              |
| /cmd/START        | sets instrument state to continues acquisition                                  | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/START         |
| /cmd/STOP         | sets instrument state to IDLE                                                   | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/STOP          |
| /cmd/SINGLE       | starts a single scan (blocking operation, single scan takes few seconds)        | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/SINGLE        |
| /cmd/STATE        | returns instrument state                                                        | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/STATE         |
| /cmd/TRACE        | returns OSA trace in json format                                                | http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com/api/cmd/TRACE         |

## Acknowledgements

* ChartsJS
* chartjs-zoom-plugin
* Bootstrap
* nginx
* Gunicorn
* AWS EC2

## Links

* [Web site](http://ec2-3-134-85-47.us-east-2.compute.amazonaws.com)
* [Youtube Demo](https://youtu.be/lz328tApYlQ)
* [Documentation](https://github.com/tulianish/VirtualOSA/blob/master/README.md)
* [Issue tracker](https://github.com/tulianish/VirtualOSA/issues)
* [Source code](https://github.com/tulianish/VirtualOSA)
