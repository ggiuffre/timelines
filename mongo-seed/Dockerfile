FROM mongo

COPY techs.json /techs.json
CMD mongoimport --host mongodb --db test --collection techs --drop --file /techs.json --jsonArray
