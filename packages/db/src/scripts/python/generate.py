import json
import random
from faker import Faker
from datetime import datetime, timedelta


fake = Faker()
number_of_rows = 10

BODY_PARTS = ["SHOULDERS", "CORE", "BACK", "LEGS", "ARMS", "CHEST", "FULL_BODY", "OTHER"]
CATEGORIES = ["DUMBBELL", "MACHINE", "BODYWEIGHT", "ASSISTED_BODYWEIGHT", "CARDIO"]
STATUSES = ["ONLINE", "OFFLINE", "ACTIVE", "BUSY"]
NOTIFICATION_TYPES = ["NUDGE", "FRIEND_REQUEST", "LIKE"]
SET_TYPES = ["WARMUP", "NORMAL", "FAILURE", "DROPSET"]
CHAT_TYPES = ["GROUP", "DIRECT"]

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

class Award(Model):
    file_name = 'award'
    fields = ['id', 'name', 'description', 'userId', 'createdAt', 'updatedAt']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.description = fake.text()
        self.userId = 1
        self.createdAt = self.created_at()
        self.updatedAt = self.updated_at()

class Chat(Model):
    file_name = 'chat'
    fields = ['id', 'name', 'createdByUserId', 'type']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.createdByUserId = self.list_rand(range(1, number_of_rows))
        self.type = self.list_rand(CHAT_TYPES)

class Exercise(Model):
    file_name = 'exercise'
    fields = ['id', 'name', 'note', 'body_part', 'category', 'workoutId']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.note = fake.text()
        self.body_part = self.list_rand(BODY_PARTS)
        self.category = self.list_rand(CATEGORIES)
        self.workoutId = self.list_rand(range(1, number_of_rows))


class Friend(Model):
    file_name = 'friend'
    fields = ['id', 'userId']

    def __init__(self, fake, id):
        self.id = id
        self.userId = self.list_rand(range(1, number_of_rows))


class Log(Model):
    file_name = 'log'
    fields = ['id', 'createdAt', 'updatedAt', 'userId', 'workoutId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = self.created_at()
        self.updatedAt = self.updated_at()
        self.finishedAt = self.updated_at()
        self.userId = self.list_rand(range(1, number_of_rows))
        self.workoutId = self.list_rand(range(1, number_of_rows))


class Message(Model):
    file_name = 'message'
    fields = ['id', 'createdAt', 'updatedAt', 'content', 'read', 'chatId', 'senderId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = self.created_at()
        self.updatedAt = self.updated_at()
        self.content = fake.sentence()
        self.read = self.bool_rand()
        self.chatId = self.list_rand(range(1, number_of_rows))
        self.senderId = self.list_rand(range(1, number_of_rows))


class Notification(Model):
    file_name = 'notification'
    fields = ['id', 'createdAt', 'content', 'type', 'read', 'receiverId', 'senderId']

    def __init__(self, fake, id):
        self.id = id
        self.createdAt = self.created_at()
        self.content = fake.sentence()
        self.type = self.list_rand(NOTIFICATION_TYPES)
        self.read = self.bool_rand()
        self.receiverId = self.list_rand(range(1, number_of_rows))
        self.senderId = self.list_rand(range(1, number_of_rows))



class Post(Model):
    file_name = 'post'
    fields = ['id', 'content', 'published', 'authorId']

    def __init__(self, fake, id):
        self.id = id
        self.title = fake.name()
        self.content = fake.text()
        self.published = False
        self.authorId = self.list_rand(range(1, number_of_rows))


class Set(Model):
    file_name = 'set'
    fields = ['id', 'type', 'reps', 'weight', 'exerciseId']

    def __init__(self, fake, id):
        self.id = id
        self.type = self.list_rand(SET_TYPES)
        self.reps = self.list_rand(range(1,10))
        self.weight = self.list_rand(range(1,100))
        self.exerciseId = self.list_rand(range(1, number_of_rows))


class User(Model):
    file_name = 'user'
    fields = ['id', 'username', 'name', 'status', 'streak']

    def __init__(self, fake, id):
        self.id = id
        self.username = fake.name()
        self.name = fake.name()
        self.status = self.list_rand(STATUSES)
        self.streak = self.list_rand(range(1,1000))


class Workout(Model):
    file_name = 'workout'
    fields = ['id', 'name', 'description', 'duration', 'createdAt', 'updatedAt', 'finishedAt', 'likes', 'userId']

    def __init__(self, fake, id):
        self.id = id
        self.name = fake.name()
        self.description = fake.text()
        self.duration = self.list_rand([10, 20, 30, 60])
        self.createdAt = self.created_at()
        self.updatedAt = self.updated_at()
        self.finishedAt = self.updated_at()
        self.likes = self.list_rand(range(1,1000))
        self.userId = self.list_rand(range(1, number_of_rows))


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

for klass in klasses:
    data = [klass(fake, i + 1).to_json() for i in range(1, number_of_rows)]
    with open(f'output/{klass.file_name}.json', 'w') as f:
        print(f'writing generated data to: {f.name}')
        f.write(json.dumps(data))
