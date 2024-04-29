import os
import json
import time
import requests

API_TOKEN = os.environ['API_TOKEN']

def get_gh_json(url):
    print(f'fetching data from url: {url}')
    response = requests.get(url, headers={'Accept': 'application/vnd.github.v3+json', 'Authorization': f'token {API_TOKEN}'})
    if response.status_code == 200:
        return response.json()
    else:
        print(f'got response from github {response.status_code}')
        return {}

users = [
    "supakeshi",
    "StefanoRubini",
    "BitsyBirb",
    "thienguen",
    "taylorfinelli",
    "AaronFmyHub",
    "bigboidanwithacan",
    "elliotwesoff",
    "L-Hen",
    "mva919",
    "codecov[bot]"
]

counts = {}

for user in users:
    counts[user] = {
        'prs': 0,
        'pr_reviews': 0,
        'issues': 0,
        'issues_comments': 0
    }

issues_json = []
for page in range(1,10):
    url = f'https://api.github.com/repos/UNLV-CS472-672/2024-S-GROUP3-Barbell/issues?state=all&per_page=100&page={page}'
    issues_json += get_gh_json(url)

comments_json = []
for page in range(1,10):
    url = f'https://api.github.com/repos/UNLV-CS472-672/2024-S-GROUP3-Barbell/issues/comments?per_page=100&page={page}'
    comments_json += get_gh_json(url)

pulls_json = []
for page in range(1,10):
    url = f'https://api.github.com/repos/UNLV-CS472-672/2024-S-GROUP3-Barbell/pulls?state=all&per_page=100&page={page}'
    pulls_json += get_gh_json(url)

# PR reviews can't be mass queried, so we iterate over all the PRs to fetch all reviews per PR
reviews_json = []
for idx, pr in enumerate(pulls_json):
    try:
        pr_num = pr['number']
        url = f'https://api.github.com/repos/UNLV-CS472-672/2024-S-GROUP3-Barbell/pulls/{pr_num}/reviews'
        print(f'{idx}: fetching reviews for pr #{pr_num}')
        reviews_json += get_gh_json(url)
        time.sleep(1)
    except TypeError as e:
        print(e)


with open('json/dp3/issues.json', 'w') as f:
    json.dump(issues_json, f, indent=4)

with open('json/dp3/comments.json', 'w') as f:
    json.dump(comments_json, f, indent=4)

with open('json/dp3/pulls.json', 'w') as f:
    json.dump(pulls_json, f, indent=4)

with open('json/dp3/reviews.json', 'w') as f:
    json.dump(reviews_json, f, indent=4)

for pr in pulls_json:
    user = pr['user']['login']
    counts[user]['prs'] += 1

for review in reviews_json:
    user = review['user']['login']
    counts[user]['pr_reviews'] += 1

issues_ctr = 0
for issue in issues_json:
    try:
        if 'pull_request' not in issue:
            user = issue['assignee']['login']
            counts[user]['issues'] += 1
            issues_ctr += 1
    except TypeError:
        # it's possible/likely to not have an assignee on an issue,
        # so issue['assignee'] would return None, thus throwing this
        # exception when trying to access 'login'. we don't care, ignore.
        pass

for comment in comments_json:
    user = comment['user']['login']
    counts[user]['issues_comments'] += 1

#############################################

print(json.dumps(counts, indent=2))

print('user percentage of issues:')
for user in users:
    issue_count = counts[user]['issues']
    percentage = float(issue_count) / float(issues_ctr)
    print(f'{user}: {round(percentage * 100.0, 2)}')