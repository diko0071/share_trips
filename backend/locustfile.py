from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):

    @task(1)
    def index(self):
        self.client.get("/api/trip/")

    @task(2)
    def profile(self):
        self.client.get("/api/user/data/get/DmitryKorzhov/")

    @task(3)
    def trip_2(self):
        self.client.get("/api/trip/2/")

    @task(4)
    def trip_3(self):
        self.client.get("/api/trip/3/")

    @task(5)
    def trip_15(self):
        self.client.get("/api/trip/15/")

    @task(6)
    def trip_18(self):
        self.client.get("/api/trip/18/")

    @task(7)
    def trip_19(self):
        self.client.get("/api/trip/19/")

    @task(8)
    def user_data(self):
        self.client.get("/api/user/data/get/DmitryKorzhov/")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)