build: 
	docker build --build-arg mode=development -f Dockerfile -t jcvan/website .

run:
	docker run -it --name ghost-test -e url=http://localhost:2368 -p 2368:2368 jcvan/website:lastest