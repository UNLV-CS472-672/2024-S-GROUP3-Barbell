import json
import random
from faker import Faker
from datetime import datetime, timedelta

Faker.seed(0) # Keeps runs consistent
fake = Faker()

# Constants to be used to generate varying amounts of data
user_rows = 10 # Users and friends

post_rows = 20 # Number of posts

workout_log_rows = 100 # How many workouts have been completed total by all users

workout_template_rows = 20 # How many unique workout templates there are

conversation_rows = user_rows # Bidirectional, no point in making too many chats as can't link

num_exercises = 50 # Number of total exercises : NOT IMPLEMENTED PROPERLY YET, MANUALLY DONE BY DANIEL

num_messages = 100
num_notifs = 20


SET_TYPES = ["NORMAL", "WARMUP", "DROPSET", "FAILURE"]

BODY_PARTS = ["LEGS", "ARMS", "CHEST", "BACK", "SHOULDERS", "CORE", "FULL_BODY", "OTHER"]

CATEGORIES = ["BARBELL", "DUMBBELL", "MACHINE", "ASSISTED_BODYWEIGHT", "WEIGHTED_BODYWEIGHT",
              "BODYWEIGHT", "DURATION", "CARDIO", "REPS_ONLY", "OTHER"]

USER_STATUS = ["ACTIVE", "BUSY", "OFFLINE", "ONLINE"]

NOTIF_TYPE = ["SYS", "NUDGE", "OFFLINE", "ONLINE"]

CHAT_TYPE = ["DIRECT", "GROUP"]

GENDER = ["MALE", "FEMALE", "PREFERNOTTOSAY"]

class Model:
    fields = []

    def to_json(self):
        return {f: getattr(self, f) for f in self.fields}

    def created_at(self):
        return datetime.now().isoformat()

    def updated_at(self):
        return (datetime.now() + timedelta(hours = 2)).isoformat()

    def list_rand(self, lst):
        return random.choice(lst)

    def bool_rand(self):
        return random.choice([True, False])
    
# GOOD TO GO I THINK
class Posts(Model):
    file_name = 'post'
    fields = ['id', 'title', 'content', 'published', 'authorId']

    def __init__(self, fake, id):
        self.id = id
        self.clerkId = id
        self.title = fake.text(max_nb_chars=20)

        # LOOK INTO MAKING MORE DYNAMIC POST TITLES
        self.content = fake.text(max_nb_chars=100)

        # Idk what to do with this field
        self.published = fake.boolean()

        # Just chooses a random author id of all users
        self.authorId = self.list_rand(range(1, user_rows))

# FINISH : IS IT GOOD TO GO? HOW DO WE HANDLE THE ARRAYS OF STUFF?
class User(Model):
    file_name = 'user'
    fields = ['id', 'clerkId', 'username', 'name', 'status', 'streak', 'gender']

    def __init__(self, fake, id):
        self.id = id
        self.clerkId = str(id)

        # Look into making it more dynamic
        self.username = fake.text(max_nb_chars=20)

        self.name = fake.name()
        self.status = self.list_rand(USER_STATUS)
        self.streak = self.list_rand(range(1,1000))
        self.gender = self.list_rand(GENDER)


# GOOD TO GO I THINK
class Friend(Model):
    file_name = 'friend'
    fields = ['userId', 'friendId']

    def __init__(self, fake):
        user = self.list_rand(range(1, user_rows))
        friend = self.list_rand(range(1, user_rows))
        while friend == user:
            friend = self.list_rand(range(1, user_rows))
        self.userId = user
        self.friendId = friend

# DONE I THINk : MATCHES MARCOS' SCHEMA
class WorkoutLog(Model):
    file_name = 'workoutLog'
    fields = ['id', 'finishedAt', 'duration', 'userId', 'workoutTemplateId']

    def __init__(self, fake, id):
        self.id = id
        self.finishedAt = ((str(fake.date_time_this_year())).replace(" ", "T")) + "Z"
        self.duration = self.list_rand(range(15, 120))
        self.userId = self.list_rand(range(1, user_rows))
        self.workoutTemplateId = self.list_rand(range(1, workout_template_rows))

# FUN ONE I GUESS : MANUALLY MAKING THE DATA FOR NOW
# DONE I THINK : NOT GOOD DATA, BUT DATA NO LESS
class WorkoutTemplate(Model):
    file_name = 'workoutTemplate'
    fields = ['id', 'name', 'description', 'createdAt', 'updatedAt', 'likes', 'exerciseIds', 'userId']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.text(max_nb_chars=10)
        self.description = fake.text(max_nb_chars=50)
        self.createdAt = ((str(fake.date_time_this_year())).replace(" ", "T")) + "Z"
        self.updatedAt = self.createdAt
        self.likes = self.list_rand(range(1, 100))
        self.exerciseIds = []
        for i in range(1, self.list_rand(range(2, num_exercises))):
            self.exerciseIds.append(i)
        self.userId = self.list_rand(range(1, user_rows))
        
class Chats(Model):
    file_name = 'chat'
    fields = ['id', 'createdAt', 'updatedAt', 'name', 'createdByUserId', 'type']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = ((str(fake.date_time_this_year())).replace(" ", "T")) + "Z"
        self.updatedAt = self.updated_at() + "Z"
        self.name = fake.text(max_nb_chars=20)
        self.createdByUserId = self.list_rand(range(1, user_rows))
        self.type = self.list_rand(CHAT_TYPE)

# DONE BUT NOT PLAUSIBLE
class Exercises(Model):
    file_name = 'exercise'
    fields = ['id', 'name', 'note', 'bodyPart', 'category', 'userId']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.text(max_nb_chars=10)
        self.note = fake.text(max_nb_chars=100)
        self.bodyPart = self.list_rand(BODY_PARTS)
        self.category = self.list_rand(CATEGORIES)
        self.userId = self.list_rand(range(1, user_rows))

class Messages(Model):
    file_name = 'message'
    fields = ['id', 'createdAt', 'updatedAt', 'content', 'read', 'chatId', 'senderId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = self.created_at() + "Z"
        self.updatedAt = self.updated_at() + "Z"
        self.content = fake.sentence()
        self.read = fake.boolean()
        self.chatId = self.list_rand(range(1, conversation_rows))
        self.senderId = self.list_rand(range(1, user_rows))

# From Elliot's file
class Notification(Model):
    file_name = 'notification'
    fields = ['id', 'createdAt', 'content', 'type', 'read', 'receiverId', 'senderId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = ((str(fake.date_time_this_year())).replace(" ", "T")) + "Z"
        self.content = fake.sentence()
        self.type = self.list_rand(NOTIF_TYPE)
        self.read = fake.boolean()

        receiver = self.list_rand(range(1, user_rows))
        sender = self.list_rand(range(1, user_rows))
        while receiver == sender:
            sender = self.list_rand(range(1, user_rows))

        self.receiverId = receiver
        self.senderId = sender


#------------------------------------------------------------------------
# NOT DOING AWARDS FOR NOW

# Generate chats
data = [Chats(fake, i).to_json() for i in range(1, conversation_rows)]
with open(f'../../new-gen-data/{Chats.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))

# NOT USING THESE BUT WILL EXIST AND CAN BE REFINED 
data = [Exercises(fake, i).to_json() for i in range(1, num_exercises)]
with open(f'../../new-gen-data/{Exercises.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))

# Generate friends
data = [Friend(fake).to_json() for i in range(1, user_rows)]
with open(f'../../new-gen-data/{Friend.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))

# Generating messages
data = [Messages(fake, i).to_json() for i in range(1, num_messages)]
with open(f'../../new-gen-data/{Messages.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))

# Generating notifications:
data = [Notification(fake, i).to_json() for i in range(1, num_notifs)]
with open(f'../../new-gen-data/{Notification.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))

# Generate posts : DONE AND WORKS
data = [Posts(fake, i).to_json() for i in range(1, post_rows)]
with open(f'../../new-gen-data/{Posts.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))

# SETS GOT REMOVED IN MARCOS' PR
# NOT UPDATING SPOTIFY HERE AS TOO WEIRD

# GENERATING USERS KINDA HARD NGL IDK IF THIS IS RIGHT BUT WHATEVER
data = [User(fake, i).to_json() for i in range(1, user_rows)]
with open(f'../../new-gen-data/{User.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))


# Generate workouttemplates: DONE AND WORKS I THINK?
data = [WorkoutTemplate(fake, i).to_json() for i in range(1, workout_template_rows)]
with open(f'../../new-gen-data/{WorkoutTemplate.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))

# Generate WorkoutLogs : DONE AND WORKS
data = [WorkoutLog(fake, i).to_json() for i in range(1, workout_log_rows)]
with open(f'../../new-gen-data/{WorkoutLog.file_name}.json', 'w') as f:
    print(f'writing generated data to: {f.name}')
    f.write(json.dumps(data))


