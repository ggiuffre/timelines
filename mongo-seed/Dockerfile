FROM mongo

COPY techs.json /techs.json
CMD mongoimport --host mongodb --db test --collection techs --type json --file /techs.json --jsonArray
