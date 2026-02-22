from locust import HttpUser, task, between

class GitSenseUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        self.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXRodWJfdG9rZW4iOiJnaG9fVjlQZmRuSjB5R3FuRkVPOG9sQXdmUVlGM1FHVGZLMUlTYjV4IiwiZXhwIjoxNzcyMzY0ODk0fQ.kmC2mNlsWo6-C73OOicef9vgVOgc2JEg0d26DezUvBU"
        self.headers = {
            "Authorization": f"Bearer {self.token}"
        }

    @task
    def analytics(self):
        self.client.get("/analytics/naveenbmenon", headers=self.headers)

    @task
    def insights(self):
        self.client.get("/insights/naveenbmenon", headers=self.headers)