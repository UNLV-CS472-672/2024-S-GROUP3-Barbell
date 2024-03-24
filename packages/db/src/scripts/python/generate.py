import json
import random
from faker import Faker
from datetime import datetime, timedelta


fake = Faker()
number_of_rows = 10

BODY_PARTS = ["SHOULDERS", "CORE", "BACK", "LEGS"]
CATEGORIES = ["DUMBBELL", "MACHINE", "BODYWEIGHT", "ASSISTED_BODYWEIGHT"]
STATUSES = ["ONLINE", "OFFLINE", "ACTIVE", "BUSY"]
NOTIFICATION_TYPES = ["NUDGE", "FRIEND_REQUEST", "LIKE"]
SET_TYPES = ["WARMUP", "NORMAL", "FAILURE", "DROPSET"]

def created_at():
    return datetime.now().isoformat()

def updated_at():
    return (datetime.now() + timedelta(hours = 2)).isoformat()

def list_rand(lst):
    return random.choice(lst)

def bool_rand():
    return random.choice([True, False])

class Model:
    fields = []

    def to_json(self):
        return {f: getattr(self, f) for f in self.fields}

class Award(Model):
    file_name = 'award'
    fields = ['id', 'name', 'description', 'userId', 'createdAt', 'updatedAt']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.description = fake.text()
        self.userId = 1
        self.createdAt = created_at()
        self.updatedAt = updated_at()

class Chat(Model):
    file_name = 'chat'
    fields = ['id', 'name', 'createdByUserId', 'type']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.createdByUserId = 1 # TODO
        self.type = "GROUP" # TODO: rand: group/direct

class Exercise(Model):
    file_name = 'exercise'
    fields = ['id', 'name', 'note', 'body_part', 'category', 'workoutId']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.note = fake.text()
        self.body_part = list_rand(BODY_PARTS)
        self.category = list_rand(CATEGORIES)
        self.workoutId = list_rand(range(1,10))


class Friend(Model):
    file_name = 'friend'
    fields = ['id', 'userId']

    def __init__(self, fake, id):
        self.id = id
        self.userId = list_rand(range(1,10))


class Log(Model):
    file_name = 'log'
    fields = ['id', 'createdAt', 'updatedAt', 'userId', 'workoutId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = created_at()
        self.updatedAt = updated_at()
        self.finishedAt = updated_at()
        self.userId = list_rand(range(1,10))
        self.workoutId = list_rand(range(1,10))


class Message(Model):
    file_name = 'message'
    fields = ['id', 'createdAt', 'updatedAt', 'content', 'read', 'chatId', 'senderId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = created_at()
        self.updatedAt = updated_at()
        self.content = fake.sentence()
        self.read = bool_rand()
        self.chatId = list_rand(range(1,10))
        self.senderId = list_rand(range(1,10))


class Notification(Model):
    file_name = 'notification'
    fields = ['id', 'createdAt', 'content', 'type', 'read', 'receiverId', 'senderId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = created_at()
        self.content = fake.sentence()
        self.type = list_rand(NOTIFICATION_TYPES)
        self.read = bool_rand()
        self.receiverId = list_rand(range(1,10))
        self.senderId = list_rand(range(1,10))
        


class Post(Model):
    file_name = 'post'
    fields = ['id', 'title', 'content', 'published', 'authorId']

    def __init__(self, fake, id):
        self.id = id
        self.title = fake.name()
        self.content = fake.text()
        self.published = False
        self.authorId = list_rand(range(1,10))


class Set(Model):
    file_name = 'set'
    fields = ['id', 'type', 'reps', 'weight', 'exerciseId']

    def __init__(self, fake, id):
        self.id = id
        self.type = list_rand(SET_TYPES)
        self.reps = list_rand(range(1,10))
        self.weight = list_rand(range(1,100))
        self.exerciseId = list_rand(range(1,10))


class User(Model):
    file_name = 'user'
    fields = ['id', 'username', 'name', 'status', 'streak']

    def __init__(self, fake, id):
        self.id = id
        self.username = fake.name()
        self.name = fake.name()
        self.status = list_rand(STATUSES)
        self.streak = list_rand(range(1,100))


class Workout(Model):
    file_name = 'workout'
    fields = ['id', 'name', 'description', 'duration', 'createdAt', 'updatedAt', 'finishedAt', 'likes', 'userId']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.description = fake.text()
        self.duration = list_rand([10, 20, 30, 60])
        self.createdAt = created_at()
        self.updatedAt = updated_at()
        self.finishedAt = updated_at()
        self.likes = list_rand(range(1,1000000))
        self.userId = list_rand(range(1,10))


klasses = [
    Award,
    Chat,
    Exercise,
    Friend,
    Log,
    Message,
    Notification,
    Post,
    Set,
    User,
    Workout
]

for index, klass in enumerate(klasses):
    data = [klass(fake, i + 1).to_json() for i in range(number_of_rows)]
    with open(f'output/{klass.file_name}.json', 'w') as f:
        f.write(json.dumps(data))

