# Docker

## What is Docker?

Docker is an essential tool, mainly for who work with the back-end, particularly for deploying an application. Now we are
going to use it locally for our app development. With it we will be able to run the postgres db without having to
install anything. It is mostly utilized in the production environment, because it will facilitate the deploy of our app.

We will use docker because, let's say, we downloaded a system that is blank, and we installed many different things on it.
But at a certain point, we realize that we installed something that caused an error in our system and we want to rollback
to the previous state,However now it is not possible anymore because we have made so many changes that it would be hard to go back.

Docker addresses this issue, For instance, suppose we need to install a db, such as a postgres, and later we
need a redis db, followed by another different service, and so on. If we started installing every thing on our machine, there
will come a time where our machine have so much clutter that we cannot discern what is installed and what isn't.

One reason for us to use docker is to be able to spin up a postgres db for this application, then, if we want to terminate this app
to start a new one, like redis, we can simply remove that db, along with all of its configuration data, files, and everything else.

Docker is similar to virtual box, but whereas docker utilizes containers, virtual box uses virtualization,
when we set up another system, it installs the entire OS from scratch, it is a new OS running IN our machine, it's almost like 
a new machine. 

Now the concept of docker, is a little different, let's use an example

Suppose that we are on linux, and we want to spin up a container (that's how docker calls each resource), we'll launch a pg
db, outside of our environment, so we don't clutter our environment, we create another linux instance within our system,
simillar to virtualization, but using docker. With that pg db running, we won't need to install a OS from scratch, we
already have an OS; We can reuse it, the only that will change between both systems is the file system
and other configuration details, because we need a completely new context, but we can reuse resources  between them.

That is that main difference between docker and other types of virtualization systems, docker reuses the environment
where we are creating that "virtualization" and only changes the context, it's way faster and lighter.

It works on every OS, making it highly interchangeable. However, Windows requires additional steps for installation because
it does not run on unix, the kernel of linux and macOS, while docker runs on unix.

For docker, we can access the website https://hub.docker.com, where we will find many images. These are scripts that are
pre configurated to execute things like databases, node, and other services or applications commonly needed to be
run on our machine.

Command example

 sudo docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

 the -p is the port

 "PostgreSQL" by default, runs on port 5432. When we create a container in docker, it runs in a completely isolated environment
 from our machine, This means that even if i set up a postgres instance inside docker, i won't be able to access it automatically
 by visiting localhost:5432. It is because the PostgreSQL container is  not running in our directly in our machine, it isolated
 within its own subsystem.
 
 When we pass the -p flag in Docker, we essentially tell Docker to map that image port 5432 inside the container to port
5432 on the host machine, our machine.
So when i access 5432 in my machine, i'm actually accessing the PostgreSQL instance running inside the container.

In the notation 5432:5432, the left side of the colon represents the port on the host machine. while the right side represents
the port inside the container


