Uses [PRMD spec](https://github.com/interagent/prmd) to generate a single json schema file from individual yaml schemas files.

Following these instructions will generate a schema file. This can be used with z-schema to validate data against schemas (see [json-schema-validator repo](http://github.com/shinymayhem/json-schema-validator))

## Usage

* Create or modify meta.json (or file specified by $META_PATH) as needed.
* Include yaml schema files in ./schemata (or path specified by $SCHEMATA_PATH). See [schemata.md](https://github.com/interagent/prmd/blob/master/docs/schemata.md) for structure details
* Ensure ./schema.json (or file specified by $SCHEMATA_PATH) is writable
* Generate and verify generation in one step with `docker run --rm -v $(pwd):/usr/src/app shinydocker/schema-generator`

## Customize
* Modify env.list with custom paths
* Run with `docker run --rm -v $(pwd):/usr/src/app --env-file=env.list schema-generator`

### Using docker-compose
* Run with `docker-compose up` with the docker-compose.yml in this repo as a template

```
schema-generator:
  image: shinydocker/schema-generator
  volumes:
    - ./:/usr/src/app
  env_file:
    - ./env.list
```

Where `env.list` contains

```
META_PATH=meta.json
SCHEMATA_PATH=schemata/
SCHEMA_PATH=schemas/schema.json
```

### Testing

* modify .yml schemata and generate schema as documented above
* Go to ./test
* run ./node_modules/.bin/mocha ./validate.js
