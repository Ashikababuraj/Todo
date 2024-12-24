from django.db import models


class todo(models.Model):
    task = models.CharField(max_length=300, null=True, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task
