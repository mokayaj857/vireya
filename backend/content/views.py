from rest_framework import viewsets, permissions
from rest_framework.serializers import ModelSerializer
from .models import Content


class ContentSerializer(ModelSerializer):
    class Meta:
        model = Content
        fields = ['id', 'title', 'body', 'is_published', 'created_at', 'updated_at']


class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all().order_by('-created_at')
    serializer_class = ContentSerializer
    permission_classes = [permissions.AllowAny]

# Create your views here.
