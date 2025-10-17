from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from content.models import Content
from support.models import SupportTicket


@api_view(['GET'])
@permission_classes([AllowAny])
def summary(request):
    return Response({
        'content_count': Content.objects.count(),
        'support_open': SupportTicket.objects.filter(status='open').count(),
    })

# Create your views here.
