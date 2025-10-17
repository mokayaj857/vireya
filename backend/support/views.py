from rest_framework import viewsets, permissions
from rest_framework.serializers import ModelSerializer
from .models import SupportTicket


class SupportTicketSerializer(ModelSerializer):
    class Meta:
        model = SupportTicket
        fields = ['id', 'email', 'subject', 'message', 'status', 'created_at', 'updated_at']


class SupportTicketViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all().order_by('-created_at')
    serializer_class = SupportTicketSerializer
    permission_classes = [permissions.AllowAny]

# Create your views here.
