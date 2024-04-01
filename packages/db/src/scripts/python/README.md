# Python Mock Data Generator

## Setup steps

1. From this folder, run `python -m venv .`
2. Run `bin/pip install -f requirements.txt`
3. Run the generator with `bin/python generate.py`

Some json files will be written with names according to our DB
table/schema names. Copy those files to wherever they need to go to
be copied by prisma to our online DB.

## Extending models

Add to the models as necessary, rerun the script, and upload to
prisma to keep our schema up to date. Faker documentation can be
found here: `https://faker.readthedocs.io/en/master/`. Seriously,
don't look at geeksforgeeks.com for python help. Just read the docs:
`https://docs.python.org/3/`.

If you added a field to a model, you *must* rerun the generate
script and reupload to prisma.
