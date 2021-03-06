#!/usr/bin/python

# need to install twython to run this
# on CDF: first setup virtualenv, then run "pip install twython" through that
# if you're confused, ask Alex
from twython import Twython
import sys
import json

## API CONSTANTS

FAVORITES = "https://api.twitter.com/1.1/favorites/list.json"
DEFAULT_LIMIT = 180

# Substitute your own keys and what-not here if you want to use an account other
# than Alex's
ACCOUNT = "SecretofMana"

# KEYS REVOKED FOR SECURITY.
# If you want to use this script, supply your own OAuth keys and account name
# from Twitter.
CONSUMER_KEY = ""
CONSUMER_SECRET = ""
ACCESS_KEY = ""
ACCESS_SECRET = ""

twitter = Twython(app_key=CONSUMER_KEY,
        app_secret=CONSUMER_SECRET,
        oauth_token=ACCESS_KEY,
        oauth_token_secret=ACCESS_SECRET)

def get_faves(user, limit):
    """
    Get the favorites for a given user.
    @param user The twitter screen name of the user.
    @param limit The maximum amount of favorites to retrieve. Limited to 200 at
                 most.
    """

    # push it to (just below) the limit
    limit = min(limit, DEFAULT_LIMIT)
    
    return twitter.getFavorites(user_id=user, count=limit,
        include_entities=True)

if __name__ == "__main__":
    if len(sys.argv) > 2:
        raise ValueError("usage: get_faves.py [limit]")
    
    with open("myfaves.json", "w") as f:
        limit = sys.argv[1] if len(sys.argv) == 2 else DEFAULT_LIMIT
        faves = get_faves(ACCOUNT, limit)
        pretty_faves = json.dumps(faves, sort_keys=True, indent=4)
        f.write(pretty_faves)
