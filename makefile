build: 
	docker build --build-arg mode=development -f Dockerfile -t jcvan/website .

run-local:
	docker run -it --rm --name ghost-test -e url=http://localhost:2368 -p 2368:2368 jcvan/website:latest

build-run:
	docker-compose -f stack.yml up