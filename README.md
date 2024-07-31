Intro
--

Vritat News Management Portal.
A platform developed for the vritat.com news portal to streamline the process of curating positive news. It fetches news from various sources, performs sentiment analysis and filters out negative news, ensuring only positive stories are posted.
Built using Django Rest Framework for the backend and React.js for the frontend, the project utilizes Docker Compose for containerization and is deployed on AWS EC2 with continuous integration and deployment managed by GitHub Actions.


Installation
--
1. Clone the repository:
```shell
git clone https://github.com/eskimosa/search_engine_vritat.git
cd search_engine_vritat
```
2. Install dependencies and start the application:
```shell
docker-compose -f docker-compose.yml up -d --build
```
3. Access the application:
   Navigate to http://localhost:8000 in your web browser.

Author
--

[eskimosa](https://github.com/eskimosa/)
