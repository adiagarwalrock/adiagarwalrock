# import pandas
# import config

# df = pandas.read_csv(config.SKLILLS_DB_PATH)

# print("\nDF: ", df)

# list_of_column_names = list(df.columns)
# print("\nlist_of_column_names: ", list_of_column_names)


# for i in df['Languages']:
#     print(i)

# print(df['Languages'])
# Python program to read
# json file


import json

f = open('data.json',)

data = json.load(f)

cat = [
    'Languages',
    'Databases',
    'Technologies',
    'Web Development',
    'Frameworks'
]


for c in cat:
    print(c)
    for i in data['skills'][cat]:
        print(i)

f.close()
