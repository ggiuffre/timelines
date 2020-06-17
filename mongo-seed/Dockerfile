FROM mongo

COPY languages.json /languages.json
CMD mongoimport --host mongodb --db test --collection languages --drop --file /languages.json --jsonArray
