build: 
	docker build --build-arg mode=development -f Dockerfile -t justinreg.azurecr.io/website .

run-local:
	docker run -it --rm --name ghost-test -e url=http://localhost:3001 -p 3001:2368 justinreg.azurecr.io/website:latest

run-bash:
	docker run -it --rm --name ghost-test -e url=http://localhost:3001 -p 3001:2368 jcvan/website:latest /bin/bash

adminer:
	docker run --rm --name adminer -p 8080:8080 adminer:latest