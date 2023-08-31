- To build and deploy

npm run build in ./ and ./client, push, then eb deploy Warmtake-env

- ssh into ec2 instance that is connected to postgresql database from RDS

ssh -i ~/ec2-database.pem ec2-user@ec2-54-90-80-220.compute-1.amazonaws.com

- start postgres

psql --host=endpoint --port=5432 --username=postgres
