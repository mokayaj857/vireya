import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from content.models import Content
from support.models import SupportTicket

logger = logging.getLogger(__name__)


@api_view(['GET'])
@permission_classes([AllowAny])
def summary(request):
    return Response({
        'content_count': Content.objects.count(),
        'support_open': SupportTicket.objects.filter(status='open').count(),
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def welcome(request):
    logger.info(f"Request received: {request.method} {request.path}")
    return Response({'message': 'Welcome to the API!'})

# Create your views here.
