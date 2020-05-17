FROM mongo

COPY techs.json /techs.json
CMD mongoimport --host mongodb --db test --collection techs --drop --type json --file /techs.json --jsonArray
