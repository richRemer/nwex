nwex
====
Client/server architecture for shared applications

Overview
--------
In flux, unsure of where it's going; already changed drastically from where it started.  To put it simply, nwex
should provide an architecture for developing networked applications.  This includes launching and connecting to
servers, distribution to clients, data syncing between connected nodes, and automatic discovery.

Data models are shared between the client and server, and communication between them is handled with HTTP requests.
Authentication is handled using third-party providers, such as Google.  Launcher is provided for setting up a new
server using a GUI, and this launcher is built using node-webkit.  Newly launched server will walk client through
setting up the host.

Nwex has model building utilities to automate syncing between server and client.  Beyond plumbing, the domain models
are application specific.
