DBPASSWORD ?= $(shell stty -echo; read -p "DB Password: " pwd; stty echo; echo $$pwd)

build: 
	docker build --no-cache -f Dockerfile -t justinreg.azurecr.io/website .

run-local:
	docker run -it --rm --name ghost-test -e url=http://localhost:3001 -e dbPassword=$(DBPASSWORD) -e environment=development -p 3001:2368 justinreg.azurecr.io/website:latest

run-bash:
	docker run -it --rm --name ghost-test -e url=http://localhost:3001 -e dbPassword=$(DBPASSWORD) -e environment=development -p 3001:2368 justinreg.azurecr.io/website:latest /bin/bash

adminer:
	docker run --rm --name adminer -p 8080:8080 adminer:latest